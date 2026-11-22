import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Capabilities } from '@/components/Capabilities';
import { Products } from '@/components/Products';
import { CaseStudies } from '@/components/CaseStudies';
import { Process } from '@/components/Process';
import { ScopeBuilder } from '@/components/ScopeBuilder';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { AiAssistant } from '@/components/AiAssistant';
import { WhatsappFloat } from '@/components/WhatsappFloat';
import { FAQS } from '@/components/Faq';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink pb-20 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Capabilities />
        <Products />
        <CaseStudies />
        <Process />
        <ScopeBuilder />
        <Faq />
      </main>
      <Footer />
      <AiAssistant />
      <WhatsappFloat />
    </div>
  );
}
