import { useState } from 'react';
import { WalletDashboard } from './WalletDashboard';
import { WalletActivity } from './WalletActivity';
import { WalletHistory } from './WalletHistory';
import { WalletSettings } from './WalletSettings';
import { WithdrawDialog } from './WithdrawDialog';
import { DepositDialog } from './DepositDialog';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Wallet2, Activity, Settings2, History, Copy, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { getMyWalletInfo } from "../copytrading/callCopyBackend/getMyWalletInfo"

let isFirst = true;
export function WalletView() {

  const [currentView, setCurrentView] = useState<'overview' | 'activity' | 'history' | 'settings'>('overview');
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [isStats, setIsStats] = useState<any>({walletTotalBalance: 0, publicKey:"......"});

  const phantomWalletKey = useWallet().publicKey?.toBase58();
  
  if (isFirst) {
    const fetchDashboardData = async () => {
      try {
        console.log('CopyTradingConfig Dashboard data:', phantomWalletKey);
        if (!phantomWalletKey) {
          return;
        }
        const data: any = await getMyWalletInfo(phantomWalletKey);
        console.log(' CopyTradingConfig Dashboard data:', data);
        setIsStats(data);
      } catch (error) {
        console.error('CopyTradingConfig Error fetching dashboard data:', error);
      }
    };
    isFirst = false;
    fetchDashboardData()
  }
  
  // Mock wallet data - in a real app, this would come from your wallet connection
  const walletData = {
    address: isStats.publicKey,
    balance: isStats.walletTotalBalance
  };

const copyAddress = () => {
    if (walletData.address)
    navigator.clipboard.writeText(walletData.address);
    // You would typically show a toast notification here
  };

  const truncateAddress = (address: string) => {
    if (!address) {
      return "........";
    }
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex-1 p-6 bg-zinc-950 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-white">Wallet</h2>
          
          <Card className="w-full md:w-auto bg-zinc-900 border-zinc-800">
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <Wallet2 className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-400">{truncateAddress(walletData.address)}</span>
                      <button 
                        onClick={copyAddress}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {(walletData.balance)!.toFixed(3)} SOL
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 md:ml-auto">
                  <Button 
                    variant="outline" 
                    className="flex-1 md:flex-none border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
                    onClick={() => setShowDepositDialog(true)}
                  >
                    <ArrowDownRight className="h-4 w-4 mr-2" />
                    Deposit
                  </Button>
                  <WithdrawDialog />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Menu mobile */}
        <div className="md:hidden mb-6">
          <Select 
            value={currentView} 
            onValueChange={(value: 'overview' | 'activity' | 'history' | 'settings') => setCurrentView(value)}
          >
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-100">
              <SelectValue placeholder="Select view">
                {currentView === 'overview' && (
                  <div className="flex items-center">
                    <Wallet2 className="h-4 w-4 mr-2" />
                    Overview
                  </div>
                )}
                {currentView === 'activity' && (
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2" />
                    Activity
                  </div>
                )}
                {currentView === 'history' && (
                  <div className="flex items-center">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </div>
                )}
                {currentView === 'settings' && (
                  <div className="flex items-center">
                    <Settings2 className="h-4 w-4 mr-2" />
                    Settings
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">
                <div className="flex items-center">
                  <Wallet2 className="h-4 w-4 mr-2" />
                  Overview
                </div>
              </SelectItem>
              <SelectItem value="activity">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Activity
                </div>
              </SelectItem>
              <SelectItem value="history">
                <div className="flex items-center">
                  <History className="h-4 w-4 mr-2" />
                  History
                </div>
              </SelectItem>
              <SelectItem value="settings">
                <div className="flex items-center">
                  <Settings2 className="h-4 w-4 mr-2" />
                  Settings
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:block">
          <div className="border-b border-zinc-800 mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('overview')}
                className={cn(
                  "flex items-center px-4 py-2 border-b-2",
                  currentView === 'overview'
                    ? "border-violet-500 text-white bg-violet-600"
                    : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
                )}
              >
                <Wallet2 className="h-4 w-4 mr-2" />
                Overview
              </button>
              <button
                onClick={() => setCurrentView('activity')}
                className={cn(
                  "flex items-center px-4 py-2 border-b-2",
                  currentView === 'activity'
                    ? "border-violet-500 text-white bg-violet-600"
                    : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
                )}
              >
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </button>
              <button
                onClick={() => setCurrentView('history')}
                className={cn(
                  "flex items-center px-4 py-2 border-b-2",
                  currentView === 'history'
                    ? "border-violet-500 text-white bg-violet-600"
                    : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
                )}
              >
                <History className="h-4 w-4 mr-2" />
                History
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={cn(
                  "flex items-center px-4 py-2 border-b-2",
                  currentView === 'settings'
                    ? "border-violet-500 text-white bg-violet-600"
                    : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
                )}
              >
                <Settings2 className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {currentView === 'overview' && <WalletDashboard />}
        {currentView === 'activity' && <WalletActivity />}
        {currentView === 'history' && <WalletHistory />}
        {currentView === 'settings' && <WalletSettings />}

        <DepositDialog open={showDepositDialog} onOpenChange={setShowDepositDialog} />
      </div>
    </div>
  );
}