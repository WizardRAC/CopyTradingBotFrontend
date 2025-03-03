// ++ rac add useEffect
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Copy, Share2, Settings, Power, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TokensTable } from './TokensTable';
import { TradeHistoryTable } from './TradeHistoryTable';
import { ActivationTimeline } from './ActivationTimeline';
import { FAQ } from './FAQ';
import { CopyTradingConfig } from './CopyTradingConfig';
import { TraderDashboard as TraderDashboardType } from '@/types';
// ++ rac add to call backend
import { HoldingsDashboard } from './callCopyBackend/HoldingsDashboard';
import { getDeleteWallets } from './callCopyBackend/ActivateCopyTradingRaute';
import { useWallet } from '@solana/wallet-adapter-react';
import { activateCopyTradingRaute } from './callCopyBackend/ActivateCopyTradingRaute';
import { ToastContainer, toast } from 'react-toastify';

interface TraderDashboardProps {
  trader: TraderDashboardType;
  onBack: () => void;
  onDeactivate?: (address: string, activation: string) => void;
}

let lastAskTime = 0;
let phantomWalletKey: string;

export function TraderDashboard({ trader, onBack, onDeactivate }: TraderDashboardProps) {
  const [showConfig, setShowConfig] = useState(false);
  const [hideSoldTokens, setHideSoldTokens] = useState(false);
  const [currentView, setCurrentView] = useState<'holdings' | 'history' | 'timeline' | 'faq'>('holdings');
  // ++ rac add to manage fetched data
  const [fetchedTraderData, setFetchedTraderData] = useState<TraderDashboardType | null>(trader);
  const key = useWallet().publicKey?.toBase58();
  if (key) {
    phantomWalletKey = key;
  } else {
    return;
  }
  // ++ rac add phantomWalletKey
  
  const filteredTokens = hideSoldTokens 
  // ++ rac modify to manage fetched data
  ? fetchedTraderData?.tokens.filter(t => t.status === 'active' && t.name) || []
  : fetchedTraderData?.tokens.filter(t => t.name) || [];
  // ? trader.tokens.filter(t => t.status === 'active')
  // : trader.tokens;

  // ++ rac add useEffect fo fetch data
    
  useEffect(() => {
    const nowTime = new Date();
    if (lastAskTime > Number(nowTime) + 1000) {
      return;
    }
      lastAskTime = Number(nowTime);
      const fetchDashboardData = async () => {
      try {
        if (!trader.address) {
          return;
        }
        if (!phantomWalletKey) {
          toast.error("Please join phantom wallet.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }
        const data: any = await HoldingsDashboard(phantomWalletKey, trader.address);
        if (!data) {
          toast.error("Failed to get dashboard information.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        console.log('TraderDashboard HoldingsDashboard data:', data);
        setFetchedTraderData(data);
      } catch (error) {
        console.error(' TraderDashboard Error fetching dashboard data:', error);
        toast.error("Failed to get dashboard information.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };

    fetchDashboardData();
  }, [trader]);

  const handleDeleteTrader = () => {
    // Logique pour supprimer complètement le trader
    onDeactivate?.(trader.address, "delete");
    // ++ rac add to Delete Trader
    if (!phantomWalletKey) {
      return;
    }
    getDeleteWallets(phantomWalletKey, trader.address);
  };

  const handleDeactivateTrader = () => {
    // Logique pour désactiver temporairement le trader
    // Cette fonction devrait être passée en prop
    activateCopyTradingRaute(phantomWalletKey, trader.address, false);
  };

  if (showConfig) {
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
        {/* Titre en version mobile */}
        <div className="md:hidden mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Update Configuration</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfig(false)}
            className="text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Titre en version desktop */}
        <div className="hidden md:flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfig(false)}
            className="text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h2 className="text-xl font-bold text-white">Update Configuration</h2>
        </div>

        <CopyTradingConfig
          targetAddress={trader.address}
          onActivate={() => setShowConfig(false)}
        />
      </div>
    );
  }

  // ++ rac modify to manage fetched data
  let totalPnl;
  let totalPnlPercentage;
  let totalPnlUsd;

  if (!fetchedTraderData) {
    totalPnl = 0;
    totalPnlPercentage = 0;
    totalPnlUsd = 0;
  } else {
    totalPnl = fetchedTraderData.totalPnl;
    totalPnlPercentage = fetchedTraderData.totalPnlPercentage;
    totalPnlUsd = fetchedTraderData.totalPnlUsd;
  }

  return (
    <div className="flex-1 h-full overflow-y-auto">
      <div className="p-4 md:p-6">
        {/* En-tête mobile */}
        <div className="md:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Trader Dashboard</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfig(true)}
                className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeactivateTrader}
                // rac test
                // onClick={() => onDeactivate?.(trader.address)}
                className="border-zinc-700 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-500"
              >
                <Power className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteTrader}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* En-tête desktop */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-zinc-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {trader.address.substring(0, 6)}...{trader.address.substring(trader.address.length - 6)}
              <Copy className="h-4 w-4 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfig(true)}
              // rac test
              // onClick={() => onDeactivate?.(trader.address)}
              className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeactivateTrader}
                className="border-zinc-700 text-zinc-300 hover:bg-red-600 hover:text-white hover:border-red-500"
              >
                <Power className="h-4 w-4 mr-2" />
                Deactivate
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteTrader}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div className="md:hidden mb-6 sticky top-0 z-10 bg-zinc-950">
          <Select 
            value={currentView} 
            onValueChange={(value: 'holdings' | 'history' | 'timeline' | 'faq') => setCurrentView(value)}
          >
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-100">
              <SelectValue>
                {currentView === 'holdings' && 'Holdings'}
                {currentView === 'history' && 'Trading History'}
                {currentView === 'timeline' && 'Activation Timeline'}
                {currentView === 'faq' && 'FAQ'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="holdings" className="text-zinc-100 focus:bg-violet-600 focus:text-white">
                Holdings
                <Badge className="ml-2 bg-violet-500/20 text-violet-300" variant="secondary">NEW!</Badge>
              </SelectItem>
              <SelectItem value="history" className="text-zinc-100 focus:bg-violet-600 focus:text-white">
                Trading History
              </SelectItem>
              <SelectItem value="timeline" className="text-zinc-100 focus:bg-violet-600 focus:text-white">
                Activation Timeline
              </SelectItem>
              <SelectItem value="faq" className="text-zinc-100 focus:bg-violet-600 focus:text-white">
                FAQ
                <Badge className="ml-2 bg-violet-500/20 text-violet-300" variant="secondary">NEW!</Badge>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:block sticky top-0 z-10 bg-zinc-950">
          <div className="border-b border-zinc-800 mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('holdings')}
                className={cn(
                  "flex items-center px-4 py-2 border-b-2",
                  currentView === 'holdings'
                    ? "border-violet-500 text-white bg-violet-600"
                    : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
                )}
              >
                Holdings
                <Badge className="ml-2 bg-violet-500/20 text-violet-300" variant="secondary">NEW!</Badge>
              </button>
              <button
                onClick={() => setCurrentView('history')}
                className={cn(
                  "px-4 py-2 border-b-2",
                  currentView === 'history'
                    ? "border-violet-500 text-white bg-violet-600"
                    : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
                )}
              >
                Trading History
              </button>
              <button
                onClick={() => setCurrentView('timeline')}
                className={cn(
                  "px-4 py-2 border-b-2",
                  currentView === 'timeline'
                    ? "border-violet-500 text-white bg-violet-600"
                    : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
                )}
              >
                Activation Timeline
              </button>
              <button
                onClick={() => setCurrentView('faq')}
                className={cn(
                  "flex items-center px-4 py-2 border-b-2",
                  currentView === 'faq'
                    ? "border-violet-500 text-white bg-violet-600"
                    : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
                )}
              >
                FAQ
                <Badge className="ml-2 bg-violet-500/20 text-violet-300" variant="secondary">NEW!</Badge>
              </button>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="pb-6">
          {currentView === 'holdings' && (
            <>
              <Card className="bg-zinc-900 border-zinc-800 p-4 md:p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-white">Total P&L</h3>
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300">
                    <Share2 className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Share P&L Card</span>
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                  <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
                    <div className="text-base md:text-lg font-medium text-white">
                      {/* ++ rac modify totalPnl*/}
                      {totalPnl.toFixed(5)}
                      {/* {trader.totalPnl.toFixed(5)} */}
                    </div>
                    <div className="text-xs md:text-sm text-zinc-400 mt-1">SOL</div>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
                    {/* ++ rac modify totalPnlPercentage*/}
                    <div className={cn(
                      "text-base md:text-lg font-medium",
                      totalPnlPercentage >= 0 ? "text-green-400" : "text-red-400"
                    )}>
                      {totalPnlPercentage.toFixed(3)}%
                    </div>
                      {/* <div className={cn(
                        "text-base md:text-lg font-medium",
                        trader.totalPnlPercentage >= 0 ? "text-green-400" : "text-red-400"
                      )}>
                        {trader.totalPnlPercentage.toFixed(3)}%
                      </div> */}
                    <div className="text-xs md:text-sm text-zinc-400 mt-1">Percentage</div>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
                    <div className="text-base md:text-lg font-medium text-white">
                      {/* ++ rac modify totalPnlUsd */}
                      ${(totalPnlUsd).toFixed(3)}
                      {/* ${Math.abs(trader.totalPnlUsd).toFixed(3)} */}
                    </div>
                    <div className="text-xs md:text-sm text-zinc-400 mt-1">USD</div>
                  </div>
                </div>
              </Card>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={hideSoldTokens}
                    onCheckedChange={setHideSoldTokens}
                  />
                  <span className="text-sm text-zinc-400">Hide Sold Tokens</span>
                </div>
              </div>

              <TokensTable tokens={filteredTokens} />
            </>
          )}

          {/* ++ rac add fetchedTraderData */}
          {currentView === 'history' && fetchedTraderData && (
            <Card className="bg-zinc-900 border-zinc-800 p-4 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Trading History</h3>
              </div>
              {/* ++ rac modify trader data */}
              <TradeHistoryTable trades={fetchedTraderData.tradeHistory.filter(history => history.tokenName && history.price)} />
              {/* <TradeHistoryTable trades={trader.tradeHistory} /> */}
            </Card>
          )}

          {/* ++ rac modify trader data */}
          {currentView === 'timeline' && fetchedTraderData && (
            <ActivationTimeline events={fetchedTraderData.activationHistory} />
          )}
          {/* {currentView === 'timeline' && (
            <ActivationTimeline events={trader.activationHistory} />
          )} */}

          {currentView === 'faq' && (
            <FAQ />
          )}
        </div>
      </div>
    </div>
  );
}