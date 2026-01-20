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

export default function Home() {
  const payments = useStore((state) => state.payments);

  return (
    <>
      <Header />
      <MobileMenu />
      <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="max-w-full">
          <StatsCards />
          <PaymentsTable payments={payments} />
        </div>
      </div>
      <PaymentModal />
      <NewInvoiceDrawer />
      <InvoicePreviewModal />
    </>
  );
}