'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { useStore } from '@/stores/useStore';
import { CheckCircle, Download, Send, Printer } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function InvoicePreviewModal() {
    const isInvoicePreviewOpen = useStore((state) => state.isInvoicePreviewOpen);
    const previewInvoice = useStore((state) => state.previewInvoice);
    const closeInvoicePreview = useStore((state) => state.closeInvoicePreview);

    if (!previewInvoice) return null;

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeInvoicePreview();
        }
    };

    return (
        <Dialog open={isInvoicePreviewOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl">Invoice Preview</DialogTitle>
                        <Badge variant="outline" className="text-sm px-3 py-1 bg-green-50 text-green-700 border-green-200 gap-1.5 hidden sm:flex">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Invoice Generated
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="py-6 space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between gap-6">
                        <div className="space-y-1.5">
                            <h2 className="text-2xl font-bold tracking-tight text-primary">INVOICE</h2>
                            <p className="text-muted-foreground font-medium">#{previewInvoice.invoiceNumber}</p>
                        </div>
                        <div className="text-right space-y-1">
                            <h3 className="font-semibold text-lg">QuickPay Inc.</h3>
                            <p className="text-sm text-muted-foreground">123 Business Avenue</p>
                            <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Bill To</h4>
                            <div className="space-y-1">
                                <p className="font-medium text-lg">{previewInvoice.clientName}</p>
                                <p className="text-sm text-muted-foreground">{previewInvoice.clientEmail}</p>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{previewInvoice.clientAddress}</p>
                            </div>
                        </div>
                        <div className="space-y-2 sm:text-right">
                            <div className="flex justify-between sm:justify-end gap-4">
                                <span className="text-muted-foreground">Date Issued:</span>
                                <span className="font-medium">{formatDate(previewInvoice.createdAt)}</span>
                            </div>
                            <div className="flex justify-between sm:justify-end gap-4">
                                <span className="text-muted-foreground">Due Date:</span>
                                <span className="font-medium">{formatDate(previewInvoice.dueDate)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 gap-4 bg-muted/50 p-3 text-sm font-medium text-muted-foreground border-b">
                            <div className="col-span-6">Description</div>
                            <div className="col-span-2 text-right">Qty</div>
                            <div className="col-span-2 text-right">Price</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>
                        <div className="divide-y">
                            {previewInvoice.items.map((item) => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 p-3 text-sm items-center">
                                    <div className="col-span-6 font-medium">{item.description}</div>
                                    <div className="col-span-2 text-right text-muted-foreground">{item.quantity}</div>
                                    <div className="col-span-2 text-right text-muted-foreground">{formatCurrency(item.price)}</div>
                                    <div className="col-span-2 text-right font-medium">{formatCurrency(item.quantity * item.price)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="flex flex-col sm:items-end space-y-3">
                        <div className="w-full sm:w-64 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">{formatCurrency(previewInvoice.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tax</span>
                                <span className="font-medium">{formatCurrency(previewInvoice.tax)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center pt-1">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-xl text-primary">{formatCurrency(previewInvoice.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2 border-t pt-4 sm:pt-0 sm:border-t-0">
                    <Button variant="outline" className="w-full sm:w-auto gap-2">
                        <Printer className="h-4 w-4" />
                        Print
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                    <Button className="w-full sm:w-auto gap-2" onClick={closeInvoicePreview}>
                        <Send className="h-4 w-4" />
                        Send Invoice
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
