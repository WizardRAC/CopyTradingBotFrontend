import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Copy, Plus, Timer, LineChart } from 'lucide-react';
import { SniperDashboard } from './SniperDashboard';
import { TokenList } from './TokenList';
import { Token } from '@/types';

export function TokenMonitoring() {
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

  const mockStats = {
    totalPnl: -0.025,
    totalPnlPercentage: -10.011,
    totalPnlUsd: -0.949,
    totalInvested: 0.05,
    activePositions: 2,
    successRate: 65
  };

  const handleTokenAction = (tokenId: string, action: 'buy' | 'sell') => {
    console.log(`${action} token ${tokenId}`);
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <SniperDashboard stats={mockStats} />
        
        <Tabs defaultValue="snipe" className="w-full">
          <TabsList className="bg-zinc-900 border-b border-zinc-800 w-full justify-start rounded-none p-0 h-auto">
            <TabsTrigger 
              value="snipe" 
              className="data-[state=active]:bg-violet-600 rounded-none border-b-2 border-transparent data-[state=active]:border-violet-500 px-4 py-2"
            >
              <Timer className="h-4 w-4 mr-2" />
              Snipe List
            </TabsTrigger>
            <TabsTrigger 
              value="watchlist" 
              className="data-[state=active]:bg-violet-600 rounded-none border-b-2 border-transparent data-[state=active]:border-violet-500 px-4 py-2"
            >
              <Eye className="h-4 w-4 mr-2" />
              Watchlist
            </TabsTrigger>
            <TabsTrigger 
              value="positions" 
              className="data-[state=active]:bg-violet-600 rounded-none border-b-2 border-transparent data-[state=active]:border-violet-500 px-4 py-2"
            >
              <LineChart className="h-4 w-4 mr-2" />
              Active Positions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="snipe" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Tokens to Snipe</h3>
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Token
                </Button>
              </div>
              <TokenList tokens={tokens} onAction={handleTokenAction} />
            </Card>
          </TabsContent>

          <TabsContent value="watchlist" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Watchlist</h3>
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Watchlist
                </Button>
              </div>
              <TokenList tokens={tokens} onAction={handleTokenAction} />
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Active Positions</h3>
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Copy className="h-4 w-4 mr-2" />
                  Export History
                </Button>
              </div>
              <TokenList tokens={tokens.filter(t => t.status === 'active')} onAction={handleTokenAction} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}