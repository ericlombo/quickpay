// src/app/page.tsx
'use client';

import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { StatsCards } from '@/components/dashboard/StatsCards';
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
      <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Stats Row */}
        <StatsCards />

        {/* Invoices Section */}
        <div className="space-y-4">
          {/* Title Row */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Invoices</h2>
              <p className="text-sm text-muted-foreground mt-1">List of all your recent transactions.</p>
            </div>
            <Button onClick={openDrawer} className="gap-2">
              <Plus className="h-4 w-4" />
              <span>NEW INVOICE</span>
            </Button>
          </div>

          {/* Search & Filter Row */}
          <div className="flex items-center gap-3">
            <Input
              type="search"
              placeholder="Search an invoice"
              className="flex-1"
            />
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllOpen(!showAllOpen)}
                className="gap-2"
              >
                <span>Show all</span>
                <ChevronDown className="h-4 w-4" />
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