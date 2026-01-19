// src/app/page.tsx
'use client';

import { Header } from '@/components/layout/Header';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { PaymentsTable } from '@/components/dashboard/PaymentsTable';
import { PaymentModal } from '@/components/dashboard/PaymentModal';
import { NewInvoiceDrawer } from '@/components/dashboard/NewInvoiceDrawer';
import { useStore } from '@/stores/useStore';

export default function Home() {
  const payments = useStore((state) => state.payments);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-6 space-y-6">
        <StatsCards />
        <PaymentsTable payments={payments} />
      </div>
      <PaymentModal />
      <NewInvoiceDrawer />
    </div>
  );
}