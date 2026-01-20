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
  success: { icon: CheckCircle, variant: 'default' as const, color: 'text-green-600' },
  pending: { icon: Clock, variant: 'secondary' as const, color: 'text-amber-600' },
  processing: { icon: AlertCircle, variant: 'outline' as const, color: 'text-blue-600' },
  failed: { icon: XCircle, variant: 'destructive' as const, color: 'text-red-600' },
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold">Recent Payments</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {payments.length} payment{payments.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button variant="outline" size="sm" className="h-9">
            View All
          </Button>
        </div>
        {payments.map((payment) => {
          const { icon: StatusIcon, variant, color } = statusConfig[payment.status];
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
                  <Badge variant={variant} className="gap-1 shrink-0 ml-2">
                    <StatusIcon className={`h-3 w-3 ${color}`} />
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
      <div className="hidden sm:block rounded-lg border border-border bg-card shadow-sm">
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Recent Payments</h3>
              <p className="text-sm text-muted-foreground mt-1">
                A list of your recent payments and transactions
              </p>
            </div>
            <Button variant="outline" size="sm" className="h-9">
              View All
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto -mx-px">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold min-w-[180px]">Customer</TableHead>
                <TableHead className="font-semibold min-w-[100px]">Invoice</TableHead>
                <TableHead className="font-semibold min-w-[100px]">Amount</TableHead>
                <TableHead className="font-semibold min-w-[120px]">Date</TableHead>
                <TableHead className="font-semibold min-w-[120px]">Status</TableHead>
                <TableHead className="text-right font-semibold min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => {
                const { icon: StatusIcon, variant, color } = statusConfig[payment.status];
                return (
                  <TableRow 
                    key={payment.id} 
                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleViewPayment(payment)}
                  >
                    <TableCell className="min-w-[180px]">
                      <div>
                        <p className="font-medium">{payment.customer}</p>
                        <p className="text-sm text-muted-foreground">{payment.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm min-w-[100px]">
                      {payment.invoiceNumber}
                    </TableCell>
                    <TableCell className="font-semibold min-w-[100px]">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell className="text-muted-foreground min-w-[120px]">
                      {formatDate(payment.date)}
                    </TableCell>
                    <TableCell className="min-w-[120px]">
                      <Badge variant={variant} className="gap-1.5">
                        <StatusIcon className={`h-3 w-3 ${color}`} />
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right min-w-[100px]">
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
