import { SniperDashboardView } from './SniperDashboardView';

export function SniperView() {
  return (
    <div className="flex-1 p-6 bg-zinc-950 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <SniperDashboardView />
      </div>
    </div>
  );
}