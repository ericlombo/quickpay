'use client';

import { Payment } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MoreVertical, FileText } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { formatDate, formatCurrency } from '@/lib/formatters';
import { StatusIndicator } from './StatusIndicator';

interface PaymentsTableProps {
  payments: Payment[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const setSelectedPayment = useStore((state) => state.setSelectedPayment);
  const openModal = useStore((state) => state.openModal);
  const openDrawer = useStore((state) => state.openDrawer);

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    openModal();
  };

  if (payments.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-base font-semibold text-foreground">No invoices yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto mb-6">
            Get started by creating your first invoice.
          </p>
          <Button onClick={openDrawer} className="gap-2">
            + Create Invoice
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {/* Mobile title kept simple */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Transactions</h3>
          </div>
        </div>
        {payments.map((payment) => (
          <Card
            key={payment.id}
            className="border border-border/60 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
            onClick={() => handleViewPayment(payment)}
          >
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm font-semibold truncate mb-1">
                    {payment.customer}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground truncate">{payment.email}</p>
                </div>
                <div className="shrink-0">
                  <StatusIndicator status={payment.status} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold">{formatCurrency(payment.amount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Invoice</span>
                <span className="font-mono text-xs text-muted-foreground">{payment.invoiceNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="text-muted-foreground text-xs">{formatDate(payment.date)}</span>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-3 text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewPayment(payment);
                  }}
                >
                  <Eye className="h-4 w-4 mr-1.5" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="rounded-lg border border-border/50 bg-card/98 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/60">
                <TableHead className="font-semibold text-foreground min-w-45 py-4">Customer</TableHead>
                <TableHead className="font-semibold text-foreground min-w-25 py-4">Invoice</TableHead>
                <TableHead className="font-semibold text-foreground min-w-25 py-4">Amount</TableHead>
                <TableHead className="font-semibold text-foreground min-w-30 py-4">Date</TableHead>
                <TableHead className="font-semibold text-foreground min-w-30 py-4">Status</TableHead>
                <TableHead className="text-right font-semibold text-foreground min-w-25 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="hover:bg-muted/40 transition-colors cursor-pointer border-b border-border/60 last:border-b-0 py-4"
                  onClick={() => handleViewPayment(payment)}
                >
                  <TableCell className="min-w-45 py-4">
                    <div>
                      <p className="font-medium text-sm">{payment.customer}</p>
                      <p className="text-xs text-muted-foreground">{payment.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm min-w-25 py-4 text-muted-foreground">
                    {payment.invoiceNumber}
                  </TableCell>
                  <TableCell className="font-semibold min-w-25 py-4">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm min-w-30 py-4">
                    {formatDate(payment.date)}
                  </TableCell>
                  <TableCell className="min-w-30 py-4">
                    <StatusIndicator status={payment.status} />
                  </TableCell>
                  <TableCell className="text-right min-w-25 py-4">
                    <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm"
                        onClick={() => handleViewPayment(payment)}
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm"
                        title="More actions"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
