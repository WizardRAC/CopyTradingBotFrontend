import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ArrowUpRight } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { withdrawRaute } from "../copytrading/callCopyBackend/withdrawRaute";
import { ToastContainer, toast } from 'react-toastify';

export function WithdrawDialog() {
  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);

  const {publicKey} = useWallet();
  if (!publicKey) {
    return
  }
  const address = publicKey.toString()
  const handleWithdraw = async () => {
    if (publicKey && address) {
      const result = await withdrawRaute(publicKey?.toString(), Number(amount), address)
      if (!result) {
        toast.error('Failed to withdraw!', {
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
        toast.success('Successful withdraw!', {
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

    console.log('Withdraw', { amount, address });
    setOpen(false);
  };

  
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full md:w-auto border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 border-zinc-800 w-[85vw] max-w-[360px] rounded-xl p-0 overflow-hidden">
          <div className="max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <DialogHeader className="space-y-2 pb-2">
                <DialogTitle className="text-lg font-semibold text-white">
                  Withdraw SOL
                </DialogTitle>
                <DialogDescription className="text-sm text-zinc-400">
                  Enter the amount and destination address for your withdrawal.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Amount (SOL)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-zinc-400 mb-1.5">
                    Destination Address
                  </label>
                  <Input
                    id="address"
                    value={address}
                    placeholder="Solana address"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    readOnly
                  />
                </div>
                <div className="text-sm text-zinc-500">
                  Network fee: ~0.000005 SOL
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 p-4 bg-zinc-900">
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-zinc-700 text-zinc-300 rounded-lg"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 rounded-lg"
                onClick={handleWithdraw}
                disabled={!amount || !address}
              >
                Confirm Withdrawal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
  );
}
