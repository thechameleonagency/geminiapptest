import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import OfflineIndicator from '@/components/shared/OfflineIndicator';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digi Swasthya - Healthcare Supply Chain Platform',
  description: 'Connecting Stockists and Pharmacies for seamless medicine distribution. Order medicines, manage inventory, and handle billing with ease.',
  keywords: ['pharmacy', 'stockist', 'medicine', 'supply chain', 'b2b', 'healthcare', 'pharmaceutical', 'medicine distribution'],
  authors: [{ name: 'Digi Swasthya' }],
  creator: 'Digi Swasthya',
  publisher: 'Digi Swasthya',
  applicationName: 'Digi Swasthya',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Digi Swasthya',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Digi Swasthya',
    title: 'Digi Swasthya - Healthcare Supply Chain Platform',
    description: 'Connecting Stockists and Pharmacies for seamless medicine distribution.',
  },
  twitter: {
    card: 'summary',
    title: 'Digi Swasthya - Healthcare Supply Chain Platform',
    description: 'Connecting Stockists and Pharmacies for seamless medicine distribution.',
  },
};

export const viewport: Viewport = {
  themeColor: '#118AB2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#118AB2" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Digi Swasthya" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <OfflineIndicator />
          {children}
          <Toaster />
          <Script id="register-sw" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker
                    .register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `}
          </Script>
        </ErrorBoundary>
      </body>
    </html>
  );
}
