import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Share2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TokenList } from './TokenList';
import { SniperConfig } from './SniperConfig';
import { Token } from '@/types';

interface SniperDashboardViewProps {
  onBack?: () => void;
}

export function SniperDashboardView({ onBack }: SniperDashboardViewProps) {
  const [showConfig, setShowConfig] = useState(false);
  const [hideSoldTokens, setHideSoldTokens] = useState(false);
  const [currentView, setCurrentView] = useState<'holdings' | 'watchlist' | 'snipelist'>('holdings');
  const [tokens] = useState<Token[]>([
    {
      id: "1",
      name: "alpha",
      address: "386pK...ZqBzC",
      liquidity: 1.185,
      invested: 0.037,
      remaining: 0,
      sold: 1.78,
      currentValue: 0.0443,
      pnl: 19.83,
      pnlAmount: 0.02733,
      status: 'active',
      liquidityUsd: 0,
      investedSol: 0
    },
    {
      id: "2",
      name: "Manyu",
      address: "6pCJN...S73Er",
      liquidity: 1.589,
      invested: 0.013,
      remaining: 179.867,
      sold: 0,
      currentValue: 0,
      pnl: -94.95,
      pnlAmount: -0.0123,
      status: 'sold',
      liquidityUsd: 0,
      investedSol: 0
    }
  ]);

  const filteredTokens = hideSoldTokens 
    ? tokens.filter(t => t.status === 'active')
    : tokens;

  const stats = {
    totalPnl: -0.025,
    totalPnlPercentage: -10.011,
    totalPnlUsd: -0.949
  };

  if (showConfig) {
    return (
      <div>
        {/* Titre en version mobile */}
        <div className="md:hidden mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Sniper Configuration</h2>
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
          <h2 className="text-xl font-bold text-white">Sniper Configuration</h2>
        </div>

        <SniperConfig />
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* En-tête mobile */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Sniper Dashboard</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfig(true)}
            className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
      </div>

      {/* En-tête desktop */}
      <div className="hidden md:flex items-center justify-between mb-6">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfig(true)}
            className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className="md:hidden mb-6">
        <Select 
          value={currentView} 
          onValueChange={(value: 'holdings' | 'watchlist' | 'snipelist') => setCurrentView(value)}
        >
          <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-100">
            <SelectValue>
              {currentView === 'holdings' && 'Holdings'}
              {currentView === 'watchlist' && 'Watchlist'}
              {currentView === 'snipelist' && 'Snipe List'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectItem value="holdings" className="text-zinc-100 focus:bg-violet-600 focus:text-white">
              Holdings
              <Badge className="ml-2 bg-violet-500/20 text-violet-300" variant="secondary">NEW!</Badge>
            </SelectItem>
            <SelectItem value="watchlist" className="text-zinc-100 focus:bg-violet-600 focus:text-white">
              Watchlist
            </SelectItem>
            <SelectItem value="snipelist" className="text-zinc-100 focus:bg-violet-600 focus:text-white">
              Snipe List
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Menu desktop */}
      <div className="hidden md:block">
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
              onClick={() => setCurrentView('watchlist')}
              className={cn(
                "px-4 py-2 border-b-2",
                currentView === 'watchlist'
                  ? "border-violet-500 text-white bg-violet-600"
                  : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
              )}
            >
              Watchlist
            </button>
            <button
              onClick={() => setCurrentView('snipelist')}
              className={cn(
                "px-4 py-2 border-b-2",
                currentView === 'snipelist'
                  ? "border-violet-500 text-white bg-violet-600"
                  : "border-transparent text-zinc-400 hover:text-white hover:border-violet-500"
              )}
            >
              Snipe List
            </button>
          </div>
        </div>
      </div>

      {/* Contenu */}
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
                  {stats.totalPnl.toFixed(5)}
                </div>
                <div className="text-xs md:text-sm text-zinc-400 mt-1">SOL</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
                <div className={cn(
                  "text-base md:text-lg font-medium",
                  stats.totalPnlPercentage >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {stats.totalPnlPercentage.toFixed(3)}%
                </div>
                <div className="text-xs md:text-sm text-zinc-400 mt-1">Percentage</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-3 md:p-4">
                <div className="text-base md:text-lg font-medium text-white">
                  ${Math.abs(stats.totalPnlUsd).toFixed(3)}
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

          <TokenList tokens={filteredTokens} onAction={() => {}} />
        </>
      )}

      {currentView === 'watchlist' && (
        <TokenList tokens={tokens} onAction={() => {}} />
      )}

      {currentView === 'snipelist' && (
        <TokenList tokens={tokens.filter(t => t.status === 'active')} onAction={() => {}} />
      )}
    </div>
  );
}