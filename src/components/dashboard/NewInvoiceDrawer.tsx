'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useStore } from '@/stores/useStore';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Invoice } from '@/types';
import { formatCurrency } from '@/lib/formatters';
import { toast } from 'sonner';

const invoiceSchema = z.object({
  clientName: z.string().min(1, 'Client name is required').max(100),
  clientEmail: z.string().email('Invalid email address').toLowerCase(),
  clientAddress: z.string().min(1, 'Client address is required').max(200),
  items: z.array(
    z.object({
      description: z.string().min(1, 'Description is required'),
      quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
      price: z.number().min(0, 'Price must be non-negative'),
    })
  ).min(1, 'At least one item is required'),
  taxRate: z.number().min(0).max(100),
  dueDate: z.string().min(1, 'Due date is required'),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

export function NewInvoiceDrawer() {
  const isDrawerOpen = useStore((state) => state.isDrawerOpen);
  const closeDrawer = useStore((state) => state.closeDrawer);
  const addInvoice = useStore((state) => state.addInvoice);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      items: [{ description: '', quantity: 1, price: 0 }],
      taxRate: 10,
      dueDate: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // Reset form when drawer closes
  useEffect(() => {
    if (!isDrawerOpen) {
      reset();
    }
  }, [isDrawerOpen, reset]);

  const items = watch('items');
  const taxRate = watch('taxRate') ?? 10;
  
  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  const onSubmit = async (data: InvoiceFormData) => {
    setIsSubmitting(true);
    try {
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientAddress: data.clientAddress,
        items: data.items.map((item, index) => ({
          id: (index + 1).toString(),
          ...item,
        })),
        subtotal,
        tax,
        total,
        dueDate: data.dueDate,
        status: 'draft',
        createdAt: new Date().toISOString().split('T')[0],
      };

      addInvoice(newInvoice);
      reset();
      closeDrawer();
      toast.success('Invoice created successfully', {
        description: `Invoice ${newInvoice.invoiceNumber} has been created.`,
      });
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice', {
        description: 'Please try again or contact support if the issue persists.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDrawer();
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleOpenChange}>
      <DrawerContent 
        side="right" 
        className="h-full w-full sm:max-w-md rounded-l-xl rounded-r-none sm:rounded-r-none"
      >
        <DrawerHeader className="border-b px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <DrawerTitle className="text-lg sm:text-xl font-semibold">Create New Invoice</DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeDrawer}
              className="h-10 w-10 shrink-0"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DrawerHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Client Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName" className="text-sm">Client Name</Label>
                    <Input
                      id="clientName"
                      {...register('clientName')}
                      placeholder="Eric Mwakio"
                      className={`h-10 sm:h-9 text-base sm:text-sm ${errors.clientName ? 'border-destructive' : ''}`}
                    />
                    {errors.clientName && (
                      <p className="text-xs text-destructive">{errors.clientName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail" className="text-sm">Email Address</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      {...register('clientEmail')}
                      placeholder="eric123@example.com"
                      className={`h-10 sm:h-9 text-base sm:text-sm ${errors.clientEmail ? 'border-destructive' : ''}`}
                    />
                    {errors.clientEmail && (
                      <p className="text-xs text-destructive">{errors.clientEmail.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientAddress" className="text-sm">Address</Label>
                    <Textarea
                      id="clientAddress"
                      {...register('clientAddress')}
                      placeholder="123 Main St, City, State, ZIP"
                      rows={3}
                      className={`min-h-[44px] text-base sm:text-sm ${errors.clientAddress ? 'border-destructive' : ''}`}
                    />
                    {errors.clientAddress && (
                      <p className="text-xs text-destructive">{errors.clientAddress.message}</p>
                    )}
                  </div>
                </div>
              </div>

                  <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">Invoice Items</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ description: '', quantity: 1, price: 0 })}
                    className="h-10 sm:h-9 text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {fields.map((field, index) => {
                    const itemErrors = errors.items?.[index];
                    return (
                      <Card key={field.id} className="border">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium">Item {index + 1}</CardTitle>
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                className="h-10 w-10 sm:h-9 sm:w-9"
                                aria-label={`Remove item ${index + 1}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-0">
                          <div className="space-y-2">
                            <Label htmlFor={`items.${index}.description`}>Description</Label>
                            <Input
                              id={`items.${index}.description`}
                              {...register(`items.${index}.description`)}
                              className={itemErrors?.description ? 'border-destructive' : ''}
                            />
                            {itemErrors?.description && (
                              <p className="text-xs text-destructive">
                                {itemErrors.description.message}
                              </p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor={`items.${index}.quantity`}>Quantity</Label>
                              <Input
                                id={`items.${index}.quantity`}
                                type="number"
                                step="0.01"
                                {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                                className={itemErrors?.quantity ? 'border-destructive' : ''}
                              />
                              {itemErrors?.quantity && (
                                <p className="text-xs text-destructive">
                                  {itemErrors.quantity.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`items.${index}.price`}>Price ($)</Label>
                              <Input
                                id={`items.${index}.price`}
                                type="number"
                                step="0.01"
                                {...register(`items.${index}.price`, { valueAsNumber: true })}
                                className={itemErrors?.price ? 'border-destructive' : ''}
                              />
                              {itemErrors?.price && (
                                <p className="text-xs text-destructive">
                                  {itemErrors.price.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  {errors.items?.root && (
                    <p className="text-xs text-destructive">{errors.items.root.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.1"
                    {...register('taxRate', { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    {...register('dueDate')}
                    className={errors.dueDate ? 'border-destructive' : ''}
                  />
                  {errors.dueDate && (
                    <p className="text-xs text-destructive">{errors.dueDate.message}</p>
                  )}
                </div>
              </div>

              <Card className="bg-muted/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax ({taxRate}%)</span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold">{formatCurrency(total)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DrawerFooter className="border-t px-4 sm:px-6 py-4 gap-3">
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={closeDrawer}
                disabled={isSubmitting}
                className="h-11 sm:h-10 w-full sm:w-auto text-sm"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="h-11 sm:h-10 w-full sm:w-auto text-sm"
              >
                {isSubmitting ? 'Creating...' : 'Create Invoice'}
              </Button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
