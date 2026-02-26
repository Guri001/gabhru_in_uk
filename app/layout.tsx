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
  title: 'Gabhru in UK | Public Figure & Media Personality',
  description: 'Official portfolio of Gabhru in UK – News & Media covering UK Immigration & Lifestyle.',
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
