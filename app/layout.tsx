import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import CustomCursor from '@/components/global/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SmoothScroll = dynamic(() => import('@/components/providers/SmoothScrollProvider'), { ssr: false });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
});

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased overflow-x-hidden">
        <SmoothScroll>
          <div className="bg-noise" />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
