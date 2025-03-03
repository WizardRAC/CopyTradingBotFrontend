import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet2, 
  TrendingUp, 
  Copy, 
  Crosshair, 
  Zap, 
  Activity,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
// ++ rac add WalletStats interface
import { getMyWalletInfo } from '../copytrading/callCopyBackend/getMyWalletInfo';
import { useWallet } from '@solana/wallet-adapter-react';

interface WalletStats {
  balance: number;
  totalPnl: number;
  totalPnlPercentage: number;
  copyTradingStats: {
    activeTraders: number;
    totalInvested: number;
    pnl: number;
  };
  sniperStats: {
    activePositions: number;
    totalInvested: number;
    pnl: number;
  };
  rpcStats: {
    speed: number;
    successRate: number;
    latency: number;
  };
}

let lastAskTime = 0;
export function WalletDashboard() {
  
  // ++ rac add Walletkey
  const phantomWalletKey = useWallet().publicKey?.toBase58();

  const [isExpanded, setIsExpanded] = useState(true);
  // rac add to manage Wallet Stats
  const [isStats, setIsStats] = useState<any>(null);
  const [stats] = useState<WalletStats>({
    balance: 0,
    totalPnl: 0,
    totalPnlPercentage: 0,
    copyTradingStats: {
      activeTraders: 0,
      totalInvested: 0,
      pnl: 0
    },
    sniperStats: {
      activePositions: 0,
      totalInvested: 0,
      pnl: 0
    },
    rpcStats: {
      speed: 92,
      successRate: 99.8,
      latency: 45
    }
  });

  
  const fetchDashboardData = async () => {

    try {
      if (!phantomWalletKey) {
        return;
      }
      const nowTime = new Date();
      if (lastAskTime > Number(nowTime) - 1000) {
        return;
      }
        lastAskTime = Number(nowTime);
      const data: any = await getMyWalletInfo(phantomWalletKey);
      console.log(' fetchDashboardData Dashboard data:', data);
      if (setIsStats) {
        setIsStats(data);
      }
    } catch (error) {
      console.error('fetchDashboardData Error fetching dashboard data:', error);
    }
  };
  
  let pnlPerscntage;
  let balance;
  let totalPnL;
  let totalPnlUsd;
  let tradeInvestedCount;
  let totalInvestedAmount;
  if (isStats && isStats != "Wallet not found") {
    pnlPerscntage = isStats.pnlPercentage;
    balance = isStats.walletTotalBalance;
    totalPnL = isStats.totalPnL;
    totalPnlUsd = isStats.totalPnlUsd;
    tradeInvestedCount = isStats.tradeInvestedCount;
    totalInvestedAmount = isStats.totalInvestedAmount;
  } else {
    pnlPerscntage = stats.totalPnlPercentage;
    balance = stats.balance;
    totalPnL = stats.copyTradingStats.pnl;
    totalPnlUsd = stats.totalPnl;
    tradeInvestedCount = stats.copyTradingStats.activeTraders;
    totalInvestedAmount = stats.copyTradingStats.totalInvested;
    fetchDashboardData();
  }

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-between border-t border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-violet-600 hover:text-white"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center">
          <Wallet2 className="mr-2 h-5 w-5" />
           {/* ++ rac modify to show balance */}
          <span className="font-medium">{balance.toFixed(3)} SOL</span>
          {/* <span className="font-medium">{stats.balance.toFixed(3)} SOL</span> */}
        </div>
        <ChevronUp className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wallet2 className="h-5 w-5 text-violet-400" />
            <h3 className="font-medium text-white">Wallet Overview</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsExpanded(false)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-2xl font-bold text-white">
              {/* rac modify to show balance */}
              $ {balance.toFixed(3)} USD
              {/* {stats.balance.toFixed(3)} SOL */}
            </div>
            <div className="flex items-center gap-2 text-sm">
              {/* rac modify pnlPerscntage */}
              <span className={cn(
                "font-medium",
                pnlPerscntage >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {pnlPerscntage >= 0 ? "+" : ""}{totalPnlUsd.toFixed(3)} SOL
                ({pnlPerscntage.toFixed(2)}%)
              </span>
              {/* <span className={cn(
                "font-medium",
                stats.totalPnlPercentage >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {stats.totalPnlPercentage >= 0 ? "+" : ""}{stats.totalPnl.toFixed(3)} SOL
                ({stats.totalPnlPercentage.toFixed(2)}%)
              </span> */}
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-800 rounded-lg p-2">
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-1">
                <Copy className="h-4 w-4" />
                Copy Trading
              </div>
              <div className="font-medium text-white">
                {/* rac modify to show totalInvestedAmount */}
                {totalInvestedAmount.toFixed(2)} SOL
                {/* {stats.copyTradingStats.totalInvested.toFixed(2)} SOL */}
              </div>
              <div className="text-xs text-zinc-500">
                {/* rac modify to show tradeInvestedCount */}
                {tradeInvestedCount} traders • 
                {/* {stats.copyTradingStats.activeTraders} traders •  */}
                <span className={cn(
                  "ml-1",
                  stats.copyTradingStats.pnl >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {/* rac modify copyTradingStats */}
                  {totalPnL >= 0 ? "+" : ""}
                  {totalPnL}%
                  {/* {stats.copyTradingStats.pnl >= 0 ? "+" : ""}
                  {stats.copyTradingStats.pnl}% */}
                </span>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-2">
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-1">
                <Crosshair className="h-4 w-4" />
                Sniper
              </div>
              <div className="font-medium text-white">
                {stats.sniperStats.totalInvested.toFixed(2)} SOL
              </div>
              <div className="text-xs text-zinc-500">
                {stats.sniperStats.activePositions} positions • 
                <span className={cn(
                  "ml-1",
                  stats.sniperStats.pnl >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {stats.sniperStats.pnl >= 0 ? "+" : ""}
                  {stats.sniperStats.pnl}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-4 w-4 text-violet-400" />
          <h4 className="text-sm font-medium text-white">RPC Performance</h4>
          <Badge 
            variant="secondary" 
            className="ml-auto bg-green-500/20 text-green-300"
          >
            HEALTHY
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-zinc-400">Speed</span>
              <span className="text-white">{stats.rpcStats.speed}%</span>
            </div>
            <Progress value={stats.rpcStats.speed} className="h-1" />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-zinc-400">Success Rate</span>
              <span className="text-white">{stats.rpcStats.successRate}%</span>
            </div>
            <Progress value={stats.rpcStats.successRate} className="h-1" />
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-zinc-400">Latency</span>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-green-400" />
                <span className="text-white">{stats.rpcStats.latency}ms</span>
              </div>
            </div>
            <Progress 
              value={100 - (stats.rpcStats.latency / 2)} 
              className="h-1" 
            />
          </div>
        </div>
      </div>
    </Card>
  );
}