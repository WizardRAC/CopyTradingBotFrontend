import { Copy, ExternalLink } from 'lucide-react';
import { TradeHistory } from '@/types';
import { cn } from '@/lib/utils';

interface TradeHistoryTableProps {
  trades: TradeHistory[];
}

export function TradeHistoryTable({ trades }: TradeHistoryTableProps) {
  // Version mobile
  const MobileView = () => (
    <div className="space-y-4 md:hidden">
      {trades.map(trade => (
        <div key={trade.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
              <span className="text-violet-300 text-xs">{trade.tokenName}</span>
            </div>
            <div>
              <div className="font-medium text-white">${trade.tokenName}</div>
              <div className="flex items-center gap-1 text-sm text-zinc-500">
                {trade.tokenAddress}
                <Copy className="h-3 w-3 cursor-pointer hover:text-zinc-300" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <div className="text-zinc-400">Type</div>
              <span className={cn(
                "px-2 py-1 rounded text-xs font-medium",
                trade.type === 'Buy' 
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              )}>
                {trade.type.toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-zinc-400">Price</div>
              <div className="text-white">
                <span className="text-zinc-400">SOL</span> {trade.price.toFixed(4)}
              </div>
            </div>
            <div>
              <div className="text-zinc-400">Amount</div>
              <div className="text-white">
                ${trade.tokenName} {trade.amount.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-zinc-400">Date</div>
              <div className="text-white">{trade.date}</div>
            </div>
          </div>

          <div className="flex justify-end text-sm">
            <a 
              href={`https://solscan.io/tx/${trade.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              {trade.hash.substring(0, 6)}...{trade.hash.substring(trade.hash.length - 6)}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  // Version desktop
  const DesktopView = () => (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-3 text-xs font-medium text-zinc-400">TOKEN</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">TYPE</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">PRICE</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">AMOUNT</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">DATE & HASH</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <tr key={trade.id} className="border-b border-zinc-800/50">
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <span className="text-violet-300 text-xs">{trade.tokenName}</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">${trade.tokenName}</div>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                      {trade.tokenAddress}
                      <Copy className="h-3 w-3 cursor-pointer hover:text-zinc-300" />
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-right py-4">
                <span className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  trade.type === 'Buy' 
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                )}>
                  {trade.type.toUpperCase()}
                </span>
              </td>
              <td className="text-right py-4">
                <div className="text-white">
                  <span className="text-zinc-400">SOL</span> {trade.price.toFixed(4)}
                </div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">
                  ${trade.tokenName} {trade.amount}
                </div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{trade.date}</div>
                <div className="flex items-center justify-end gap-1 text-sm">
                  <a 
                    href={`https://solscan.io/tx/${trade.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 flex items-center gap-1"
                  >
                    {trade.hash.substring(0, 6)}...{trade.hash.substring(trade.hash.length - 6)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}