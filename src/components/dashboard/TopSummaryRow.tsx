'use client';

import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useStore } from '@/stores/useStore';
import { formatCurrency } from '@/lib/formatters';
import { useMemo } from 'react';
import { Copy, Edit2, Link2 } from 'lucide-react';

export function TopSummaryRow() {
  const payments = useStore((state) => state.payments);

  const totals = useMemo(() => {
    const totalReceived = payments
      .filter((p) => p.status === 'success')
      .reduce((sum, p) => sum + p.amount, 0);

    const pendingAmount = payments
      .filter((p) => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0);

    const draftAmount = payments
      .filter((p) => p.status === 'processing')
      .reduce((sum, p) => sum + p.amount, 0);

    return { totalReceived, pendingAmount, draftAmount };
  }, [payments]);

  const { totalReceived, pendingAmount, draftAmount } = totals;

  // Helper to split currency for styling (e.g. "$1,892.10" -> "$1,892" + ".10")
  const splitAmount = (amount: number) => {
    const formatted = formatCurrency(amount);
    const parts = formatted.split('.');
    return {
      integer: parts[0],
      decimal: parts.length > 1 ? `.${parts[1]}` : '',
    };
  };

  const mainTotal = splitAmount(totalReceived);

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
      {/* LEFT CARD - Total Received */}
      <Card className="border-none shadow-sm bg-white rounded-xl overflow-hidden relative">
        <CardContent className="p-8 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3">
                Total Received
              </p>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
                  {mainTotal.integer}<span className="text-3xl text-muted-foreground/60">{mainTotal.decimal}</span>
                </span>
              </div>
              <div className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-semibold">
                +10% since last month
              </div>
            </div>

            {/* Breakdown - Right aligned */}
            <div className="text-right space-y-3 mt-1">
              <div className="flex items-center justify-end gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <div className="text-sm">
                  <span className="text-muted-foreground text-xs font-medium mr-2">Pending</span>
                  <span className="font-bold text-foreground">{formatCurrency(pendingAmount)}</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                <div className="text-sm">
                  <span className="text-muted-foreground text-xs font-medium mr-2">In drafts</span>
                  <span className="font-bold text-foreground">{formatCurrency(draftAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RIGHT CARD - Public Note Link */}
      <Card className="border-none shadow-sm bg-[#F5F8FF] rounded-xl overflow-hidden relative">
        <CardContent className="p-8 h-full flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Link2 className="h-4 w-4" />
              </div>
              <p className="text-sm font-bold text-foreground tracking-tight">quickpay.to/publicnote</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-100">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-100">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6 max-w-md">
            Quickpay lets you receive payments on the fly. You can generate invoice or share the payment link to request the payment.
          </p>

          <button className="mt-auto text-xs font-bold text-blue-600 uppercase tracking-wider hover:underline text-left">
            Learn More
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
