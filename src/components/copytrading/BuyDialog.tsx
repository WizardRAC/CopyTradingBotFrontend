import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface BuyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tokenName: string;
  tokenAddress: string;
  onBuy: (amount: number, tokenAddress: string, config: { priorityFee: number, bribery: number }) => void;
}

export function BuyDialog({ 
  open, 
  onOpenChange, 
  tokenName, 
  tokenAddress,
  onBuy 
}: BuyDialogProps) {
  const [amount, setAmount] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priorityFee, setPriorityFee] = useState('0.000005');
  const [bribery, setBribery] = useState('0.001');

  const handleBuy = () => {
    if (!amount || parseFloat(amount) == 0) return;
    onBuy(
      parseFloat(amount),
      tokenAddress,
      {
        priorityFee: parseFloat(priorityFee),
        bribery: parseFloat(bribery)
      }
    );
    onOpenChange(false);
    setAmount('');
  };

  const totalFees = parseFloat(priorityFee) + parseFloat(bribery);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[85vw] max-w-[360px] rounded-xl p-0 overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <DialogHeader className="space-y-2 pb-2">
              <DialogTitle className="text-lg font-semibold text-white">
                Buy {tokenName}
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-400">
                Enter the amount of SOL you want to invest in {tokenName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                  Amount (SOL)
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>

              <Button
                variant="ghost"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full justify-between text-zinc-300 h-9"
              >
                Advanced Settings
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {showAdvanced && (
                <div className="space-y-3 animate-in slide-in-from-top-2">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                      Priority Fee (SOL)
                    </label>
                    <Input
                      type="number"
                      value={priorityFee}
                      onChange={(e) => setPriorityFee(e.target.value)}
                      placeholder="0.000005"
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                      Higher priority fee = faster transaction processing
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                      Bribery Amount (SOL)
                    </label>
                    <Input
                      type="number"
                      value={bribery}
                      onChange={(e) => setBribery(e.target.value)}
                      placeholder="0.001"
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                      MEV bribe for priority inclusion
                    </p>
                  </div>
                </div>
              )}

              <div className="text-sm text-zinc-500">
                Total fees: {totalFees.toFixed(6)} SOL
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 p-4 bg-zinc-900">
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-zinc-700 text-zinc-300 rounded-lg"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 rounded-lg"
              onClick={handleBuy}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Confirm Purchase
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}