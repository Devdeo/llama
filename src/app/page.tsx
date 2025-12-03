'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import type { Message } from './types';
import { generateResponse } from './actions';
import ChatList from '@/components/chat-list';
import ChatInput from '@/components/chat-input';
import { Card } from '@/components/ui/card';

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'model',
    content: "Hello! I am Local Llama. How can I help you today?",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [device, setDevice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    const messageContent = formData.get('message') as string;
    if (!messageContent.trim()) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: messageContent,
    };

    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setError(null);

    startTransition(async () => {
      const result = await generateResponse(messages, messageContent);
      if (result.error) {
        setError(result.error);
        // remove user message on error
        setMessages(messages)
        return
      }

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: 'model',
        content: result.response as string,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setDevice(result.device as string);
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b w-full flex justify-center items-center">
        <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-headline text-foreground">Local Llama Chat</h1>
        </div>
      </header>
      <main className="flex-1 flex justify-center py-6 px-4">
        <Card className="w-full max-w-3xl flex flex-col shadow-lg">
          <ChatList messages={messages} />
          <div className="p-4 border-t">
            <ChatInput onSubmit={handleSubmit} isPending={isPending} />
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            {device && !isPending && !error && (
              <p className="text-muted-foreground text-xs mt-2 text-center">
                Inference on: {device}
              </p>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
