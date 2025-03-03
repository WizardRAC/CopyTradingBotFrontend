import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

export function ChatMessage({ content, sender }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 animate-in slide-in-from-bottom-3",
        sender === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          "rounded-lg p-3 md:p-4 max-w-[85%] md:max-w-[80%]",
          sender === 'user'
            ? 'bg-violet-600 text-white ml-12'
            : 'bg-zinc-800 text-zinc-100 mr-12'
        )}
      >
        <div className="flex items-start gap-3">
          {sender === 'ai' && (
            <Bot className="h-5 w-5 mt-1 text-violet-400 shrink-0" />
          )}
          {sender === 'user' && (
            <User className="h-5 w-5 mt-1 text-zinc-300 shrink-0" />
          )}
          <p className="leading-relaxed text-sm md:text-base break-words">{content}</p>
        </div>
      </div>
    </div>
  );
}