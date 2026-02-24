import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/global/SmoothScroll';
import CustomCursor from '@/components/global/CustomCursor';

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
      <body className="bg-[#0A1128] text-[#FAFAFA] font-sans antialiased overflow-x-hidden selection:bg-[#0066FF] selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
