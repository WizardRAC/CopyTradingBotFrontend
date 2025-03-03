import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet2 } from 'lucide-react';

interface WalletConnectProps {
  onConnect: () => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  return (
    <Card className="mt-6 p-8 bg-zinc-900 border-zinc-800 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-violet-600/20 flex items-center justify-center">
          <Wallet2 className="h-8 w-8 text-violet-400" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
      <p className="text-zinc-400 mb-6 max-w-md mx-auto">
        Connect your Solana wallet to start copy trading. We support Phantom, Solflare, and other major Solana wallets.
      </p>
      
      <Button 
        size="lg"
        className="bg-violet-600 hover:bg-violet-700 text-white transition-all duration-300"
        onClick={onConnect}
      >
        Connect Wallet
      </Button>
      
      <div className="mt-6 text-sm text-zinc-500">
        By connecting your wallet, you agree to our Terms of Service and Privacy Policy
      </div>
    </Card>
  );
}