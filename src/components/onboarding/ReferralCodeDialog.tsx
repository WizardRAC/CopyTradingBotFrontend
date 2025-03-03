import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users } from 'lucide-react';
import { useState } from 'react';

interface ReferralCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ReferralCodeDialog({ open, onOpenChange, onSuccess }: ReferralCodeDialogProps) {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    // Simuler une validation réussie
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[85vw] max-w-[400px] rounded-xl p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-violet-400" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">
              Code de Parrainage
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Entrez votre code de parrainage pour bénéficier d'avantages exclusifs
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 space-y-4">
            <div>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Entrez votre code"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => onSuccess()}
              >
                Passer
              </Button>
              <Button
                className="flex-1 bg-violet-600 hover:bg-violet-700"
                onClick={handleSubmit}
                disabled={!code.trim()}
              >
                Valider
              </Button>
            </div>

            <p className="text-xs text-center text-zinc-500">
              Vous n'avez pas de code ? Demandez-en un à la communauté
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}