import type { Metadata } from 'next';
import { Instrument_Sans, Urbanist, Playfair_Display } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import CustomCursor from '@/components/global/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SmoothScroll = dynamic(() => import('@/components/providers/SmoothScrollProvider'), { ssr: false });

const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument' });
const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://gabhruinuk.com'), // Replace with actual domain when live
  title: 'Gabhru in UK | Public Figure & Media Personality',
  description: 'Official portfolio of Gabhru in UK – News & Media covering UK Immigration, Settlement & Lifestyle.',
  keywords: ['Gabhru in UK', 'UK Immigration', 'UK Lifestyle', 'Public Figure', 'UK Settlement', 'Media Personality', 'South Asian UK'],
  authors: [{ name: 'Gabhru in UK' }],
  creator: 'Gabhru in UK',
  openGraph: {
    title: 'Gabhru in UK',
    description: 'Trusted voice, community leader, and media personality covering UK immigration and lifestyle.',
    url: 'https://gabhruinuk.com',
    siteName: 'Gabhru in UK',
    images: [
      {
        url: '/images/main.jpg',
        width: 1200,
        height: 630,
        alt: 'Gabhru in UK - Public Figure',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabhru in UK | Public Figure & Media Personality',
    description: 'Trusted voice, community leader, and media personality covering UK immigration and lifestyle.',
    creator: '@gabhruinuk', // Adjust if actual handle differs
    images: ['/images/main.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${urbanist.variable} ${playfair.variable}`}>
      <body className="bg-cream text-walnut font-sans antialiased overflow-x-hidden selection:bg-saffron selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
