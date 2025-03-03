import { Card } from '@/components/ui/card';
import { Power, Settings, Clock } from 'lucide-react';
import { ActivationEvent } from '@/types';

interface ActivationTimelineProps {
  events: ActivationEvent[];
}

export function ActivationTimeline({ events }: ActivationTimelineProps) {
  const getEventIcon = (type: ActivationEvent['type']) => {
    switch (type) {
      case 'activation':
        return <Power className="h-4 w-4 md:h-5 md:w-5 text-green-400" />;
      case 'deactivation':
        return <Power className="h-4 w-4 md:h-5 md:w-5 text-red-400" />;
      case 'settings_update':
        return <Settings className="h-4 w-4 md:h-5 md:w-5 text-violet-400" />;
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Activation History</h3>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800" />
        
        <div className="space-y-6 md:space-y-8">
          {events.map((event) => (
            <div key={event.id} className="relative pl-10">
              <div className="absolute left-0 p-2 rounded-full bg-zinc-900 border border-zinc-800">
                {getEventIcon(event.type)}
              </div>
              
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm md:text-base text-zinc-100">{event.description}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs md:text-sm text-zinc-500">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    {event.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}