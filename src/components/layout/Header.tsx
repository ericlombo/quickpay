import { Button } from '../ui/button';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { useState } from 'react';

export function Header() {
  const toggleMobileMenu = useStore((state) => state.toggleMobileMenu);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center px-8 bg-transparent">
      <div className="flex flex-1 items-center justify-between">
        {/* Left side: Mobile Menu + Title */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10 transition-all duration-150 hover:scale-105"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-medium tracking-tight transition-all duration-150">Payments</h1>
        </div>

        {/* Right-side controls: Bell icon + User dropdown */}
        <div className="flex items-center gap-2 border-l border-border/40 pl-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground transition-all duration-150 hover:scale-105"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="h-9 px-2 text-sm font-normal flex items-center gap-1.5 hover:bg-muted/60 transition-all duration-150"
            >
              <span>Eric Lombo</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-150" />
            </Button>

            {/* User dropdown menu (placeholder) */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border/60 rounded-lg shadow-md py-2 animate-in fade-in zoom-in-95 duration-150">
                <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/40 transition-colors duration-100">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/40 transition-colors duration-100">
                  Settings
                </button>
                <hr className="my-2 border-border/40" />
                <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted/40 transition-colors duration-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
