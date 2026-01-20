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

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {/* LEFT CARD - Total Received */}
      <Card className="border border-border/50 bg-card/98 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            {/* Left content */}
            <div className="flex-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Total Received
              </p>
              <div className="mb-4">
                <p className="text-4xl font-bold text-foreground">
                  {formatCurrency(totals.totalReceived)}
                </p>
                <p className="text-sm text-green-600 font-medium mt-2">
                  +10% since last month
                </p>
              </div>

              {/* Mini status rows */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-muted-foreground">Pending</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {formatCurrency(totals.pendingAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                    <span className="text-muted-foreground">In drafts</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {formatCurrency(totals.draftAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RIGHT CARD - Public Note Link */}
      <Card className="border border-border/50 bg-card/98 shadow-sm hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            {/* Title with icon */}
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm font-semibold text-foreground">quickpay.to/publicnote</p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-150"
                title="Edit"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-150"
                title="Copy"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Share a unique payment link with your clients. They can view invoices and pay directly without an account.
          </p>

          {/* Learn more link */}
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150 flex items-center gap-1">
            Learn More →
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
