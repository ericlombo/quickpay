// src/app/page.tsx
'use client';

import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { TopSummaryRow } from '@/components/dashboard/TopSummaryRow';
import { PaymentsTable } from '@/components/dashboard/PaymentsTable';
import { PaymentModal } from '@/components/dashboard/PaymentModal';
import { NewInvoiceDrawer } from '@/components/dashboard/NewInvoiceDrawer';
import { InvoicePreviewModal } from '@/components/dashboard/InvoicePreviewModal';
import { useStore } from '@/stores/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const payments = useStore((state) => state.payments);
  const openDrawer = useStore((state) => state.openDrawer);
  const [showAllOpen, setShowAllOpen] = useState(false);

  return (
    <>
      <Header />
      <MobileMenu />
      <div className="p-8 space-y-8">
        {/* Top Summary Row */}
        <TopSummaryRow />

        {/* Invoices Section */}
        <div className="space-y-6">
          {/* Title Row */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">Invoices</h2>
              <p className="text-xs text-muted-foreground mt-1">List of all your recent transactions.</p>
            </div>
            <Button onClick={openDrawer} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-sm px-6">
              <Plus className="h-4 w-4" />
              <span>NEW INVOICE</span>
            </Button>
          </div>

          {/* Search & Filter Row */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Search an Invoice"
                className="w-full bg-white border-gray-200 focus:border-blue-500 rounded-lg pl-10 py-5 shadow-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </span>
            </div>
            <div className="relative">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAllOpen(!showAllOpen)}
                className="gap-3 bg-white border-gray-200 text-muted-foreground font-normal min-w-[120px] justify-between"
              >
                <span>Show all</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
              {showAllOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-2 z-10">
                  <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">
                    All Invoices
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">
                    Paid
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">
                    Pending
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">
                    Overdue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <PaymentsTable payments={payments} />
      </div>
      <PaymentModal />
      <NewInvoiceDrawer />
      <InvoicePreviewModal />
    </>
  );
}