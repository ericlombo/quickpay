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
        {/* Main Canvas Wrapper - Centered on Light Background */}
<div className="min-h-screen bg-muted/30">
  <div className="flex min-h-screen w-full">
            <Sidebar />
                <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            className: 'sm:top-4 top-2',
            style: {
              maxWidth: '95vw',
            },
          }}
        />
      </body>
    </html>
  );
}