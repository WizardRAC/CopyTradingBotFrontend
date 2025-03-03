// ++ rac add useEffect
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, X, ChevronDown, ChevronUp, Network, Lock, Zap } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UpgradeDialog } from '@/components/shared/UpgradeDialog';
import { ExitStrategy } from '@/types';
// ++ rac add to call backend
import { CopyTradingCreate, getCopyTradingStrategy } from './callCopyBackend/CopyTradingCreateRaute';
import { useWallet } from '@solana/wallet-adapter-react';
import { ToastContainer, toast } from 'react-toastify';

interface CopyTradingConfigProps {
  targetAddress: string;
  onActivate: (config: {
    tradeName: string;
    buyAmount: string;
    totalAllocation: string;
    stopLoss: string;
    exitStrategies: ExitStrategy[];
    minThreshold: string;
    maxBuyAmount: string;
    priorityFee: string;
    manualExitEnabled: boolean;
  }) => void;
}


export function CopyTradingConfig({ targetAddress, onActivate }: CopyTradingConfigProps) {
  // ++ rac add state to manage data fetching
  const [requestData, setCopyTradingStrategy] = useState<any>(null);
  const [tradeName, setTradeName] = useState('');
  const [buyAmount, setBuyAmount] = useState('0.001');
  const [totalAllocation, setTotalAllocation] = useState('0.01');
  const [stopLoss, setStopLoss] = useState('');
  const [exitStrategies, setExitStrategies] = useState<ExitStrategy[]>([
    { id: '1', sellPercentage: '25', profitPercentage: '50' },
    { id: '2', sellPercentage: '25', profitPercentage: '100' },
    { id: '3', sellPercentage: '25', profitPercentage: '200' },
    { id: '4', sellPercentage: '25', profitPercentage: '500' }
  ]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minThreshold, setMinThreshold] = useState('0.001');
  const [maxBuyAmount, setMaxBuyAmount] = useState('1');
  const [priorityFee, setPriorityFee] = useState('0.001');
  const [briberyAmount, setBriberyAmount] = useState('0.001');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [rpcEndpoint, setRpcEndpoint] = useState('default');
  const [manualExitEnabled, setManualExitEnabled] = useState(true);

  const phantomWalletKey = useWallet().publicKey?.toBase58();

  const addExitStrategy = () => {
    const newStrategy: ExitStrategy = {
      id: Date.now().toString(),
      sellPercentage: '10',
      profitPercentage: '100'
    };
    setExitStrategies([...exitStrategies, newStrategy]);
  };


  // ++ rac add to fetch data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!targetAddress) {
          return;
        }
        if (!phantomWalletKey) {
          return;
        }
        console.log('CopyTradingConfig Dashboard data:', targetAddress);
        const data: any = await getCopyTradingStrategy(phantomWalletKey, targetAddress);
        console.log(' CopyTradingConfig Dashboard data:', data);
        setCopyTradingStrategy(data);
      } catch (error) {
        toast.error("Don't get trading strategy!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error('CopyTradingConfig Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [targetAddress]);

  // Update states when requestData changes
  useEffect(() => {
    if (requestData) {
      setTradeName(requestData.tradeName || '');
      setBuyAmount(requestData.buyAmount || '0.001');
      setTotalAllocation(requestData.totalAllocation || '0.01');
      setStopLoss(requestData.stopLoss || '');
      setExitStrategies(requestData.exitStrategies || [
        { id: '1', sellPercentage: '25', profitPercentage: '50' },    // Conservative exit
        { id: '2', sellPercentage: '25', profitPercentage: '100' },   // Mid-term target
        { id: '3', sellPercentage: '25', profitPercentage: '200' },   // High profit target
        { id: '4', sellPercentage: '25', profitPercentage: '500' },   // Moon bag
      ]);
      setMinThreshold(requestData.minThreshold || '0.001');
      setMaxBuyAmount(requestData.maxBuyAmount || '1');
      setPriorityFee(requestData.priorityFee || '0.001');
      setManualExitEnabled(requestData.manualExitEnabled || true);
    }
  }, [requestData]);

  // -- rac add to fetch data

  const removeExitStrategy = (id: string) => {
    setExitStrategies(exitStrategies.filter(strategy => strategy.id !== id));
  };

  async function handleActivate() {
    onActivate({
      tradeName,
      buyAmount,
      totalAllocation,
      stopLoss,
      exitStrategies,
      minThreshold,
      maxBuyAmount,
      priorityFee,
      manualExitEnabled,
    });
    const requestData = {
      phantomWalletKey: phantomWalletKey,
      targetWallet: targetAddress,
      tradeName: tradeName,
      buyAmount: buyAmount,
      totalAllocation: totalAllocation,
      stopLoss: stopLoss,
      exitStrategies: exitStrategies,
      minThreshold: minThreshold,
      maxBuyAmount: maxBuyAmount,
      priorityFee: priorityFee,
      manualExitEnabled: manualExitEnabled
    };
    CopyTradingCreate(requestData);
    toast.success('Set Target Wallet!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };


  return (
    <div className="animate-in">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Card className="mt-6 p-4 md:p-6 bg-zinc-900 border-zinc-800 space-y-4 md:space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Unique Copy Trade Name
          </label>
          <Input
            value={tradeName}
            onChange={(e) => setTradeName(e.target.value)}
            placeholder="Enter a name for this copy trade"
            className="bg-zinc-800 border-zinc-700 text-zinc-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Buy Amount (SOL)
            </label>
            <Input
              type="number"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              min="0.001"
              step="0.001"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
            />
            <p className="text-xs text-zinc-500 mt-1">Minimum 0.001 per order</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Total SOL to Allocate
            </label>
            <Input
              type="number"
              value={totalAllocation}
              onChange={(e) => setTotalAllocation(e.target.value)}
              min="0.01"
              step="0.01"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
            />
            <p className="text-xs text-zinc-500 mt-1">Min 0.01 SOL</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            Stop Loss Trigger %
          </label>
          <Input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            placeholder="e.g. 0 - 100%"
            className="bg-zinc-800 border-zinc-700 text-zinc-100"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-zinc-200">Manual Exit Strategy</h3>
            <Switch
              checked={manualExitEnabled}
              onCheckedChange={setManualExitEnabled}
            />
          </div>
          
          {manualExitEnabled && (
            <div className="space-y-4">
              {exitStrategies.map((strategy, index) => (
                <div key={strategy.id} className="grid grid-cols-[1fr,auto,auto,1fr,auto,auto] md:flex md:flex-row items-center gap-2">
                  <Input
                    type="number"
                    value={strategy.sellPercentage}
                    onChange={(e) => {
                      const newStrategies = [...exitStrategies];
                      newStrategies[index].sellPercentage = e.target.value;
                      setExitStrategies(newStrategies);
                    }}
                    className="w-full md:w-20 bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                  <span className="text-zinc-400 justify-self-center">%</span>
                  <span className="text-zinc-400 justify-self-center">@</span>
                  <Input
                    type="number"
                    value={strategy.profitPercentage}
                    onChange={(e) => {
                      const newStrategies = [...exitStrategies];
                      newStrategies[index].profitPercentage = e.target.value;
                      setExitStrategies(newStrategies);
                    }}
                    className="w-full md:w-24 bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                  <span className="text-zinc-400 justify-self-center">%</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExitStrategy(strategy.id)}
                    className="text-zinc-500 hover:text-zinc-300 justify-self-end"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={addExitStrategy}
                className="w-full md:w-auto mt-2 border-zinc-700 text-zinc-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Exit Strategy
              </Button>
            </div>
          )}
        </div>

        <div>
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between text-zinc-300"
          >
            Advanced Settings
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          
          {showAdvanced && (
            <div className="space-y-6 mt-4 animate-in">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Network className="h-5 w-5 text-violet-400" />
                  <h3 className="text-lg font-medium text-white">Network Settings</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      RPC Configuration
                    </label>
                    <Select value={rpcEndpoint} onValueChange={setRpcEndpoint}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                        <SelectValue placeholder="Select RPC endpoint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default" className="text-zinc-100">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col">
                              <span>Default (Basic)</span>
                              <span className="text-xs text-zinc-400">Standard network connection</span>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="swqos" className="text-zinc-100">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span>SWQOS</span>
                                <Badge className="bg-violet-500/20 text-violet-300">PRO</Badge>
                              </div>
                              <span className="text-xs text-zinc-400">Enhanced quality of service</span>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="swqos-relay" className="text-zinc-100">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span>SWQOS+Relay</span>
                                <Badge className="bg-violet-500/20 text-violet-300">PRO</Badge>
                              </div>
                              <span className="text-xs text-zinc-400">Premium routing with relay network</span>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="jito" className="text-zinc-100">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span>Jito</span>
                                <Badge className="bg-violet-500/20 text-violet-300">PRO</Badge>
                              </div>
                              <span className="text-xs text-zinc-400">MEV-aware routing</span>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {rpcEndpoint !== 'default' && (
                    <div className="animate-in slide-in-from-top-2 rounded-lg border border-violet-500/20 bg-violet-500/5 p-4">
                      <div className="flex items-center gap-2 text-violet-300 mb-2">
                        <Lock className="h-4 w-4" />
                        <span className="text-sm font-medium">Premium Feature</span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        This RPC configuration requires a premium subscription. Upgrade your account to access enhanced network features.
                      </p>
                      <Button 
                        className="mt-4 bg-violet-600 hover:bg-violet-700"
                        onClick={() => setShowUpgradeDialog(true)}
                      >
                        Upgrade to Pro
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-5 w-5 text-violet-400" />
                  <h3 className="text-lg font-medium text-white">Transaction Settings</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Min. Threshold for Copying (SOL)
                    </label>
                    <Input
                      type="number"
                      value={minThreshold}
                      onChange={(e) => setMinThreshold(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                    <p className="text-xs text-zinc-500 mt-1">Minimum amount to trigger copy trading</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Max Buy Amount per Token (SOL)
                    </label>
                    <Input
                      type="number"
                      value={maxBuyAmount}
                      onChange={(e) => setMaxBuyAmount(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                    <p className="text-xs text-zinc-500 mt-1">Maximum amount to spend on a single token</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Priority Fee (SOL)
                    </label>
                    <Input
                      type="number"
                      value={priorityFee}
                      onChange={(e) => setPriorityFee(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                    <p className="text-xs text-zinc-500 mt-1">Additional fee for faster transaction processing</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Bribery Amount (SOL)
                    </label>
                    <Input
                      type="number"
                      value={briberyAmount}
                      onChange={(e) => setBriberyAmount(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                    <p className="text-xs text-zinc-500 mt-1">MEV bribe for priority inclusion</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Button 
          className="w-full bg-violet-600 hover:bg-violet-700 text-white transition-all duration-300"
          size="lg"
          onClick={handleActivate}
        >
          Activate Copy Trading
        </Button>
        <p className="text-xs text-zinc-500 text-center">
          For your trade security, we don't copy trade orders for tokens that are already in your trading wallet holdings
        </p>
      </Card>

      <UpgradeDialog 
        open={showUpgradeDialog} 
        onOpenChange={setShowUpgradeDialog} 
      />
    </div>
  );
}