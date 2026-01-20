// src/app/page.tsx
'use client';

import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/layout/MobileMenu';
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
      <MobileMenu />
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
        <StatsCards />
        <PaymentsTable payments={payments} />
      </div>
      <PaymentModal />
      <NewInvoiceDrawer />
    </div>
  );
}