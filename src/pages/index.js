
'use client';

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("Write a modern HTML resume template with clean CSS.");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    const currentInput = input;
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentInput }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const botMsg = { role: "assistant", text: `Sorry, something went wrong: ${errorData.error || res.statusText}` };
        setMessages((prev) => [...prev, botMsg]);
        return;
      }
      
      const data = await res.json();

      const botMsg = { role: "assistant", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch(e) {
        console.error(e);
        const botMsg = { role: "assistant", text: "Sorry, something went wrong while fetching the response." };
        setMessages((prev) => [...prev, botMsg]);
    } finally {
        setIsLoading(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ width: "600px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h2>Chat with Local Llama 3.2</h2>

      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        height: "400px",
        overflowY: "auto",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        backgroundColor: "#f9f9f9"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start" }}>
            <p style={{margin: 0, padding: '0 12px', fontSize: '0.8rem', color: '#555'}}><b>{m.role === 'user' ? 'You' : 'Llama'}:</b></p>
            <div style={{
                background: m.role === 'user' ? '#A0C4FF' : '#F0F0F0',
                padding: '10px 12px',
                borderRadius: '10px',
                maxWidth: '450px',
                wordWrap: 'break-word',
                textAlign: 'left',
                border: '1px solid #e0e0e0',
                whiteSpace: 'pre-wrap'
            }}>
             {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div style={{ alignSelf: 'flex-start' }}>
                <div style={{ background: '#F0F0F0', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e0e0e0' }}>
                    Thinking...
                </div>
            </div>
        )}
      </div>

      <div style={{display: 'flex', gap: '10px'}}>
        <textarea
          style={{ flex: 1, padding: "10px", borderRadius: '5px', border: '1px solid #ccc', resize: 'vertical' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Enter your prompt..."
        />
        <button
          style={{ padding: "10px 20px", borderRadius: '5px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer', alignSelf: 'stretch' }}
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
