import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Wallet2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActiveTrader } from '@/types';

interface ActiveTraderCardProps {
  trader: ActiveTrader;
  onDeactivate: (id: string, activation: string) => void;
  onViewTrades: (address: string) => void;
}

export function ActiveTraderCard({ trader, onDeactivate, onViewTrades }: ActiveTraderCardProps) {
  return (
    <Card className="p-4 bg-zinc-900 border-zinc-800 hover:border-violet-500 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-zinc-100 font-medium">
            {trader.address.substring(0, 4)}...{trader.address.substring(trader.address.length - 4)}
          </span>
          <Copy className="h-4 w-4 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">P&L</span>
          <span className={cn(
            "font-medium",
            trader.pnl >= 0 ? "text-green-400" : "text-red-400"
          )}>
            {trader.pnlPercentage.toFixed(2)}%
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet2 className="h-4 w-4 text-zinc-400" />
          <span className="text-zinc-100">{trader.solUsed ? trader.solUsed.toFixed(2) : 0}</span>
          <span className="text-zinc-500">SOL USED</span>
        </div>
        <span className="text-zinc-500">(${trader.pnl.toFixed(2)})</span>
      </div>

      <div className="flex gap-2">
        {/* <Button
          variant="outline"
          size="sm"
          className="flex-1 border-zinc-700 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-500"
          onClick={() => onDeactivate(trader.id)}
        >
          Deactivate
        </Button> */}
        <Button 
          onClick={() => trader.isActive ? onDeactivate(trader.address, "Deactivate") : onDeactivate(trader.address, "activate")}
          className={`${
            trader.isActive
              ? 'flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400'
              : 'flex-1 bg-purple-600 hover:bg-purple-700 text-white'
          } py-3 rounded-lg font-medium transition-colors`}
        >
          {trader.isActive ? 'Deactivate' : 'activate'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
          onClick={() => onViewTrades(trader.address)}
        >
          View Trades
        </Button>
      </div>
    </Card>
  );
}