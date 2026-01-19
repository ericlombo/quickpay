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

const statusConfig = {
  success: { icon: CheckCircle, variant: 'default' as const, label: 'Success' },
  pending: { icon: Clock, variant: 'secondary' as const, label: 'Pending' },
  processing: { icon: AlertCircle, variant: 'outline' as const, label: 'Processing' },
  failed: { icon: XCircle, variant: 'destructive' as const, label: 'Failed' },
};

export function PaymentModal() {
  const selectedPayment = useStore((state) => state.selectedPayment);
  const closeModal = useStore((state) => state.closeModal);
  const isModalOpen = useStore((state) => state.isModalOpen);

  if (!selectedPayment) return null;

  const { icon: StatusIcon, variant, label } = statusConfig[selectedPayment.status];

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
                <p className="text-2xl font-bold">${selectedPayment.amount.toFixed(2)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={variant} className="gap-1">
                  <StatusIcon className="h-3 w-3" />
                  {label}
                </Badge>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Date</h4>
              <p className="font-medium">{selectedPayment.date}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Payment Method</h4>
              <p className="font-medium">{selectedPayment.paymentMethod}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Actions</h4>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1">Download Invoice</Button>
              <Button variant="outline" className="flex-1">Resend Receipt</Button>
              <Button className="flex-1">Refund Payment</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}