import type { Metadata } from 'next';
import { Inter, Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'], 
  variable: '--font-poppins' 
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Gabhru in UK - Build Your Career in the UK',
  description: 'Helping young Indian students build successful careers in the UK.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background`}>
        {children}
      </body>
    </html>
  );
}
