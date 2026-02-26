import Hero from '@/components/home/Hero';
import AboutStrip from '@/components/home/AboutStrip';
import RealWorldPresence from '@/components/home/RealWorldPresence';
import AsSeenIn from '@/components/home/AsSeenIn';
import LatestInsights from '@/components/home/LatestInsights';
import Gallery from '@/components/home/Gallery';
import PressContact from '@/components/home/PressContact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutStrip />
      <RealWorldPresence />
      <AsSeenIn />
      <LatestInsights />
      <Gallery />
      <PressContact />
    </main>
  );
}
