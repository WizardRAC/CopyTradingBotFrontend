import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Copy, Crosshair, Cpu, ChevronDown, ChevronUp, Wallet2, Menu, Trash2, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActiveTrader } from '@/types';
// import { useWallet } from '@solana/wallet-adapter-react';

interface Discussion {
  id: string;
  title: string;
  messages: any;
  date: string;
}

interface SidebarProps {
  currentView: 'chat' | 'copytrading' | 'sniper' | 'wallet';
  setCurrentView: (view: 'chat' | 'copytrading' | 'sniper' | 'wallet') => void;
  activeTraders?: ActiveTrader[];
  onTraderSelect?: (address: string) => void;
  discussions?: Discussion[];
  currentDiscussionId?: string | null;
  setCurrentDiscussionId?: (id: string | null) => void;
  onNewDiscussion?: () => void;
}

export function Sidebar({ 
  currentView, 
  setCurrentView, 
  activeTraders = [], 
  onTraderSelect,
  discussions = [],
  setCurrentDiscussionId,
  onNewDiscussion
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDiscussions, setShowDiscussions] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteDiscussion = (id: string) => {
    console.log("handleDeleteDiscussion id = ", id)
    // Implement discussion deletion logic
  };

  const handleDeleteTrader = (id: string) => {
    console.log("handleDeleteTrader id = ", id)
    // Implement trader deletion logic
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Button 
          className="w-full bg-violet-600 hover:bg-violet-700 transition-all duration-300 group"
          size="lg"
          onClick={() => {
            onNewDiscussion?.();
            setIsOpen(false);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4 md:h-6 md:w-6 group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-sm md:text-base">New discussion</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 pb-20 md:pb-0">
        <div className="space-y-4">
          <Separator className="bg-zinc-800" />

          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-between text-zinc-100 transition-all duration-300 text-sm md:text-base",
                currentView === 'chat' 
                  ? "bg-violet-600 hover:bg-violet-700" 
                  : "bg-zinc-900 hover:bg-violet-600"
              )}
              onClick={() => {
                setShowDiscussions(!showDiscussions);
              }}
            >
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Discussions
              </div>
              {discussions.length > 0 && (
                showDiscussions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {showDiscussions && discussions.length > 0 && (
              <div className="ml-4 md:ml-6 space-y-1">
                {discussions.map(discussion => (
                  <div
                    key={discussion.id}
                    className="group flex items-center justify-between py-2 px-2 md:px-3 rounded-lg hover:bg-zinc-800/50 transition-colors relative"
                  >
                    <button
                      className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 hover:text-white flex-1 text-left pr-8"
                      onClick={() => {
                        setCurrentDiscussionId?.(discussion.id);
                        setCurrentView('chat');
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate max-w-[140px] md:max-w-[160px]">
                          {discussion.title}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {discussion.date}
                        </div>
                      </div>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteDiscussion(discussion.id)}
                    >
                      <Trash2 className="h-4 w-4 text-zinc-500 hover:text-red-400" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-between text-zinc-100 transition-all duration-300 text-sm md:text-base",
                  currentView === 'copytrading' 
                    ? "bg-violet-600 hover:bg-violet-700" 
                    : "bg-zinc-900 hover:bg-violet-600"
                )}
                onClick={() => {
                  setCurrentView('copytrading');
                  setIsExpanded(!isExpanded);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center">
                  <Copy className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Copytrading
                </div>
                {activeTraders.length > 0 && (
                  isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {isExpanded && activeTraders.length > 0 && (
                <div className="ml-4 md:ml-6 space-y-1">
                  {activeTraders.map(trader => (
                    <div
                      key={trader.id}
                      className="group flex items-center justify-between py-2 px-2 md:px-3 rounded-lg hover:bg-zinc-800/50 transition-colors relative"
                    >
                      <button
                        className="flex items-center gap-2 text-xs md:text-sm text-zinc-400 hover:text-white flex-1 text-left pr-8"
                        onClick={() => {
                          onTraderSelect?.(trader.address);
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate max-w-[140px] md:max-w-[160px]">
                            {trader.address.substring(0, 4)}...{trader.address.substring(trader.address.length - 4)}
                          </div>
                          <div className={cn(
                            "text-xs",
                            trader.pnl >= 0 ? "text-green-400" : "text-red-400"
                          )}>
                            {trader.pnl >= 0 ? "+" : ""}{trader.pnlPercentage.toFixed(2)}%
                          </div>
                        </div>
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteTrader(trader.id)}
                      >
                        <Trash2 className="h-4 w-4 text-zinc-500 hover:text-red-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button 
              variant="ghost" 
              className="w-full justify-start bg-zinc-900 text-zinc-100 hover:bg-violet-600 hover:text-white transition-all duration-300 text-sm md:text-base"
              disabled
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Cpu className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Automation
                </div>
                <Badge variant="secondary" className="bg-violet-500/20 text-violet-300 text-xs">Soon</Badge>
              </div>
            </Button>

            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-between text-zinc-100 transition-all duration-300 text-sm md:text-base",
                currentView === 'sniper' 
                  ? "bg-violet-600 hover:bg-violet-700" 
                  : "bg-zinc-900 hover:bg-violet-600"
              )}
              disabled
            >
              <div className="flex items-center">
                <Crosshair className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Sniper
              </div>
              <Badge variant="secondary" className="bg-violet-500/20 text-violet-300 text-xs">Soon</Badge>
            </Button>
          </div>
        </div>
      </ScrollArea>

      {/* Fixed wallet button at bottom */}
      <div className="absolute bottom-0 left-0 w-full md:relative p-4 mt-auto border-t border-zinc-800 bg-zinc-950">
        <Button 
          variant="outline" 
          className={cn(
            "w-full border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-violet-600 hover:text-white hover:border-violet-500 transition-all duration-300 text-sm md:text-base",
            currentView === 'wallet' && "bg-violet-600 text-white border-violet-500"
          )}
          onClick={() => {
            setCurrentView('wallet');
            setIsOpen(false);
          }}
        >
          <Wallet2 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Wallet Solana
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-zinc-800 border-zinc-700 hover:bg-violet-600 hover:border-violet-500"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6 text-white" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-zinc-950 border-r border-zinc-800">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle className="text-white">Navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="hidden md:block w-64 border-r border-zinc-800">
        <SidebarContent />
      </div>
    </>
  );
}