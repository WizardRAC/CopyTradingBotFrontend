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

interface SellDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tokenName: string;
  tokenAddress: string;
  currentValue: number;
  onSell: (amount: number, tokenAddress: String, config: { priorityFee: number, bribery: number }) => void;
}

export function SellDialog({ 
  open, 
  onOpenChange, 
  tokenName, 
  tokenAddress,
  currentValue,
  onSell 
}: SellDialogProps) {
  const [amount, setAmount] = useState('');
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priorityFee, setPriorityFee] = useState('0.000005');
  const [bribery, setBribery] = useState('0.001');

  const percentageButtons = [25, 50, 75, 100];

  const handlePercentageClick = (percentage: number) => {
    setSelectedPercentage(percentage);
    setAmount(((currentValue * percentage) / 100).toFixed(3));
  };

  const handleSell = () => {
    if (!amount || parseFloat(amount) == 0) return;
    onSell(
      parseFloat(amount), 
      tokenAddress,
      {
        priorityFee: parseFloat(priorityFee),
        bribery: parseFloat(bribery)
      }
    );
    onOpenChange(false);
    setAmount('');
    setSelectedPercentage(null);
  };

  const totalFees = parseFloat(priorityFee) + parseFloat(bribery);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[85vw] max-w-[360px] rounded-xl p-0 overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <DialogHeader className="space-y-2 pb-2">
              <DialogTitle className="text-lg font-semibold text-white">
                Sell {tokenName}
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-400">
                Choose the amount of {tokenName} you want to sell
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-1.5">
                {percentageButtons.map((percentage) => (
                  <Button
                    key={percentage}
                    variant={selectedPercentage === percentage ? "default" : "outline"}
                    className={
                      selectedPercentage === percentage
                        ? "bg-violet-600 hover:bg-violet-700 rounded-lg h-9"
                        : "border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500 rounded-lg h-9"
                    }
                    onClick={() => handlePercentageClick(percentage)}
                  >
                    {percentage}%
                  </Button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                  Amount (SOL)
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedPercentage(null);
                  }}
                  placeholder="0.0"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
                <div className="mt-1 text-sm text-zinc-500">
                  Available: {currentValue} SOL
                </div>
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
              onClick={handleSell}
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > currentValue}
            >
              Confirm Sale
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}