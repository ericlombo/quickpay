'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, FileText, Users } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { formatCurrency } from '@/lib/formatters';
import { useMemo } from 'react';

export function StatsCards() {
  const payments = useStore((state) => state.payments);
  const invoices = useStore((state) => state.invoices);

  const stats = useMemo(() => {
    // Calculate total revenue from successful payments
    const totalRevenue = payments
      .filter((p) => p.status === 'success')
      .reduce((sum, p) => sum + p.amount, 0);

    // Calculate pending payments amount
    const pendingPayments = payments
      .filter((p) => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0);

    // Get total invoices count
    const totalInvoices = invoices.length;

    // Get unique customers count
    const uniqueCustomers = new Set(payments.map((p) => p.email)).size;

    // Calculate percentage changes (mock for now, could be from historical data)
    // In a real app, you'd compare with previous period
    const revenueChange = payments.length > 0 ? '+12.5%' : '0%';
    const pendingChange = pendingPayments > 0 ? '+5.2%' : '0%';
    const invoicesChange = totalInvoices > 0 ? '-2.3%' : '0%';
    const customersChange = uniqueCustomers > 0 ? '+8.1%' : '0%';

    return [
      {
        title: 'Total Revenue',
        value: formatCurrency(totalRevenue),
        change: revenueChange,
        trend: 'up' as const,
        icon: DollarSign,
      },
      {
        title: 'Pending Payments',
        value: formatCurrency(pendingPayments),
        change: pendingChange,
        trend: pendingPayments > 0 ? ('up' as const) : ('down' as const),
        icon: CreditCard,
      },
      {
        title: 'Total Invoices',
        value: totalInvoices.toLocaleString(),
        change: invoicesChange,
        trend: totalInvoices > 0 ? ('down' as const) : ('up' as const),
        icon: FileText,
      },
      {
        title: 'Active Customers',
        value: uniqueCustomers.toLocaleString(),
        change: customersChange,
        trend: 'up' as const,
        icon: Users,
      },
    ];
  }, [payments, invoices]);

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1.5 sm:mt-2 flex items-center gap-1 flex-wrap">
              {stat.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-600 shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600 shrink-0" />
              )}
              <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                {stat.change}
              </span>
              <span className="text-muted-foreground">from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
