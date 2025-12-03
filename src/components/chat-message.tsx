import { User } from 'lucide-react';
import type { Message } from '@/app/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Llama } from './icons';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUserModel = message.role === 'model';
  return (
    <div
      className={cn(
        'flex items-start gap-4',
        !isUserModel && 'flex-row-reverse'
      )}
    >
      <Avatar>
        <AvatarFallback>
          {isUserModel ? <Llama className="w-6 h-6" /> : <User />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'p-3 rounded-lg max-w-[75%] whitespace-pre-wrap',
          isUserModel
            ? 'bg-card text-card-foreground border'
            : 'bg-primary text-primary-foreground'
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}
