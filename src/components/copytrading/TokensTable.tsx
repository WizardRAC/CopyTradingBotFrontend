import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Token } from '@/types';
import { SellDialog } from './SellDialog';
import { BuyDialog } from './BuyDialog';
import { HandleSwapRaute } from './callCopyBackend/HandleSwapRaute';
import { ToastContainer, toast } from 'react-toastify';

interface TokensTableProps {
  tokens: Token[];
}

export function TokensTable({ tokens }: TokensTableProps) {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [showBuyDialog, setShowBuyDialog] = useState(false);

  const handleSell = (amount: number, tokenAddress: String) => {
    console.log('Selling', amount, 'SOL of token', selectedToken?.name);
    // Implement sell logic
    handleSwap("sell", amount, tokenAddress)
  };

  const handleBuy = (amount: number, tokenAddress: String) => {
    console.log('Buying', amount, 'SOL of token', selectedToken?.name);
    // Implement buy logic
    handleSwap("buy", amount, tokenAddress)
  };

  function handleSwap (type: string, amount: number, tokenAddress: String) {
    const swap: any = HandleSwapRaute(type, amount, tokenAddress);
    console.log("swap = ", swap)
    if (swap) {
      toast.success('Success to swap!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } else {
      toast.error('Failed to swap!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  // Version mobile sous forme de cartes
  const MobileView = () => (
    <div className="space-y-4 md:hidden">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {tokens.map(token => (
        <div key={token.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
              <span className="text-violet-300 text-xs">{token.name[0].toUpperCase()}</span>
            </div>
            <div>
              <div className="font-medium text-white">{token.name}</div>
              <div className="flex items-center gap-1 text-sm text-zinc-500">
                {token.address.substring(0, 6)}...{token.address.substring(token.address.length - 6)}
                <Copy className="h-3 w-3 cursor-pointer hover:text-zinc-300" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <div className="text-zinc-400">Liquidity</div>
              <div className="text-white">{token.liquidity.toFixed(2)}{token.name}</div>
              <div className="text-xs text-zinc-500">${(token.liquidityUsd).toFixed(2)}USD</div>
            </div>
            <div>
              <div className="text-zinc-400">Invested</div>
              <div className="text-white">{token.invested.toFixed(4)} SOL</div>
            </div>
            <div>
              <div className="text-zinc-400">Remaining</div>
              <div className="text-white">{token.remaining.toFixed(2)} {token.name}</div>
            </div>
            <div>
              <div className="text-zinc-400">Sold</div>
              <div className="text-white">{token.sold.toFixed(4)} SOL</div>
            </div>
            <div>
              <div className="text-zinc-400">Current Value</div>
              <div className="text-white">{token.currentValue.toFixed(2)} USD</div>
            </div>
            <div>
              <div className="text-zinc-400">P&L</div>
              <div className={cn(
                "font-medium",
                (token.pnl / token.invested) * 100 >= 0 ? "text-green-400" : "text-red-400"
              )}>
                  {token.invested != 0 ? (((token.pnl / token.invested) * 100).toFixed(2)) : 0}%
              </div>
              <div className={cn(
                "text-xs",
                token.pnlAmount >= 0 ? "text-green-400" : "text-red-400"
              )}>
                $ {token.pnlAmount.toFixed(2)}
              </div>
            </div>
          </div>


          <div className="flex justify-end">
            {token.status === 'active' ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-zinc-700 text-zinc-300 hover:bg-red-600 hover:text-white"
                onClick={() => {
                  setSelectedToken(token);
                  setShowSellDialog(true);
                }}
              >
                Sell
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white"
                onClick={() => {
                  setSelectedToken(token);
                  setShowBuyDialog(true);
                }}
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
                      {token.address.substring(0, 6)}...{token.address.substring(token.address.length - 6)}
                      <Copy className="h-3 w-3 cursor-pointer hover:text-zinc-300" />
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.liquidity.toFixed(2)}{token.name}</div>
                <div className="text-sm text-zinc-500">${(token.liquidityUsd).toFixed(2)}USD</div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.invested.toFixed(4)}</div>
                <div className="text-sm text-zinc-500">SOL</div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.remaining.toFixed(2)}</div>
                <div className="text-sm text-zinc-500">{token.name}</div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.sold.toFixed(4)}</div>
                <div className="text-sm text-zinc-500">SOL</div>
              </td>
              <td className="text-right py-4">
                <div className="text-white">{token.currentValue.toFixed(2)}</div>
                <div className="text-sm text-zinc-500">USD</div>
              </td>
              <td className="text-right py-4">
                <div className={cn(
                  "font-medium",
                  (token.pnl / token.invested) * 100 >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {token.invested != 0 ? (((token.pnl / token.invested) * 100).toFixed(2)) : "0"}%
                </div>
                <div className={cn(
                  "text-sm",
                  token.pnlAmount >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  $ {token.pnlAmount.toFixed(2)}
                </div>
              </td>
              <td className="text-right py-4">
                <div className="flex items-center justify-end gap-2">
                  {token.status === 'active' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-zinc-700 text-zinc-300 hover:bg-red-600 hover:text-white"
                      onClick={() => {
                        setSelectedToken(token);
                        setShowSellDialog(true);
                      }}
                    >
                      Sell
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white"
                      onClick={() => {
                        setSelectedToken(token);
                        setShowBuyDialog(true);
                      }}
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

      {selectedToken && (
        <>
          <SellDialog
            open={showSellDialog}
            onOpenChange={setShowSellDialog}
            tokenName={selectedToken.name}
            tokenAddress={selectedToken.address}
            currentValue={selectedToken.currentValue}
            onSell={handleSell}
          />
          <BuyDialog
            open={showBuyDialog}
            onOpenChange={setShowBuyDialog}
            tokenName={selectedToken.name}
            tokenAddress={selectedToken.address}
            onBuy={handleBuy}
          />
        </>
      )}
    </>
  );
}