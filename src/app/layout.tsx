import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import '../index.css';
import { AppProvider } from '@/contexts/AppContext';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'LinkedIn Clone',
    description: 'Professional networking app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
            <body className={inter.className}>
                <AppProvider>
                    <div className="min-h-screen bg-pink-50">
                        <Navbar />
                        {children}
                        <Toaster position="top-right" />
                    </div>
                </AppProvider>
            </body>
        </html>
    );
}
