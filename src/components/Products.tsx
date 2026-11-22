import { HeartPulse, Briefcase, Megaphone } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';

const PRODUCTS = [
  {
    icon: HeartPulse,
    name: 'RiSeva HealthFlow',
    tagline: 'Patient feedback & reputation engine',
    body: 'Automated post-visit patient feedback, sentiment triage, and Google Maps review acceleration — helping hospitals and clinics build trusted public reputations on autopilot.',
    points: ['Automated feedback surveys', 'Google review acceleration', 'Reputation analytics dashboard'],
  },
  {
    icon: Briefcase,
    name: 'RiSeva BizOS',
    tagline: 'B2B operations, unified',
    body: 'A complete operations suite for small and mid-sized businesses: quotations, inventory workflows, service records, and customer history in a single, fast system of record.',
    points: ['Quotation builder', 'Inventory workflows', 'Service & AMC records'],
  },
  {
    icon: Megaphone,
    name: 'RiSeva Growth & Media Suite',
    tagline: 'Content pipelines that compound',
    body: 'Production-grade content pipelines, cross-channel analytics, and automated lead capture tools that convert social reach into a qualified, measurable pipeline.',
    points: ['Content pipeline engine', 'Cross-channel analytics', 'Automated lead capture'],
  },
];

export function Products() {
  return (
    <section id="products" className="relative bg-[#F8FAFC] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            dark={false}
            eyebrow="Proprietary Products"
            title="In-house products, battle-tested in production"
            description="Beyond client work, RiSeva Tech builds and operates its own product lines — so the systems we deploy for you are the systems we run ourselves."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
                <span className="inline-flex w-fit rounded-xl bg-accent-soft p-3 text-accent">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-slate-deep">{p.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{p.tagline}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{p.body}</p>
                <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-6">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm font-medium text-slate-deep">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
