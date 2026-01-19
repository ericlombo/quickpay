'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const invoiceSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email address'),
  clientAddress: z.string().min(1, 'Client address is required'),
  items: z.array(
    z.object({
      description: z.string().min(1, 'Description is required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      price: z.number().min(0, 'Price must be non-negative'),
    })
  ).min(1, 'At least one item is required'),
  taxRate: z.number().min(0).max(100).default(10),
  dueDate: z.string().min(1, 'Due date is required'),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

export function NewInvoiceDrawer() {
  const isDrawerOpen = useStore((state) => state.isDrawerOpen);
  const closeDrawer = useStore((state) => state.closeDrawer);
  const addInvoice = useStore((state) => state.addInvoice);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      items: [{ description: '', quantity: 1, price: 0 }],
      taxRate: 10,
      dueDate: '',
    },
  } as const);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

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
    } catch (error) {
      console.error('Error creating invoice:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isDrawerOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={closeDrawer} />
      <div className="absolute inset-y-0 right-0 flex max-w-full">
        <div className="relative w-screen max-w-md">
          <Card className="h-full flex flex-col rounded-l-xl rounded-r-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create New Invoice</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeDrawer}
                  className="absolute right-4 top-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </div>
            </CardHeader>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto">
              <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Client Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="clientName">Client Name</Label>
                      <Input
                        id="clientName"
                        {...register('clientName')}
                        placeholder="John Doe"
                      />
                      {errors.clientName && (
                        <p className="text-sm text-red-500 mt-1">{errors.clientName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="clientEmail">Email Address</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        {...register('clientEmail')}
                        placeholder="john@example.com"
                      />
                      {errors.clientEmail && (
                        <p className="text-sm text-red-500 mt-1">{errors.clientEmail.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="clientAddress">Address</Label>
                      <Textarea
                        id="clientAddress"
                        {...register('clientAddress')}
                        placeholder="123 Main St, City, State, ZIP"
                        rows={3}
                      />
                      {errors.clientAddress && (
                        <p className="text-sm text-red-500 mt-1">{errors.clientAddress.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Invoice Items</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ description: '', quantity: 1, price: 0 })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <Card key={field.id}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm">Item {index + 1}</CardTitle>
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor={`items.${index}.description`}>Description</Label>
                            <Input
                              id={`items.${index}.description`}
                              {...register(`items.${index}.description`)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor={`items.${index}.quantity`}>Quantity</Label>
                              <Input
                                id={`items.${index}.quantity`}
                                type="number"
                                {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`items.${index}.price`}>Price ($)</Label>
                              <Input
                                id={`items.${index}.price`}
                                type="number"
                                step="0.01"
                                {...register(`items.${index}.price`, { valueAsNumber: true })}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {errors.items && (
                      <p className="text-sm text-red-500">{errors.items.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      {...register('taxRate', { valueAsNumber: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      {...register('dueDate')}
                    />
                    {errors.dueDate && (
                      <p className="text-sm text-red-500 mt-1">{errors.dueDate.message}</p>
                    )}
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tax ({taxRate}%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-medium">Total</span>
                      <span className="text-xl font-bold">${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeDrawer}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Invoice'}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}