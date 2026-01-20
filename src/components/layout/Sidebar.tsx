'use client';

import { FileText, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Sidebar() {
  const [paymentsExpanded, setPaymentsExpanded] = useState(true);

  const mainNavItems = [
    { label: 'HOME', id: 'home' },
    { label: 'COMPANY', id: 'company' },
    { label: 'PERKS', id: 'perks' },
    { label: 'LEGAL', id: 'legal' },
    { label: 'PAYMENTS', id: 'payments', hasSubmenu: true },
  ];

  const paymentSubItems = [
    { label: 'Settings', id: 'payments-settings' },
    { label: 'Clients', id: 'payments-clients' },
  ];

  const bottomLinks = [
    { label: 'GET HELP', id: 'help' },
    { label: 'CHAT WITH US', id: 'chat' },
  ];

  return (
    <div className="hidden md:flex w-64 flex-col sticky top-0 h-screen shrink-0 z-30">
      <div className="flex flex-col grow bg-linear-to-b from-blue-600 to-blue-700 text-white pt-8 relative overflow-hidden">
        {/* Curved swoosh bottom-left decoration */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-white opacity-5 rounded-tr-full"></div>

        {/* Header - Brand Row */}
        <div className="px-6 pb-8 flex items-center gap-3 relative z-10">
          <div className="h-10 w-10 rounded bg-white text-blue-600 flex items-center justify-center shadow-md">
            <FileText className="h-6 w-6 fill-current" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">QuickPay</span>
        </div>

        {/* Navigation - Uppercase */}
        <nav className="flex-1 px-4 space-y-1 relative z-10">
          {mainNavItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => item.id === 'payments' && setPaymentsExpanded(!paymentsExpanded)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-xs font-semibold rounded-xl transition-all",
                  item.id === 'payments'
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <span className="tracking-wider">{item.label}</span>
                {item.hasSubmenu && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      paymentsExpanded ? "rotate-180" : ""
                    )}
                  />
                )}
              </button>

              {/* Submenu for PAYMENTS */}
              {item.id === 'payments' && paymentsExpanded && (
                <div className="ml-4 mt-2 space-y-2 border-l border-white/20 pl-3">
                  {paymentSubItems.map((subitem) => (
                    <button
                      key={subitem.id}
                      className="w-full text-left text-sm text-white/70 hover:text-white py-2 transition-colors"
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-white/20 relative z-10"></div>

        {/* Bottom Links */}
        <div className="px-4 py-6 space-y-3 relative z-10">
          {bottomLinks.map((link) => (
            <button
              key={link.id}
              className="w-full text-left text-xs font-semibold text-white/80 hover:text-white py-2 transition-colors tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}