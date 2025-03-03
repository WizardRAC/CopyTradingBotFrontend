import { useState, useRef, useEffect } from 'react';
import { Send, Rocket, LineChart, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { Message } from '@/types';

interface Discussion {
  id: string;
  title: string;
  messages: Message[];
  date: string;
}

interface ChatViewProps {
  discussions: Discussion[];
  setDiscussions: React.Dispatch<React.SetStateAction<Discussion[]>>;
  currentDiscussionId: string | null;
  setCurrentDiscussionId: React.Dispatch<React.SetStateAction<string | null>>;
}

interface SuggestionButton {
  icon: JSX.Element;
  label: string;
  action: string;
}

export function ChatView({ 
  discussions, 
  setDiscussions, 
  currentDiscussionId, 
  setCurrentDiscussionId 
}: ChatViewProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentDiscussion = discussions.find(d => d.id === currentDiscussionId);

  useEffect(() => {
    if (!currentDiscussionId) {
      setShowSuggestions(true);
    }
  }, [currentDiscussionId]);

  const suggestionButtons: SuggestionButton[] = [
    {
      icon: <Rocket className="h-5 w-5" />,
      label: "Launch a token on PumpFun",
      action: "Comment lancer un token sur PumpFun ?"
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: "Analyzing a token",
      action: "Peux-tu analyser ce token pour moi ?"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: "Detecting a bundle",
      action: "Comment détecter un bundle ?"
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      label: "24h trend token",
      action: "Montre-moi les tendances des tokens sur 24h"
    }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [currentDiscussion?.messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    setShowSuggestions(false);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user'
    };

    if (!currentDiscussionId) {
      const newDiscussion: Discussion = {
        id: Date.now().toString(),
        title: text,
        messages: [newMessage],
        date: new Date().toLocaleString()
      };
      setDiscussions(prev => [newDiscussion, ...prev]);
      setCurrentDiscussionId(newDiscussion.id);
    } else {
      setDiscussions(prev => prev.map(d => 
        d.id === currentDiscussionId 
          ? {
              ...d,
              messages: [...d.messages, newMessage]
            }
          : d
      ));
    }

    setInput('');
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Je suis là pour vous aider à créer votre site web !",
        sender: 'ai'
      };

      setDiscussions(prev => prev.map(d => 
        d.id === (currentDiscussionId || prev[0].id)
          ? {
              ...d,
              messages: [...d.messages, aiResponse]
            }
          : d
      ));
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full p-4 md:p-6 bg-zinc-950">
      <div className="flex-1 relative">
        <ScrollArea 
          ref={scrollAreaRef} 
          className="h-full pr-4 -mr-4"
        >
          {!currentDiscussion?.messages.length && showSuggestions ? (
            <div className="h-full flex flex-col items-center justify-center px-4">
              <h1 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center">
                How can I help you?
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl">
                {suggestionButtons.map((btn, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto py-4 md:py-6 px-3 md:px-4 border-zinc-800 bg-zinc-900/50 hover:bg-violet-600/20 hover:border-violet-500 hover:text-white transition-all duration-300"
                    onClick={() => handleSend(btn.action)}
                  >
                    <div className="flex flex-col items-center gap-2 md:gap-3 text-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
                        {btn.icon}
                      </div>
                      <span className="text-xs md:text-sm">{btn.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4 mb-4">
              {currentDiscussion?.messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="border-t border-zinc-800 pt-4 mt-auto">
        <div className="max-w-3xl mx-auto flex gap-2 md:gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Écrivez votre message..."
            className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:ring-violet-500"
          />
          <Button
            onClick={() => handleSend()}
            className="bg-violet-600 hover:bg-violet-700 transition-all duration-300"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}