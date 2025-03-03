import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet2 } from 'lucide-react';

interface ConnectWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ConnectWalletDialog({ open, onOpenChange, onSuccess }: ConnectWalletDialogProps) {
  const handleConnect = () => {
    // Simuler une connexion réussie
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[85vw] max-w-[400px] rounded-xl p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
              <Wallet2 className="h-6 w-6 text-violet-400" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">
              Connectez votre Wallet
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Connectez votre wallet Phantom pour accéder à WhalesX
            </DialogDescription>
          </DialogHeader>
  {/* monda */}
          <div className="mt-8 space-y-4 w-full ">
            <Button
              className="w-full bg-violet-600 hover:bg-violet-700 h-12"
              onClick={handleConnect}
            >
              Connecter avec Phantom
            </Button>
            <div className='w-full flex justify-center'>
            {/* <PHWallet/> */}
            </div>

            <p className="text-xs text-center text-zinc-500">
              En connectant votre wallet, vous acceptez nos conditions d'utilisation et notre politique de confidentialité
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}