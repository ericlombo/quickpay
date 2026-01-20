import { Button } from '../ui/button';
import { Plus, Download, Filter, Menu } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export function Header() {
  const openDrawer = useStore((state) => state.openDrawer);
  const toggleMobileMenu = useStore((state) => state.toggleMobileMenu);

  return (
    <header className="sticky top-0 z-40 flex h-14 sm:h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6">
      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Payments</h1>
            <p className="hidden sm:block text-sm text-muted-foreground">Manage your payments and invoices</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex gap-2 h-9"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden lg:inline">Filter</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex gap-2 h-9"
          >
            <Download className="h-4 w-4" />
            <span className="hidden lg:inline">Export</span>
          </Button>
          <Button 
            onClick={openDrawer} 
            size="sm" 
            className="gap-1.5 sm:gap-2 h-9 text-sm"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>
    </header>
  );
}