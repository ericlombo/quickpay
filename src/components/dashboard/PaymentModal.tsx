'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/stores/useStore';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/formatters';

// Custom colors to match requirements: Success = Green, Pending = Blue
const statusConfig = {
  success: {
    icon: CheckCircle,
    variant: 'outline' as const,
    label: 'Success',
    className: 'border-green-500/50 bg-green-500/10 text-green-700 hover:bg-green-500/20'
  },
  pending: {
    icon: Clock,
    variant: 'outline' as const,
    label: 'Pending',
    className: 'border-blue-500/50 bg-blue-500/10 text-blue-700 hover:bg-blue-500/20'
  },
  processing: { icon: AlertCircle, variant: 'outline' as const, label: 'Processing', className: '' },
  failed: { icon: XCircle, variant: 'destructive' as const, label: 'Failed', className: '' },
};

export function PaymentModal() {
  const selectedPayment = useStore((state) => state.selectedPayment);
  const closeModal = useStore((state) => state.closeModal);
  const isModalOpen = useStore((state) => state.isModalOpen);

  if (!selectedPayment) return null;

  const { icon: StatusIcon, variant, label, className } = statusConfig[selectedPayment.status];

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg sm:text-xl">Payment Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{selectedPayment.customer}</p>
                <p className="text-sm text-muted-foreground">{selectedPayment.email}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Invoice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{selectedPayment.invoiceNumber}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Amount
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatCurrency(selectedPayment.amount)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={variant} className={`gap-1 ${className}`}>
                  <StatusIcon className="h-3 w-3" />
                  {label}
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Date</h4>
              <p className="text-sm sm:text-base font-medium">{formatDate(selectedPayment.date)}</p>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">Payment Method</h4>
              <p className="text-sm sm:text-base font-medium capitalize">{selectedPayment.paymentMethod}</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 pt-2 border-t border-border">
            <h4 className="text-xs sm:text-sm font-medium text-muted-foreground">Actions</h4>
            <div className="grid grid-cols-1 sm:flex sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" className="flex-1 h-10 sm:h-9 text-sm">Download Invoice</Button>
              <Button variant="outline" className="flex-1 h-10 sm:h-9 text-sm">Resend Receipt</Button>
              <Button className="flex-1 h-10 sm:h-9 text-sm">Refund Payment</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}