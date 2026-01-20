import { Home, FileText, BarChart, Settings, Users, CreditCard, Bell, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: CreditCard, label: 'Payments' },
    { icon: FileText, label: 'Invoices' },
    { icon: Users, label: 'Customers' },
    { icon: BarChart, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
      <div className="flex flex-col grow bg-sidebar text-sidebar-foreground pt-6">
        {/* Header - Minimal Text Logo */}
        <div className="px-6 pb-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-white text-blue-600 flex items-center justify-center shadow-sm">
            <CreditCard className="h-5 w-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">QuickPay</span>
        </div>

        {/* Search - Subtle */}
        <div className="px-4 pb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
            />
          </div>
        </div>

        {/* Navigation - Clean & Compact */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                item.active
                  ? "bg-white/15 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4", item.active ? "text-white" : "text-white/80")} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile - Minimal Footer */}
        <div className="p-4 mt-auto border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
              <span className="text-xs font-medium text-white">EM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">Eric Mwakio</p>
              <p className="text-xs text-white/70 truncate">admin@quickpay.com</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}