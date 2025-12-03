'use client';

import { useEffect, useRef } from 'react';
import type { Message } from '@/app/types';
import ChatMessage from './chat-message';
import { ScrollArea } from './ui/scroll-area';

interface ChatListProps {
  messages: Message[];
}

export default function ChatList({ messages }: ChatListProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1" viewportRef={viewportRef}>
      <div className="p-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
