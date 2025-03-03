import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Save,
  Bell,
  Globe,
  Network,
  ExternalLink,
  Lock
} from 'lucide-react';
import { UpgradeDialog } from '@/components/shared/UpgradeDialog';

export function WalletSettings() {
  const [autoApprove, setAutoApprove] = useState(false);
  const [rpcEndpoint, setRpcEndpoint] = useState('default');
  const [priorityFee, setPriorityFee] = useState('0.001');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    tradeNotifications: true,
    securityAlerts: true,
    marketUpdates: false
  });
  const [customRpcUrl, setCustomRpcUrl] = useState('');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Network className="h-5 w-5 text-violet-400" />
          <h3 className="text-lg font-medium text-white">Network Settings</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              RPC Endpoint Configuration
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
                <SelectItem value="custom" className="text-zinc-100">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span>Custom Endpoint</span>
                        <Badge className="bg-violet-500/20 text-violet-300">PRO</Badge>
                      </div>
                      <span className="text-xs text-zinc-400">Use your own RPC endpoint</span>
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

          {rpcEndpoint === 'custom' && (
            <div className="animate-in slide-in-from-top-2">
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Custom RPC URL
              </label>
              <div className="flex items-center gap-2">
                <Input
                  value={customRpcUrl}
                  onChange={(e) => setCustomRpcUrl(e.target.value)}
                  placeholder="https://..."
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                />
                <Button 
                  variant="outline"
                  size="icon"
                  className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                Enter a valid Solana RPC endpoint URL
              </p>
            </div>
          )}

          {rpcEndpoint !== 'default' && rpcEndpoint !== 'custom' && (
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

          <div className="space-y-4 border-t border-zinc-800 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Auto-retry Failed Transactions</div>
                <div className="text-sm text-zinc-500">
                  Automatically retry failed transactions with optimized gas
                </div>
              </div>
              <Switch
                checked={autoApprove}
                onCheckedChange={setAutoApprove}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-white">Priority Fee</div>
                <div className="text-sm text-zinc-400">{priorityFee} SOL</div>
              </div>
              <Input
                type="number"
                value={priorityFee}
                onChange={(e) => setPriorityFee(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
              />
              <p className="text-xs text-zinc-500 mt-1">
                Set priority fee for faster transaction processing
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-violet-400" />
          <h3 className="text-lg font-medium text-white">Notifications</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Price Alerts</div>
              <div className="text-sm text-zinc-500">
                Get notified about significant price movements
              </div>
            </div>
            <Switch
              checked={notifications.priceAlerts}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, priceAlerts: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Trade Notifications</div>
              <div className="text-sm text-zinc-500">
                Receive alerts for completed trades
              </div>
            </div>
            <Switch
              checked={notifications.tradeNotifications}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, tradeNotifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Security Alerts</div>
              <div className="text-sm text-zinc-500">
                Important security notifications
              </div>
            </div>
            <Switch
              checked={notifications.securityAlerts}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, securityAlerts: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Market Updates</div>
              <div className="text-sm text-zinc-500">
                Daily market analysis and trends
              </div>
            </div>
            <Switch
              checked={notifications.marketUpdates}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, marketUpdates: checked }))
              }
            />
          </div>
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="h-5 w-5 text-violet-400" />
          <h3 className="text-lg font-medium text-white">Language & Region</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Timezone
            </label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                <SelectItem value="CET">Central European Time (CET)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-violet-600 hover:bg-violet-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <UpgradeDialog 
        open={showUpgradeDialog} 
        onOpenChange={setShowUpgradeDialog} 
      />
    </div>
  );
}