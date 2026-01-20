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
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MoreVertical, CheckCircle, Clock, XCircle, AlertCircle, FileText } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { formatDate, formatCurrency } from '@/lib/formatters';

interface PaymentsTableProps {
  payments: Payment[];
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    variant: 'outline' as const,
    className: 'border-green-500/50 bg-green-500/10 text-green-700 hover:bg-green-500/20'
  },
  pending: {
    icon: Clock,
    variant: 'outline' as const,
    className: 'border-blue-500/50 bg-blue-500/10 text-blue-700 hover:bg-blue-500/20'
  },
  processing: { icon: AlertCircle, variant: 'outline' as const, className: 'text-blue-600' },
  failed: { icon: XCircle, variant: 'destructive' as const, className: '' },
};

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const setSelectedPayment = useStore((state) => state.setSelectedPayment);
  const openModal = useStore((state) => state.openModal);

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    openModal();
  };

  if (payments.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="p-8 sm:p-12 text-center">
          <FileText className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-sm font-semibold">No payments yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto px-4">
            Get started by creating a new invoice. Payments will appear here once they are processed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {/* Mobile title kept simple */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground">Recent Transactions</h3>
          </div>
        </div>
        {payments.map((payment) => {
          const { icon: StatusIcon, variant, className } = statusConfig[payment.status];
          return (
            <Card
              key={payment.id}
              className="border shadow-sm cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]"
              onClick={() => handleViewPayment(payment)}
            >
              <CardHeader className="pb-3 px-4 pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold truncate mb-1">
                      {payment.customer}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground truncate">{payment.email}</p>
                  </div>
                  <Badge variant={variant} className={`gap-1 shrink-0 ml-2 ${className}`}>
                    <StatusIcon className="h-3 w-3" />
                    <span className="hidden sm:inline">
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold">{formatCurrency(payment.amount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Invoice</span>
                  <span className="font-mono text-xs">{payment.invoiceNumber}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-muted-foreground">{formatDate(payment.date)}</span>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3"
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
                    size="sm"
                    className="h-9 w-9 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold min-w-45">Customer</TableHead>
                <TableHead className="font-semibold min-w-25">Invoice</TableHead>
                <TableHead className="font-semibold min-w-25">Amount</TableHead>
                <TableHead className="font-semibold min-w-30">Date</TableHead>
                <TableHead className="font-semibold min-w-30">Status</TableHead>
                <TableHead className="text-right font-semibold min-w-25">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => {
                const { icon: StatusIcon, variant, className } = statusConfig[payment.status];
                return (
                  <TableRow
                    key={payment.id}
                    className="hover:bg-muted/80 transition-colors cursor-pointer border-b border-border/40 last:border-b-0"
                    onClick={() => handleViewPayment(payment)}
                  >
                    <TableCell className="min-w-45">
                      <div>
                        <p className="font-medium">{payment.customer}</p>
                        <p className="text-sm text-muted-foreground">{payment.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm min-w-25">
                      {payment.invoiceNumber}
                    </TableCell>
                    <TableCell className="font-semibold min-w-25">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell className="text-muted-foreground min-w-30">
                      {formatDate(payment.date)}
                    </TableCell>
                    <TableCell className="min-w-30">
                      <Badge variant={variant} className={`gap-1.5 ${className}`}>
                        <StatusIcon className="h-3 w-3" />
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right min-w-25">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => handleViewPayment(payment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
