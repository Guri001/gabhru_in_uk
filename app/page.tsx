import Hero from '@/components/home/Hero';
import CredentialBar from '@/components/home/CredentialBar';
import AboutSection from '@/components/home/AboutSection';
import PublicEngagement from '@/components/home/PublicEngagement';
import MediaCollaborations from '@/components/home/MediaCollaborations';
import ArticlePreview from '@/components/home/ArticlePreview';
import GalleryMasonry from '@/components/home/GalleryMasonry';
import ContactStrip from '@/components/home/ContactStrip';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CredentialBar />
      <AboutSection />
      <PublicEngagement />
      <MediaCollaborations />
      <ArticlePreview />
      <GalleryMasonry />
      <ContactStrip />
    </main>
  );
}
