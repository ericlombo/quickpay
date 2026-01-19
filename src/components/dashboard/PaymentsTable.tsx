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
import { Eye, MoreVertical, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { useStore } from '@/stores/useStore';

interface PaymentsTableProps {
  payments: Payment[];
}

const statusConfig = {
  success: { icon: CheckCircle, variant: 'default' as const },
  pending: { icon: Clock, variant: 'secondary' as const },
  processing: { icon: AlertCircle, variant: 'outline' as const },
  failed: { icon: XCircle, variant: 'destructive' as const },
};

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const setSelectedPayment = useStore((state) => state.setSelectedPayment);
  const openModal = useStore((state) => state.openModal);

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    openModal();
  };

  return (
    <div className="rounded-md border">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Recent Payments</h3>
            <p className="text-sm text-muted-foreground">A list of your recent payments</p>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => {
            const { icon: StatusIcon, variant } = statusConfig[payment.status];
            return (
              <TableRow key={payment.id} className="hover:bg-muted/50">
                <TableCell>
                  <div>
                    <p className="font-medium">{payment.customer}</p>
                    <p className="text-sm text-muted-foreground">{payment.email}</p>
                  </div>
                </TableCell>
                <TableCell>{payment.invoiceNumber}</TableCell>
                <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Badge variant={variant} className="gap-1">
                    <StatusIcon className="h-3 w-3" />
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewPayment(payment)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
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
  );
}