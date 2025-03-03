import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, Copy, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'incoming' | 'outgoing' | 'sniper' | 'copytrading';
  amount: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  hash: string;
  description: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'sniper',
    amount: 0.5,
    timestamp: '2 minutes ago',
    status: 'completed',
    hash: '5KGMfL8B3gX9vQzN2jE1Y6RqT4mX7Z9sKJhN2vQzN2jE',
    description: 'Sniper buy BONK'
  },
  {
    id: '2',
    type: 'copytrading',
    amount: 0.25,
    timestamp: '5 minutes ago',
    status: 'pending',
    hash: '7LKNpR9C4wY2mH6sV5tX8B3gX9vQzN2jE1Y6RqT4mX7Z',
    description: 'Copy trade from HZVWEYz'
  },
  {
    id: '3',
    type: 'incoming',
    amount: 1.5,
    timestamp: '10 minutes ago',
    status: 'completed',
    hash: '9MNQpL7D5kR3mJ8wV6uX4B3gX9vQzN2jE1Y6RqT4mX7Z',
    description: 'Received from Phantom'
  },
  {
    id: '4',
    type: 'outgoing',
    amount: 0.75,
    timestamp: '15 minutes ago',
    status: 'completed',
    hash: '2PQRsT8E6nW4mK9xU7vY4B3gX9vQzN2jE1Y6RqT4mX7Z',
    description: 'Sent to Exchange'
  }
];

export function WalletActivity() {
  return (
    <div className="space-y-4">
      {mockActivities.map((activity) => (
        <Card key={activity.id} className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2">
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                activity.type === 'incoming' && "bg-green-500/20",
                activity.type === 'outgoing' && "bg-red-500/20",
                activity.type === 'sniper' && "bg-violet-500/20",
                activity.type === 'copytrading' && "bg-blue-500/20"
              )}>
                {activity.type === 'incoming' && <ArrowDownRight className="h-5 w-5 text-green-400" />}
                {activity.type === 'outgoing' && <ArrowUpRight className="h-5 w-5 text-red-400" />}
                {activity.type === 'sniper' && <Copy className="h-5 w-5 text-violet-400" />}
                {activity.type === 'copytrading' && <Copy className="h-5 w-5 text-blue-400" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white truncate">{activity.description}</div>
                <div className="text-sm text-zinc-500">{activity.timestamp}</div>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-2 ml-14 sm:ml-0">
              <div className="font-medium text-white whitespace-nowrap">{activity.amount} SOL</div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "whitespace-nowrap",
                    activity.status === 'completed' && "bg-green-500/20 text-green-300",
                    activity.status === 'pending' && "bg-yellow-500/20 text-yellow-300",
                    activity.status === 'failed' && "bg-red-500/20 text-red-300"
                  )}
                >
                  {activity.status.toUpperCase()}
                </Badge>
                <a 
                  href={`https://solscan.io/tx/${activity.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  View
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}