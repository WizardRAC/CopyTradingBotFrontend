import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Token } from '@/types';

interface TokenListProps {
  tokens: Token[];
  onAction: (tokenId: string, action: 'buy' | 'sell') => void;
}

export function TokenList({ tokens, onAction }: TokenListProps) {
  // Version mobile sous forme de cartes
  const MobileView = () => (
    <div className="space-y-4 md:hidden">
      {tokens.map(token => (
        <div key={token.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
              <span className="text-violet-300 text-xs">{token.name[0].toUpperCase()}</span>
            </div>
            <div>
              <div className="font-medium text-white">{token.name}</div>
              <div className="flex items-center gap-1 text-sm text-zinc-500">
                {token.address}
                <Copy className="h-3 w-3 cursor-pointer hover:text-zinc-300" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <div className="text-zinc-400">Liquidity</div>
              <div className="text-white">{token.liquidity}K</div>
              <div className="text-xs text-zinc-500">${(token.liquidityUsd).toFixed(2)}K</div>
            </div>
            <div>
              <div className="text-zinc-400">Invested</div>
              <div className="text-white">{token.invested} SOL</div>
            </div>
            <div>
              <div className="text-zinc-400">Remaining</div>
              <div className="text-white">{token.remaining} SOL</div>
            </div>
            <div>
              <div className="text-zinc-400">Sold</div>
              <div className="text-white">{token.sold} SOL</div>
            </div>
            <div>
              <div className="text-zinc-400">Current Value</div>
              <div className="text-white">{token.currentValue} SOL</div>
            </div>
            <div>
              <div className="text-zinc-400">P&L</div>
              <div className={cn(
                "font-medium",
                token.pnlAmount / token.invested >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {token.pnlAmount / token.invested}%
              </div>
              <div className={cn(
                "text-xs",
                token.pnlAmount >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {token.pnlAmount} SOL
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            {token.status === 'active' ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-zinc-700 text-zinc-300 hover:bg-red-600 hover:text-white"
                onClick={() => onAction(token.id, 'sell')}
              >
                Sell
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white"
                onClick={() => onAction(token.id, 'buy')}
              >
                Buy More
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Version desktop avec tableau
  const DesktopView = () => (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left py-3 text-xs font-medium text-zinc-400">TOKEN</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">LIQUIDITY</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">INVESTED</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">REMAINING</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">SOLD</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">CURRENT VALUE</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">P&L</th>
            <th className="text-right py-3 text-xs font-medium text-zinc-400">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map(token => (
            <tr key={token.id} className="border-b border-zinc-800/50">
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <span className="text-violet-300 text-xs">{token.name[0].toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{token.name}</div>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                      {token.address}
                      <Copy className="h-3 w-3 cursor-pointer hover:text-zinc-300" />
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.liquidity}K</div>
                <div className="text-sm text-zinc-500">${(token.liquidityUsd).toFixed(2)}K</div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.invested}</div>
                <div className="text-sm text-zinc-500">SOL</div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.remaining}</div>
                <div className="text-sm text-zinc-500">SOL</div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.sold}</div>
                <div className="text-sm text-zinc-500">SOL</div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.currentValue}</div>
                <div className="text-sm text-zinc-500">SOL</div>
              </td>
              <td className="text-right py-4">
                <div className={cn(
                  "font-medium",
                  token.pnlAmount / token.invested >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {token.pnlAmount / token.invested}%
                </div>
                <div className={cn(
                  "text-sm",
                  token.pnlAmount >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {token.pnlAmount} SOL
                </div>
              </td>
              <td className="text-right py-4">
                <div className="flex items-center justify-end gap-2">
                  {token.status === 'active' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-zinc-700 text-zinc-300 hover:bg-red-600 hover:text-white"
                      onClick={() => onAction(token.id, 'sell')}
                    >
                      Sell
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white"
                      onClick={() => onAction(token.id, 'buy')}
                    >
                      Buy More
                    </Button>
                  )}
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