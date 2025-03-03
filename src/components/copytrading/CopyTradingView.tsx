// ++ rac add useEffect
import { useState, useEffect } from 'react';
import { AddWalletForm } from './AddWalletForm';
import { CopyTradingConfig } from './CopyTradingConfig';
import { TraderDashboard } from './TraderDashboard';
import { ActiveTraderCard } from './ActiveTraderCard';
import { ActiveTrader} from '@/types';
import { HoldingsDashboard } from './callCopyBackend/HoldingsDashboard';
import { useWallet } from '@solana/wallet-adapter-react';
import { activateCopyTradingRaute } from './callCopyBackend/ActivateCopyTradingRaute';

interface CopyTradingViewProps {
  activeTraders: ActiveTrader[];
  setActiveTraders: React.Dispatch<React.SetStateAction<ActiveTrader[]>>;
  selectedTraderAddress: string | null;
  setSelectedTraderAddress: React.Dispatch<React.SetStateAction<string | null>>;
}


export function CopyTradingView({ 
  activeTraders, 
  setActiveTraders, 
  selectedTraderAddress, 
  setSelectedTraderAddress 
}: CopyTradingViewProps) {
  const [targetAddress, setTargetAddress] = useState<string | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
// rac phantomWalletKey
const phantomWalletKey = useWallet().publicKey?.toBase58();

  // ++ rac modify const -> let
  let mockTraderDashboard = {
    address: targetAddress || selectedTraderAddress || "HZVWEYzoZiv31PA6SyTAdD4BNrWVktw5NkKH7YRaSAVh",
    totalPnl: -0.025,
    totalPnlPercentage: -10.011,
    totalPnlUsd: -0.949,
    currentsolPrice: 189.75,
    tokens: [
      {
        id: "1",
        name: "alpha",
        address: "386pK...ZqBzC",
        liquidity: 1.185,
        liquidityUsd: 0.224,
        invested: 0.037,
        remaining: 0,
        sold: 1.78,
        currentValue: 0.0443,
        pnlAmount: 0.02733,
        pnl: 3,
        status: 'active',
        investedSol: 0.037,
      },
      {
        id: "2",
        name: "Manyu",
        address: "6pCJN...S73Er",
        liquidity: 1.589,
        liquidityUsd: 0.301,
        invested: 0.013,
        remaining: 179.867,
        sold: 0,
        currentValue: 0,
        pnlAmount: -0.0123,
        pnl: 3,
        status: 'sold',
        investedSol: 0.013,
      }
    ],
    tradeHistory: [
      {
        id: "1",
        tokenName: "Tadpole",
        tokenAddress: "GD63t...QbPcC",
        type: "buy",
        price: 0.0569,
        amount: 1045000,
        date: "15 Oct 2024, 03:21:12 PM",
        hash: "5KGMfL8B3gX9vQzN2jE1Y6RqT4mX7Z9sKJhN2vQzN2jE"
      },
      {
        id: "2",
        tokenName: "BONK",
        tokenAddress: "DezXAZ...8Yk2B",
        type: "sell",
        price: 0.0023,
        amount: 5000000,
        date: "15 Oct 2024, 02:15:45 PM",
        hash: "7LKNpR9C4wY2mH6sV5tX8B3gX9vQzN2jE1Y6RqT4mX7Z"
      }
    ],
    activationHistory: [
      {
        id: "1",
        type: "settings_update",
        date: "24 Oct 2024, 08:49:20 PM",
        description: "Copy trading settings updated by you"
      },
      {
        id: "2",
        type: "deactivation",
        date: "16 Oct 2024, 03:37:50 PM",
        description: "Copy trading deactivated by you"
      },
      {
        id: "3",
        type: "activation",
        date: "15 Oct 2024, 02:47:59 AM",
        description: "Copy trading activated by you"
      }
    ]
  };

  // ++ rac add useEffect
  const [fetchedTraderData, setFetchedTraderData] = useState<any | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!targetAddress) {
          return;
        }
        if (!phantomWalletKey) {
          return;
        }
        console.log('TraderDashboard Dashboard target address:', targetAddress);
        const data: any = await HoldingsDashboard(phantomWalletKey, targetAddress);
        console.log('TraderDashboard HoldingsDashboard data:', data);
        setFetchedTraderData(data);
      } catch (error) {
        console.error(' TraderDashboard Error fetching dashboard data:', error);
      }
    };
  
    fetchDashboardData();
  }, [targetAddress]);
  
  const handleActivate = () => {
    let newTrader: ActiveTrader;
    if (!fetchedTraderData) {
      newTrader = {
        id: Date.now().toString(),
        address: targetAddress || fetchedTraderData.address,
        pnl: 0,
        solUsed: 0,
        isActive: false,
        pnlPercentage: 0,
        totalPnlUsd: 0
      };
    } else {
      newTrader = {
        id: Date.now().toString(),
        address: targetAddress || fetchedTraderData.address,
        pnl: fetchedTraderData.totalPnl,
        solUsed: fetchedTraderData.solUsed,
        isActive: fetchedTraderData.isActive,
        pnlPercentage: fetchedTraderData.totalPnlPercentage,
        totalPnlUsd: fetchedTraderData.totalPnlUsd
      };
    }

    if (!activeTraders) {
      setActiveTraders([newTrader])
    } else {
      setActiveTraders(prev =>[...prev, newTrader]);
    }
    // setActiveTraders(fetchedTraderData.activationTrader)
    setSelectedTraderAddress(targetAddress || mockTraderDashboard.address);
    setIsConfiguring(false);
  };
 
  const handleDeactivate = (address: string, activation: string) => {
    if (activation == "delete") {
      setActiveTraders(prev => prev.filter(trader => trader.address !== address));
      setSelectedTraderAddress(null);
      setTargetAddress(null);
      return;
    }
    const isActive = activation == "activate"
    if (phantomWalletKey)
      activateCopyTradingRaute(phantomWalletKey, address, isActive);

    // setActiveTraders(fetchedTraderData.activationTrader)
    setActiveTraders(prev => 
      prev.map(trader => 
        trader.address === address 
          ? { ...trader, isActive: isActive }
          : trader
      )
    );
  };

  // const toggleCopyTrading = (address: string, isActive: boolean) => {
  //   setActiveTraders(prev => 
  //     prev.map(trader => 
  //       trader.address === address 
  //         ? { ...trader, isActive: !isActive }
  //         : trader
  //     )
  //   );
  // };

  const handleViewTrades = (address: string) => {
    setSelectedTraderAddress(address);
  };

  const renderContent = () => {
    if (selectedTraderAddress) {
      // const currentTrader = activeTraders.find(t => t.address === selectedTraderAddress);
      // const isActive = currentTrader?.isActive ?? false;

      return (
        <div className="relative">
          <TraderDashboard
            trader={mockTraderDashboard}
            onBack={() => {
              setSelectedTraderAddress(null);
              setTargetAddress(null);
            }}
            onDeactivate={handleDeactivate}
          />
        </div>
      );
    }

    if (isConfiguring) {
      return (
        <CopyTradingConfig
          targetAddress={targetAddress || ""}
          onActivate={handleActivate}
        />
      );
    }

    return (
      <div className="space-y-6">
        <AddWalletForm onSubmit={(address) => {
          setTargetAddress(address);
          setIsConfiguring(true);
        }} />

        {activeTraders && activeTraders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-3">
            {activeTraders.map((trader) => (
              <ActiveTraderCard
                key={trader.id}
                trader={trader}
                onDeactivate={handleDeactivate}
                onViewTrades={handleViewTrades}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#08090E]">
      <div className="max-w-3xl mx-auto p-4 md:p-6">
        {renderContent()}
      </div>
    </div>
  );
}