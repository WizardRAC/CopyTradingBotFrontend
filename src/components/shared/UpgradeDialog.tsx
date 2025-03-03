import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle2, Zap, Shield, Rocket, Network } from 'lucide-react';
import { useState } from 'react';

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeDialog({ open, onOpenChange }: UpgradeDialogProps) {
  const [copied, setCopied] = useState(false);
  const paymentAddress = "HZVWEYzoZiv31PA6SyTAdD4BNrWVktw5NkKH7YRaSAVh";
  const amount = 2; // 2 SOL per month

  const copyAddress = () => {
    navigator.clipboard.writeText(paymentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[85vw] max-w-[360px] rounded-xl p-0 overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <DialogHeader className="space-y-2 pb-2">
              <DialogTitle className="text-lg font-semibold text-white flex items-center gap-2">
                Upgrade to Pro
                <Badge className="bg-violet-500/20 text-violet-300">2 SOL/month</Badge>
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-400">
                Unlock premium features and enhanced performance
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
                    <Network className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Enhanced RPC Access</h4>
                    <p className="text-sm text-zinc-400">Premium RPC endpoints with higher rate limits</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
                    <Zap className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">MEV Protection</h4>
                    <p className="text-sm text-zinc-400">Advanced protection with Jito integration</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
                    <Shield className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Priority Support</h4>
                    <p className="text-sm text-zinc-400">24/7 dedicated support</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
                    <Rocket className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Advanced Features</h4>
                    <p className="text-sm text-zinc-400">Premium trading features and analytics</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-center">
                  <div className="p-3 bg-white rounded-lg">
                    <QRCodeSVG 
                      value={`solana:${paymentAddress}?amount=${amount}`}
                      size={140}
                      level="H"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Send {amount} SOL to
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 bg-zinc-800 rounded-lg text-xs text-zinc-100 font-mono break-all">
                      {paymentAddress}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500 rounded-lg h-8 w-8"
                      onClick={copyAddress}
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-zinc-500">
                  Your Pro subscription will be activated automatically after payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}