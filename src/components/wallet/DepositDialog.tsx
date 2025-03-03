import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getWhaleXWalletPublickey } from '../copytrading/callCopyBackend/getWhaleXWallet';


interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DepositDialog({ open, onOpenChange }: DepositDialogProps) {
  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const phantomWalletKey = useWallet().publicKey?.toString();
  if (!phantomWalletKey) {
    return;
  }
  useEffect(() => {
    // Fetch the public key when the component mounts
    const fetchPublicKey = async () => {
      const publicKey = await getWhaleXWalletPublickey(phantomWalletKey);
      if (publicKey) {
        setAddress(publicKey);
      }
      setLoading(false);  // Set loading to false after fetching
    };
    
    fetchPublicKey();
  }, []);  // Empty dependency array means this runs once on component mount

  if (loading) {
    return <div>Loading...</div>;  // Optionally show loading state while fetching
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[85vw] max-w-[360px] rounded-xl p-0 overflow-hidden">
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <DialogHeader className="space-y-2 pb-2">
              <DialogTitle className="text-lg font-semibold text-white">
                Deposit SOL
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-400">
                Send SOL to your wallet address below. Only send SOL through the Solana network.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-lg">
                  <QRCodeSVG 
                    value={address}
                    size={160}
                    level="H"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-400">
                  Your Wallet Address
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2.5 bg-zinc-800 rounded-lg text-sm text-zinc-100 font-mono break-all">
                    {address}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500 rounded-lg h-10 w-10"
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

              <div className="space-y-1.5">
                <h4 className="font-medium text-white text-sm">Important Notes:</h4>
                <ul className="space-y-1 text-xs text-zinc-400">
                  <li>• Only send SOL through the Solana network</li>
                  <li>• Minimum deposit: 0.001 SOL</li>
                  <li>• Deposits are typically confirmed within 30 seconds</li>
                  <li>• Your balance will update automatically once confirmed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}