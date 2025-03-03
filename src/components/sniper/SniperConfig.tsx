import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Settings2, Zap, Shield, Target } from 'lucide-react';

export function SniperConfig() {
  const [mode, setMode] = useState('auto');
  const [gasPriority, setGasPriority] = useState('medium');
  const [boostMode, setBoostMode] = useState(false);
  const [autoSell, setAutoSell] = useState(true);

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="h-5 w-5 text-violet-400" />
              <h3 className="text-lg font-medium text-white">Basic Parameters</h3>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Mode
                  </label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="semi">Semi-Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Amount per Snipe (SOL)
                  </label>
                  <Input 
                    type="number" 
                    placeholder="0.1"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Max Positions
                  </label>
                  <Input 
                    type="number" 
                    placeholder="5"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Delay Between Snipes (ms)
                  </label>
                  <Input 
                    type="number" 
                    placeholder="1000"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-violet-400" />
              <h3 className="text-lg font-medium text-white">Gas Settings</h3>
              <Badge className="ml-auto bg-violet-500/20 text-violet-300">PRO</Badge>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Priority
                </label>
                <Select value={gasPriority} onValueChange={setGasPriority}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Max Gas Price (SOL)
                </label>
                <Input 
                  type="number" 
                  placeholder="0.001"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={boostMode}
                    onCheckedChange={setBoostMode}
                  />
                  <span className="text-sm text-zinc-400">Boost Mode</span>
                </div>
                <Badge className="bg-violet-500/20 text-violet-300">PRO</Badge>
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-violet-400" />
              <h3 className="text-lg font-medium text-white">Security & Anti-Rug</h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Min Liquidity Amount (SOL)
                  </label>
                  <Input 
                    type="number" 
                    placeholder="1"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Max Holder %
                  </label>
                  <Input 
                    type="number" 
                    placeholder="5"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Blocked Names (comma separated)
                </label>
                <Input 
                  placeholder="scam, rug, fake"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <span className="text-sm text-zinc-400">Mint Authority Check</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <span className="text-sm text-zinc-400">Freeze Authority Check</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <span className="text-sm text-zinc-400">Contract Verification</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="h-5 w-5 text-violet-400" />
              <h3 className="text-lg font-medium text-white">Take Profit / Stop Loss</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={autoSell}
                    onCheckedChange={setAutoSell}
                  />
                  <span className="text-sm text-zinc-400">Auto Sell</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Stop Loss %
                </label>
                <Slider
                  defaultValue={[20]}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Take Profit %
                </label>
                <Slider
                  defaultValue={[200]}
                  max={1000}
                  step={10}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-zinc-400">Progressive Sell</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Sell 25% at</label>
                    <Input 
                      type="number" 
                      placeholder="100"
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Sell 50% at</label>
                    <Input 
                      type="number" 
                      placeholder="200"
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Sell 75% at</label>
                    <Input 
                      type="number" 
                      placeholder="500"
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Sell 100% at</label>
                    <Input 
                      type="number" 
                      placeholder="1000"
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" className="border-zinc-700 text-zinc-300">
            Reset to Defaults
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700">
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}