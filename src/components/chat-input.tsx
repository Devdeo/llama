'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
}

export default function ChatInput({ onSubmit, isPending }: ChatInputProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        onSubmit(formData);
        formRef.current?.reset();
      }}
      className="flex items-start gap-4"
    >
      <Textarea
        name="message"
        placeholder="Type your message..."
        className="flex-1 resize-none"
        disabled={isPending}
        onKeyDown={handleTextareaKeyDown}
      />
      <Button type="submit" size="icon" disabled={isPending}>
        <Send />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}
