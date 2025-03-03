import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Wallet2, TrendingUp, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardStats {
  totalPnl: number;
  totalPnlPercentage: number;
  totalPnlUsd: number;
  totalInvested: number;
  activePositions: number;
  successRate: number;
}

interface SniperDashboardProps {
  stats: DashboardStats;
}

export function SniperDashboard({ stats }: SniperDashboardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-4 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Portfolio Overview</h3>
        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300">
          <Share2 className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Share Stats</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4">
        <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 text-base md:text-lg font-medium text-white">
            <Wallet2 className="h-4 w-4 md:h-5 md:w-5" />
            {stats.totalPnl.toFixed(5)}
          </div>
          <div className="text-xs md:text-sm text-zinc-400 mt-1">Total P&L (SOL)</div>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
          <div className={cn(
            "text-base md:text-lg font-medium",
            stats.totalPnlPercentage >= 0 ? "text-green-400" : "text-red-400"
          )}>
            {stats.totalPnlPercentage.toFixed(3)}%
          </div>
          <div className="text-xs md:text-sm text-zinc-400 mt-1">Total Return</div>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
          <div className="text-base md:text-lg font-medium text-white">
            ${Math.abs(stats.totalPnlUsd).toFixed(3)}
          </div>
          <div className="text-xs md:text-sm text-zinc-400 mt-1">Total P&L (USD)</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 text-base md:text-lg font-medium text-white">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
            {stats.totalInvested.toFixed(3)}
          </div>
          <div className="text-xs md:text-sm text-zinc-400 mt-1">Total Invested (SOL)</div>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 text-base md:text-lg font-medium text-white">
            <LineChart className="h-4 w-4 md:h-5 md:w-5" />
            {stats.activePositions}
          </div>
          <div className="text-xs md:text-sm text-zinc-400 mt-1">Active Positions</div>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
          <div className="text-base md:text-lg font-medium text-green-400">
            {stats.successRate}%
          </div>
          <div className="text-xs md:text-sm text-zinc-400 mt-1">Success Rate</div>
        </div>
      </div>
    </Card>
  );
}