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
    <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 z-30 bg-[#0F53FF] text-white">
      <div className="relative flex flex-col w-full h-full pt-8">

        {/* Brand */}
        <div className="px-6 pb-8 flex items-center gap-3 relative z-10">
          <div className="h-10 w-10 rounded bg-white text-blue-600 flex items-center justify-center shadow-md">
            <FileText className="h-6 w-6" />
          </div>
          <span className="font-bold text-lg tracking-tight uppercase">QuickPay</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 relative z-10">
          {mainNavItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() =>
                  item.id === 'payments' && setPaymentsExpanded(!paymentsExpanded)
                }
                className={cn(
                  "w-full flex items-center justify-between px-6 py-3 text-xs font-semibold rounded-none transition-all border-l-4",
                  item.id === 'payments'
                    ? "border-white bg-[#1A5CFF]"
                    : "border-transparent text-blue-100 hover:text-white hover:bg-white/5"
                )}
              >
                <span className="tracking-wider">{item.label}</span>
                {item.hasSubmenu && (
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      paymentsExpanded && 'rotate-180'
                    )}
                  />
                )}
              </button>

              {item.id === 'payments' && paymentsExpanded && (
                <div className="ml-4 mt-2 space-y-2 border-l border-white/20 pl-3">
                  {paymentSubItems.map((sub) => (
                    <button
                      key={sub.id}
                      className="block w-full text-left text-sm text-white/65 hover:text-white/90 py-2"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mx-4 border-t border-white/20" />

        <div className="px-4 py-6 space-y-3">
          {bottomLinks.map((link) => (
            <button
              key={link.id}
              className="block w-full text-left text-xs font-medium text-white/70 hover:text-white py-2"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
