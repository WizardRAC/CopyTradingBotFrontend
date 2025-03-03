import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: Date;
  type: string;
  amount: number;
  fee: number;
  status: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2024-03-15T15:30:00'),
    type: 'Sniper Buy',
    amount: 0.5,
    fee: 0.000005,
    status: 'Completed'
  },
  {
    id: '2',
    date: new Date('2024-03-15T14:45:00'),
    type: 'Copy Trade',
    amount: 0.25,
    fee: 0.000005,
    status: 'Completed'
  },
  {
    id: '3',
    date: new Date('2024-03-15T14:00:00'),
    type: 'Withdraw',
    amount: 1.5,
    fee: 0.000005,
    status: 'Completed'
  },
  {
    id: '4',
    date: new Date('2024-03-15T13:15:00'),
    type: 'Deposit',
    amount: 2.0,
    fee: 0.000005,
    status: 'Completed'
  }
];

export function WalletHistory() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800 p-4">
        <div className="flex flex-col gap-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:flex-1">
              <Input
                placeholder="Search transactions..."
                className="w-full bg-zinc-800 border-zinc-700 text-zinc-100"
                // prefix={<Search className="h-4 w-4 text-zinc-500" />}
              />
            </div>
            <div className="w-full md:w-[180px]">
              <Select defaultValue="all">
                <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-100">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="sniper">Sniper</SelectItem>
                  <SelectItem value="copytrading">Copy Trading</SelectItem>
                  <SelectItem value="deposit">Deposits</SelectItem>
                  <SelectItem value="withdraw">Withdrawals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Picker and Export */}
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="w-full md:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full md:w-auto border-zinc-700 text-zinc-300"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button className="w-full md:w-auto bg-violet-600 hover:bg-violet-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {mockTransactions.map((tx) => (
          <Card key={tx.id} className="bg-zinc-900 border-zinc-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">{tx.type}</div>
                <div className="text-sm text-zinc-500">
                  {format(tx.date, 'PPP p')}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-white">{tx.amount} SOL</div>
                <div className="text-sm text-zinc-500">
                  Fee: {tx.fee} SOL
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}