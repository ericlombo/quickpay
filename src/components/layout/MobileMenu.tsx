'use client';

import { Home, FileText, BarChart, Settings, Users, CreditCard, Search } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { useStore } from '@/stores/useStore';

export function MobileMenu() {
  const isMobileMenuOpen = useStore((state) => state.isMobileMenuOpen);
  const closeMobileMenu = useStore((state) => state.closeMobileMenu);

  const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: CreditCard, label: 'Payments' },
    { icon: FileText, label: 'Invoices' },
    { icon: Users, label: 'Customers' },
    { icon: BarChart, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={closeMobileMenu}>
      <SheetContent side="left" className="w-80 p-0 sm:w-80">
        <SheetHeader className="border-b px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            </div>
            <SheetTitle className="text-xl font-semibold tracking-tight">QuickPay</SheetTitle>
          </div>
        </SheetHeader>
        
        <div className="px-6 py-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              aria-label="Search"
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 transition-colors"
            />
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-3 h-11"
              onClick={closeMobileMenu}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">EM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Eric Mwakio</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

