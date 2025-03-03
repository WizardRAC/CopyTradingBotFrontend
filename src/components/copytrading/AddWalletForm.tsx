import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, Info } from 'lucide-react';

interface AddWalletFormProps {
  onSubmit: (address: string) => void;
}

export function AddWalletForm({ onSubmit }: AddWalletFormProps) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSubmit(address.trim());
    }
  };

  return (
    <Card className="p-4 md:p-8 bg-zinc-900 border-zinc-800">
      <div className="flex items-center gap-2 mb-6">
        <Copy className="h-5 w-5 text-violet-400" />
        <h2 className="text-lg md:text-xl font-bold text-white">Add Wallet to Copy Trade</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">
            Paste or enter target address you want to copy trades from
          </label>
          <div className="relative">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="bg-zinc-800 border-zinc-700 text-zinc-100 pr-10"
            />
            <Info className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full mt-6 bg-violet-600 hover:bg-violet-700 text-white transition-all duration-300"
          disabled={!address.trim()}
        >
          Continue to Setup
        </Button>
      </form>
    </Card>
  );
}