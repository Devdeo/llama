'use client';

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: currentInput }),
      });

      if (!res.ok) {
        console.error("API error:", res.statusText);
        const botMsg = { role: "assistant", text: "Sorry, something went wrong." };
        setMessages((prev) => [...prev, botMsg]);
        return;
      }
      
      const data = await res.json();

      const botMsg = { role: "assistant", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch(e) {
        console.error(e);
        const botMsg = { role: "assistant", text: "Sorry, something went wrong." };
        setMessages((prev) => [...prev, botMsg]);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{ width: "600px", margin: "50px auto", fontFamily: "Arial" }}>
      <h2>Chat with Llama 1B</h2>

      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        height: "400px",
        overflowY: "auto",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", marginBottom: '10px' }}>
            <p style={{margin: 0}}><b>{m.role === 'user' ? 'You' : 'Llama'}:</b></p>
            <div style={{
                background: m.role === 'user' ? '#dcf8c6' : '#f1f0f0',
                padding: '10px',
                borderRadius: '10px',
                maxWidth: '450px',
                wordWrap: 'break-word',
                textAlign: 'left'
            }}>
             {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{display: 'flex'}}>
        <input
          style={{ flex: 1, padding: "10px", borderRadius: '5px', border: '1px solid #ccc' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          style={{ padding: "10px 20px", marginLeft: "10px", borderRadius: '5px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
