// ++ rac add useEffect for data fetching
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ChatView } from '@/components/chat/ChatView';
import { CopyTradingView } from '@/components/copytrading/CopyTradingView';
import { SniperView } from '@/components/sniper/SniperView';
import { WalletView } from '@/components/wallet/WalletView';
import { LandingPage } from '@/pages/LandingPage';
import { ActiveTrader, Message } from '@/types';
// ++ rac add getTargetWallets func to call backend
// import { getWhaleXWallet } from './components/copytrading/callCopyBackend/getWhaleXWallet';
import { useWallet } from '@solana/wallet-adapter-react';
import { getTargetWallets } from './components/copytrading/callCopyBackend/ActivateCopyTradingRaute';

interface Discussion {
  id: string;
  title: string;
  messages: Message[];
  date: string;
}

export default function App() {
  const [isAppLaunched, setIsAppLaunched] = useState(false);
  const [currentView, setCurrentView] = useState<'chat' | 'copytrading' | 'sniper' | 'wallet'>('chat');
  const [activeTraders, setActiveTraders] = useState<ActiveTrader[]>([]);
  const [selectedTraderAddress, setSelectedTraderAddress] = useState<string | null>(null);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [currentDiscussionId, setCurrentDiscussionId] = useState<string | null>(null);
  // ++ rac add to first fetch data
  const [isFirstTime, setIsFirstTime] = useState(true);

  
  const phantomWalletKey = useWallet().publicKey?.toBase58();

  if (isFirstTime && isAppLaunched) {
      const fetchDashboardData = async () => {
        try {
          console.log('Fetching active traders data...');
          if (!phantomWalletKey) {
            console.error('Phantom wallet key not found');
            return;
          }
          const data: ActiveTrader[] = await getTargetWallets(phantomWalletKey);
          setActiveTraders(data); // Update the state
        } catch (error) {
          console.error('Error fetching active traders:', error);
        }
      };
      fetchDashboardData();
      setIsFirstTime(false); // Set isFirstTime to false after the fetch
  }
  // -- rac add to first fetch data
  
  const handleTraderSelect = (address: string) => {
    setSelectedTraderAddress(address);
    setCurrentView('copytrading');
  };

  const handleNewDiscussion = () => {
    setCurrentDiscussionId(null);
    setCurrentView('chat');
  };

  const handleLaunchApp = () => {
    setIsAppLaunched(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return (
          <ChatView 
            discussions={discussions}
            setDiscussions={setDiscussions}
            currentDiscussionId={currentDiscussionId}
            setCurrentDiscussionId={setCurrentDiscussionId}
          />
        );
      case 'copytrading':
        return (
          <CopyTradingView
            activeTraders={activeTraders}
            setActiveTraders={setActiveTraders}
            selectedTraderAddress={selectedTraderAddress}
            setSelectedTraderAddress={setSelectedTraderAddress}
          />
        );
      case 'sniper':
        return <SniperView />;
      case 'wallet':
        return <WalletView />;
      default:
        return (
          <ChatView 
            discussions={discussions}
            setDiscussions={setDiscussions}
            currentDiscussionId={currentDiscussionId}
            setCurrentDiscussionId={setCurrentDiscussionId}
          />
        );
    }
  };

  if (!isAppLaunched) {
    return <LandingPage onLaunch={handleLaunchApp} />;
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-zinc-950">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        activeTraders={activeTraders}
        onTraderSelect={handleTraderSelect}
        discussions={discussions}
        currentDiscussionId={currentDiscussionId}
        setCurrentDiscussionId={setCurrentDiscussionId}
        onNewDiscussion={handleNewDiscussion}
      />
      <main className="flex-1 relative overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}