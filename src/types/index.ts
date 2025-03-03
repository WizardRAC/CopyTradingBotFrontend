export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

export interface ExitStrategy {
  id: string;
  sellPercentage: string;
  profitPercentage: string;
}

export interface ActiveTrader {
  id: string;
  address: string;
  pnl: number;
  pnlPercentage: number;
  solUsed: number;
  totalPnlUsd: number;
  isActive: boolean;
}

export interface Token {
  id: string;
  name: string;
  address: string;
  liquidity: number;
  liquidityUsd: number;
  invested: number;
  remaining: number;
  sold: number;
  currentValue: number;
  investedSol: number;
  pnlAmount: number;
  pnl: number;
  status: string;
}

export interface TradeHistory {
  id: string;
  tokenName: string;
  tokenAddress: string;
  type: string;
  price: number;
  amount: number;
  date: string;
  hash: string;
}

export interface ActivationEvent {
  id: string;
  type: string;
  date: string;
  description: string;
}

export interface TraderDashboard {
  address: string;
  totalPnl: number;
  totalPnlPercentage: number;
  totalPnlUsd: number;
  currentsolPrice: number;
  tokens: Token[];
  tradeHistory: TradeHistory[];
  activationHistory: ActivationEvent[];
}