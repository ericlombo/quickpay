import { Button } from '../ui/button';
import { Plus, Download, Filter, Menu } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export function Header() {
  const openDrawer = useStore((state) => state.openDrawer);
  const toggleMobileMenu = useStore((state) => state.toggleMobileMenu);

  return (
    <header className="sticky top-0 z-40 flex h-14 sm:h-16 items-center border-b bg-background px-4 sm:px-6">
      <div className="relative flex flex-1 items-center">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Payments</h1>
          <p className="hidden sm:block text-sm text-muted-foreground">
            Manage your payments and invoices
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 h-9">
            <Filter className="h-4 w-4" />
            <span className="hidden lg:inline">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2 h-9">
            <Download className="h-4 w-4" />
            <span className="hidden lg:inline">Export</span>
          </Button>
          <Button onClick={openDrawer} size="sm" className="gap-1.5 sm:gap-2 h-9 text-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
