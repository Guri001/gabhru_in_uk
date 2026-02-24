import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import PublicEngagement from '@/components/home/PublicEngagement';
import MediaCollaborations from '@/components/home/MediaCollaborations';
import ArticlePreview from '@/components/home/ArticlePreview';
import ImpactStats from '@/components/home/ImpactStats';
import GalleryMasonry from '@/components/home/GalleryMasonry';
import ContactStrip from '@/components/home/ContactStrip';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gabhru in UK",
    "url": "https://gabhruinuk.com",
    "jobTitle": "Public Figure & Media Personality",
    "sameAs": [
      "https://instagram.com/gabhruinuk",
      "https://youtube.com/gabhruinuk",
      "https://twitter.com/gabhruinuk",
      "https://linkedin.com/in/gabhruinuk"
    ]
  };

  return (
    <main className="min-h-screen bg-[#0A1128] text-[#FAFAFA] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <AboutSection />
      <PublicEngagement />
      <MediaCollaborations />
      <ArticlePreview />
      <ImpactStats />
      <GalleryMasonry />
      <ContactStrip />
    </main>
  );
}
