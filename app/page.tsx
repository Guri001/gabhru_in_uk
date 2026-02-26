import Hero from '@/components/home/Hero';
import VibeStrip from '@/components/home/VibeStrip';
import HisStory from '@/components/home/HisStory';
import ImpactNumbers from '@/components/home/ImpactNumbers';
import OutInTheWorld from '@/components/home/OutInTheWorld';
import MediaAppearances from '@/components/home/MediaAppearances';
import LatestInsights from '@/components/home/LatestInsights';
import HorizontalGallery from '@/components/home/HorizontalGallery';
import ConnectSection from '@/components/home/ConnectSection';

export default function Home() {
  return (
    <main className="min-h-[100svh] w-full overflow-hidden bg-cream">
      <Hero />
      <VibeStrip />
      <HisStory />
      <ImpactNumbers />
      <OutInTheWorld />
      <MediaAppearances />
      <LatestInsights />
      <HorizontalGallery />
      <ConnectSection />
    </main>
  );
}
