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
      <div className="bg-transparent">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-gray-100">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-0 py-4 w-[10%]">No.</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4 w-[15%]">Date</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider py-4 w-[25%]">Client</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right py-4 w-[15%]">Amount</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right py-4 w-[15%]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleViewPayment(payment)}
                >
                  <TableCell className="py-5 font-bold text-sm text-foreground pl-0">
                    {payment.invoiceNumber}
                  </TableCell>
                  <TableCell className="py-5 text-sm text-muted-foreground">
                    {formatDate(payment.date)}
                  </TableCell>
                  <TableCell className="py-5">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{payment.customer}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 text-right font-bold text-sm text-foreground">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell className="py-5 text-right">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium min-w-[80px]
                        ${payment.status === 'success' ? 'bg-green-100 text-green-700' :
                          payment.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'}`}
                    >
                      {payment.status === 'success' ? 'Paid' :
                        payment.status === 'pending' ? 'Pending' : 'Draft'}
                    </span>
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
