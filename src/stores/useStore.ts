import { create } from 'zustand';
import { Payment, Invoice } from '@/types';
import { mockPayments, mockInvoices } from '@/data/mockData';

interface AppStore {
  // State
  payments: Payment[];
  invoices: Invoice[];
  selectedPayment: Payment | null;
  isDrawerOpen: boolean;
  isModalOpen: boolean;
  isMobileMenuOpen: boolean;
  
  // Actions
  setPayments: (payments: Payment[]) => void;
  addPayment: (payment: Payment) => void;
  setSelectedPayment: (payment: Payment | null) => void;
  setInvoices: (invoices: Invoice[]) => void;
  addInvoice: (invoice: Invoice) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openModal: () => void;
  closeModal: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
}

export const useStore = create<AppStore>((set) => ({
  // Initial state
  payments: mockPayments,
  invoices: mockInvoices,
  selectedPayment: null,
  isDrawerOpen: false,
  isModalOpen: false,
  isMobileMenuOpen: false,
  
  // Actions
  setPayments: (payments) => set({ payments }),
  addPayment: (payment) => set((state) => ({ 
    payments: [payment, ...state.payments] 
  })),
  setSelectedPayment: (payment) => set({ selectedPayment: payment }),
  setInvoices: (invoices) => set({ invoices }),
  addInvoice: (invoice) => set((state) => ({ 
    invoices: [invoice, ...state.invoices] 
  })),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedPayment: null }),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));