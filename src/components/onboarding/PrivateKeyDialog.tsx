import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Key, Copy, Download, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { generateWhalesXWallet } from '@/components/copytrading/callCopyBackend/generateWhalesXWallet';
import { Buffer } from 'buffer';

let WalletData: any
interface PrivateKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (walletData: any) => void;
}

export const decryptLocally = async (encryptedData: string, encriptoKey: string): Promise<string> => {
  console.log("encryptedData ", encryptedData);
  const [ivHex, saltHex, ciphertext] = encryptedData.split(':');

  const iv = new Uint8Array(Buffer.from(ivHex, 'hex'));  // Convert IV from hex to Uint8Array
  const salt = new Uint8Array(Buffer.from(saltHex, 'hex'));  // Convert salt from hex to Uint8Array

  // Derive the key from the password and salt using PBKDF2
  const key = await deriveKeyFromPasswordAndSalt(encriptoKey!, salt);

  // Decrypt the data
  const decryptedData = await decryptData(key, iv, ciphertext);
  return decryptedData;
};

const deriveKeyFromPasswordAndSalt = async (password: string, salt: Uint8Array) => {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  // Import the password as key material for PBKDF2
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // Derive the key using PBKDF2
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-CBC', length: 256 },
    false,
    ['decrypt']
  );

  return derivedKey;
};

const decryptData = async (key: CryptoKey, iv: Uint8Array, ciphertext: string) => {
  // Convert the ciphertext from hex to Uint8Array
  const ciphertextArray = new Uint8Array(Buffer.from(ciphertext, 'hex'));

  // Decrypt the data using AES-CBC
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    ciphertextArray
  );

  // Convert the decrypted buffer to a string
  const decoder = new TextDecoder();
  const decryptedText = decoder.decode(decryptedBuffer);
  return decryptedText;
};

export function PrivateKeyDialog({ open, onOpenChange, onSuccess }: PrivateKeyDialogProps) {
  const [copied, setCopied] = useState(false);
  const [privateKey, setPrivateKey] = useState("whales-x");
  const { publicKey } = useWallet();

  if (!publicKey) {
    return;
  }
  if (open && privateKey === "whales-x") {
    const phantomWalletKey = publicKey.toBase58();
  
    const fetchDashboardData = async () => {
      try {
        console.log('Fetching active traders data...');
        if (!phantomWalletKey) {
          return;
        }

        WalletData = await generateWhalesXWallet(phantomWalletKey);
        if (WalletData) {
          const privateKey: string = await decryptLocally(WalletData.privateKey, phantomWalletKey)
          setPrivateKey(privateKey);
          // onSuccess();
          return;
        }
        // setActiveTraders(data); // Update the state
      } catch (error) {
        console.error('Error fetching active traders:', error);
      }
    };
    fetchDashboardData();
  }

  const successhandler = () => {
    onSuccess(WalletData);
  }


  const handleCopy = () => {
    navigator.clipboard.writeText(privateKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([privateKey], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "whalesx-private-key.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-zinc-900 border-zinc-800 w-[90vw] sm:w-[85vw] max-w-[400px] rounded-xl p-0 overflow-hidden">
          <div className="p-4 sm:p-6">
            <DialogHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
                <Key className="h-6 w-6 text-violet-400" />
              </div>
              <DialogTitle className="text-lg sm:text-xl font-bold text-white">
                Votre Clé Privée
              </DialogTitle>
              <DialogDescription className="text-sm text-zinc-400">
                Sauvegardez cette clé dans un endroit sûr. Elle vous permettra de récupérer votre compte.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
              <div className="relative">
                <Input
                  value={privateKey}
                  readOnly
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 pr-20 text-sm sm:text-base break-all"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white h-7 px-2"
                  onClick={handleCopy}
                >
                  {copied ? (
                    "Copié !"
                  ) : (
                    <>
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="text-xs sm:text-sm">Copier</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-2 sm:p-3">
                <div className="flex gap-2 text-yellow-300 items-start">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm">
                    Ne partagez jamais cette clé. Quiconque ayant accès à cette clé pourra accéder à votre compte.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  className="w-full sm:flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm h-9 sm:h-10"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
                <Button
                  className="w-full sm:flex-1 bg-violet-600 hover:bg-violet-700 text-sm h-9 sm:h-10"
                  onClick={successhandler}
                >
                  J'ai sauvegardé
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


  // // Decrypt function
  // export const decryptLocally = async (encryptedData: string): Promise<string> => {
  //   console.log("encryptedData ", encryptedData)
  //   const [ivHex, saltHex, ciphertext] = encryptedData.split(':');
  //   const iv = Buffer.from(ivHex, 'hex');
  //   const salt = Buffer.from(saltHex, 'hex');
  
  //   // Derive the key from the password and salt
  //   const key = crypto.pbkdf2Sync(process.env.ENCRYPTION_KEY!, salt, 100000, 32, 'sha256');
  
  //   // Create a decipher using the key and IV
  //   const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  
  //   // Decrypt the data
  //   let decryptedData = decipher.update(ciphertext, 'hex', 'utf8');
  //   decryptedData += decipher.final('utf8');
  
  //   return decryptedData;
  // }
