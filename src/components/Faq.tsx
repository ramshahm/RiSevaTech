import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

export const FAQS = [
  {
    q: 'How does remote-first delivery work in practice?',
    a: 'Every engagement runs on a structured rhythm: a weekly demo call, a shared milestone board, and a dedicated point of contact on WhatsApp and email. Clients across India and global markets get working software every week — no physical office required, and delivery is typically faster and more cost-efficient than on-site alternatives.',
  },
  {
    q: 'Can RiSeva Tech handle both engineering and marketing together?',
    a: 'Yes — that is our core advantage. The same team that builds your platform or app also runs the growth systems around it: social media pipelines, lead capture automation, and creative video production. One accountable partner instead of three disconnected vendors.',
  },
  {
    q: 'What does a typical project cost and timeline look like?',
    a: 'Scoped engagements start after a free strategy call. Websites and automation workflows typically run 2–6 weeks; SaaS platforms and mobile apps run 8–16 weeks depending on complexity. You receive a fixed, milestone-based quote before any work begins.',
  },
  {
    q: 'Do you work with hospitals, institutes, and creators specifically?',
    a: 'We have dedicated delivery experience in healthcare (hospital web platforms, patient feedback, reputation systems), EdTech (coaching institute portals, test and student workflows), and creator media (2D editing, motion graphics, audience growth). Our proprietary products — HealthFlow and BizOS — came directly out of this work.',
  },
  {
    q: 'Who owns the code and data after launch?',
    a: 'You do. Every project ships with full source code, infrastructure access, and handover documentation. There is no vendor lock-in — if you later want to take maintenance in-house, everything is yours to run.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Answers before you book the call"
            description="The questions prospective clients ask most, answered directly."
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  className={cn(
                    'overflow-hidden rounded-xl border transition-colors duration-300',
                    isOpen ? 'border-accent/40 bg-ink-raised' : 'border-ink-line bg-ink-soft'
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm font-semibold text-[#F8FAFC] sm:text-base">{item.q}</span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-slate-muted transition-transform duration-300',
                        isOpen && 'rotate-180 text-accent-hover'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-slate-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
