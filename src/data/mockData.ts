import { Payment, Invoice } from '@/types';

export const mockPayments: Payment[] = [
  {
    id: '1',
    customer: 'eric mwakio',
    email: 'eric123@example.com',
    amount: 299.99,
    status: 'success',
    date: '2024-03-15',
    invoiceNumber: 'INV-001',
    paymentMethod: 'paystack',
  },
  {
    id: '2',
    customer: 'Jane walubengo',
    email: 'jane@example.com',
    amount: 499.50,
    status: 'pending',
    date: '2024-03-14',
    invoiceNumber: 'INV-002',
    paymentMethod: 'PayPal',
  },
  {
    id: '3',
    customer: 'Bob karanja',
    email: 'bob@example.com',
    amount: 199.99,
    status: 'processing',
    date: '2024-03-13',
    invoiceNumber: 'INV-003',
    paymentMethod: 'paystack',
  },
  {
    id: '4',
    customer: 'Alice wahome',
    email: 'alice@example.com',
    amount: 799.00,
    status: 'failed',
    date: '2024-03-12',
    invoiceNumber: 'INV-004',
    paymentMethod: 'paystack',
  },
  {
    id: '5',
    customer: 'Dallie Maggie',
    email: 'dallie@example.com',
    amount: 349.99,
    status: 'success',
    date: '2024-03-11',
    invoiceNumber: 'INV-005',
    paymentMethod: 'paystack',
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    clientName: 'Eric mwakio',
    clientEmail: 'eric123@example.com',
    clientAddress: '123 umoja, Embakasi, Nairobi',
    items: [
      { id: '1', description: 'Website Design', quantity: 1, price: 299.99 },
    ],
    subtotal: 299.99,
    tax: 23.99,
    total: 323.98,
    dueDate: '2024-04-15',
    status: 'paid',
    createdAt: '2024-03-15',
  },
];