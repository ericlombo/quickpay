import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuickPay - Invoicing Dashboard',
  description: 'Modern invoicing and payment management dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-muted/30">
          <Sidebar />
          <main className="min-h-screen overflow-y-auto md:pl-64">
            {children}
          </main>
        </div>

        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            className: 'sm:top-4 top-2',
            style: { maxWidth: '95vw' },
          }}
        />
      </body>
    </html>
  );
}
