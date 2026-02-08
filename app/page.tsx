import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import WhyUs from '@/components/sections/WhyUs';
import SuccessStories from '@/components/sections/SuccessStories';
import Process from '@/components/sections/Process';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-foreground">
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <SuccessStories />
      <Process />
      <ContactForm />
      <Footer />
    </main>
  );
}
