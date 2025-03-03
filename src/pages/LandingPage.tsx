import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Github, BookOpen, Zap, Target, Network, Brain, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { ConnectWalletDialog } from '@/components/onboarding/ConnectWalletDialog';
import { ReferralCodeDialog } from '@/components/onboarding/ReferralCodeDialog';
import { PrivateKeyDialog } from '@/components/onboarding/PrivateKeyDialog';
import PHWallet from '@/components/wallet/WalletConnect';
import { useWallet } from '@solana/wallet-adapter-react';
import { getWhaleXWallet, saveWhaleXWallet } from '@/components/copytrading/callCopyBackend/getWhaleXWallet';
import GlobalState from '../GlobalState';
import { ToastContainer, toast } from 'react-toastify';

interface LandingPageProps {
  onLaunch: () => void;
}

const globalState = GlobalState.getInstance();

export function LandingPage({ onLaunch }: LandingPageProps) {
  const {publicKey} = useWallet();
  const [isVisible, setIsVisible] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
//monda
  const handleStart = () => {
    // if(publicKey){
    //   onLaunch();
    // }else{
      // setShowConnectWallet(true);
    // }
// ++ rac add useEffect for data fetching 
    if (!publicKey) {
      return;
    }
    const phantomWalletKey = publicKey.toBase58();

    const fetchDashboardData = async () => {
      try {
        console.log('Fetching active traders data...');
        if (!phantomWalletKey) {
          return;
        }
        const data: any = await getWhaleXWallet(phantomWalletKey);
        console.log('getWhaleXWallet : ', data.message);
        if (!data.message) {
          console.log('getWhaleXWallet failed');
          return;
        }
        if (data.message == "Wallet not found") {
          console.log('Wallet not found');
          setShowPrivateKey(true);
          return;
        } else if (data.message == "getWhaleXWallet success") {
          globalState.setUserId(data.userId);
          localStorage.setItem('RefreshToken', data.refreshToken);
          localStorage.setItem('accessToken', data.accessToken);
          if (!data.userId || !data.refreshToken || !data.accessToken) {
            console.log("Wallet data save failed");
            toast.error('falied to create wallet', {
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
          onLaunch();
        }
        // setActiveTraders(data); // Update the state
      } catch (error) {
        console.error('Error fetching active traders:', error);
      }
    };
    fetchDashboardData();

      // -- rac add to first fetch data
  };

  const handleWalletConnected = () => {
    setShowConnectWallet(false);
    setShowReferralCode(true);
  };

  const handleReferralSubmitted = () => {
    setShowReferralCode(false);
    setShowPrivateKey(true);
  };

  const handlePrivateKeySaved = async (walletData: any) => {
    if (!walletData) {
      return;
    }

    const result: any = await saveWhaleXWallet(walletData);
    if (!result || result === "Wallet data save failed") {
      console.log("Wallet data save failed");
      toast.error('falied to create wallet', {
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
    console.log("handlePrivateKeySaved result = ", result)
    if (result.jwtToken.encryptedAccessToken && result.jwtToken.encryptedRefreshToken) {
      localStorage.setItem('accessToken', result.jwtToken.encryptedAccessToken);
      localStorage.setItem('refreshToken', result.jwtToken.encryptedRefreshToken);
      globalState.setUserId(result.userId);
      toast.success('Success to create new wallet', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setShowPrivateKey(false);
      onLaunch();
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-violet-400" />,
      title: "Copy Trading Intelligence",
      description: "Utilisez l'intelligence artificielle pour copier les meilleurs traders de la blockchain Solana en temps réel."
    },
    {
      icon: <Target className="h-8 w-8 text-violet-400" />,
      title: "Sniper de Précision",
      description: "Détectez et achetez automatiquement les tokens les plus prometteurs dès leur lancement."
    },
    {
      icon: <Network className="h-8 w-8 text-violet-400" />,
      title: "Intégration Complète",
      description: "Une plateforme tout-en-un connectée aux principaux protocoles de l'écosystème Solana."
    },
    {
      icon: <Lock className="h-8 w-8 text-violet-400" />,
      title: "Sécurité Maximale",
      description: "Protection avancée contre les rugs et les arnaques avec analyse en temps réel."
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090E] relative overflow-hidden">
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
      {/* Spline Background avec hauteur ajustée */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ height: '150vh' }}>
        <div 
          className={`transition-opacity duration-1000 ${splineLoaded ? 'opacity-30' : 'opacity-0'}`}
          style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            transform: isMobile 
              ? 'translate(-50%, -0%) scale(0.7)' 
              : isTablet 
              ? 'translate(-50%, -10%) scale(0.85)' 
              : 'translate(-50%, -10%) scale(1)',
            width: isMobile ? '200vw' : isTablet ? '150vw' : '100vw',
            height: isMobile ? '150vh' : isTablet ? '150vh' : '120vh',
            transformOrigin: 'center top',
          }}
        >
          <Spline
            scene="https://prod.spline.design/5kWNPNCO9y6iIiRP/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
          />
        </div>
        {/* Gradient overlay ajusté */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090E] via-transparent to-[#08090E] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090E] via-transparent to-[#08090E] opacity-80" />
          <div className="absolute inset-0 bg-[#08090E]/30" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-violet-400" />
              <span className="ml-2 text-xl font-bold text-white">WhalesX</span>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="/docs"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <BookOpen className="h-5 w-5" />
              </a>
              <PHWallet/>
              {/* <Button 
                className="bg-violet-600 hover:bg-violet-700"
                onClick={handleStart}
              >
                Launch App
              </Button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="pt-32 pb-16 px-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-8">
                <Zap className="h-4 w-4" />
                Découvrez WhalesX
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              La Plateforme de Trading
              <span className="text-zinc-500"> Intelligente pour </span>
              <span className="text-violet-400">Solana</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-zinc-400 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Maximisez vos profits sur Solana avec notre suite d'outils alimentée par l'IA. Copy trading, sniper, et analyse en temps réel.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {publicKey?<Button 
                size="lg" 
                className="bg-violet-600 hover:bg-violet-700"
                onClick={handleStart}
              >
                Commencer
              </Button>:<PHWallet/>}
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                Voir sur GitHub
              </Button>
            </motion.div>

            {/* App Preview */}
            <motion.div
              className="relative mx-auto max-w-[1200px]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E] to-transparent z-10 h-40 bottom-0" />
                <div className="relative rounded-2xl overflow-hidden border border-violet-500/20 shadow-[0_0_50px_-12px] shadow-violet-500/20">
                  <div className="aspect-[2.236/1] relative">
                    <img 
                      src="https://i.ibb.co/2jSTzKz/Capture-d-e-cran-2024-03-17-a-17-03-49.png" 
                      alt="WhalesX Interface"
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      style={{
                        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                      }}
                    />
                    {/* Overlay pour donner un effet de profondeur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none" />
                  </div>
                </div>
                
                {/* Effet de brillance */}
                <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-violet-500/20 blur-3xl opacity-20 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Conçu pour la Performance
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Une suite complète d'outils pour maximiser vos performances de trading sur Solana
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-violet-500/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ConnectWalletDialog
        open={showConnectWallet}
        onOpenChange={setShowConnectWallet}
        onSuccess={handleWalletConnected}
      />

      <ReferralCodeDialog
        open={showReferralCode}
        onOpenChange={setShowReferralCode}
        onSuccess={handleReferralSubmitted}
      />

      <PrivateKeyDialog
        open={showPrivateKey}
        onOpenChange={setShowPrivateKey}
        onSuccess={handlePrivateKeySaved}
      />
    </div>
  );
}

