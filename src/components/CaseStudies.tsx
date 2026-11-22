import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

const FILTERS = [
  { id: 'all', label: 'All Work' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'edtech', label: 'EdTech' },
  { id: 'creators', label: 'Creators / Media' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

const CASES: Array<{
  sector: Exclude<FilterId, 'all'>;
  client: string;
  title: string;
  body: string;
  outcomes: string[];
  tags: string[];
}> = [
  {
    sector: 'healthcare',
    client: 'Al Mannat Hospital & Specialist Doctors',
    title: 'Digital presence and patient engagement, rebuilt end to end',
    body: 'We architected the hospital\'s web presence, deployed structured doctor profiles and appointment pathways, and wired automated patient feedback and Google review workflows into daily operations.',
    outcomes: ['Modern web architecture', 'Patient feedback automation', 'Accelerated Google Maps reviews'],
    tags: ['Web Platform', 'HealthFlow', 'Reputation'],
  },
  {
    sector: 'edtech',
    client: 'IIT-JEE & NEET Coaching Institutes',
    title: 'Academic portals and lead systems for competitive exam institutes',
    body: 'Built student and test management portals covering batch scheduling, test workflows, and performance tracking — paired with lead generation systems that keep admissions pipelines full.',
    outcomes: ['Student & test workflows', 'Admissions lead engine', 'Parent-facing performance portals'],
    tags: ['EdTech Portal', 'Lead Gen', 'Automation'],
  },
  {
    sector: 'creators',
    client: 'YouTubers & Digital Creators',
    title: '2D storytelling edits and audience growth support',
    body: 'Long-term creative partnership covering 2D video editing, motion graphics, and narrative-driven edits — plus packaging, publishing cadence, and growth analytics that grow subscriber bases.',
    outcomes: ['2D animated storytelling', 'Motion graphics packages', 'Audience growth analytics'],
    tags: ['2D Editing', 'Motion GFX', 'Growth'],
  },
];

export function CaseStudies() {
  const [filter, setFilter] = useState<FilterId>('all');
  const visible = CASES.filter((c) => filter === 'all' || c.sector === filter);

  return (
    <section id="case-studies" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Case Studies"
            title="Proof across healthcare, education, and media"
            description="Every engagement ships measurable outcomes. Filter by sector to see how we deliver."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter case studies">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-lg border px-5 py-2.5 text-sm font-medium transition-all duration-300',
                  filter === f.id
                    ? 'border-accent bg-accent text-white shadow-lg shadow-accent/25'
                    : 'border-ink-line bg-white/[0.03] text-slate-muted hover:border-accent/40 hover:text-[#F8FAFC]'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {visible.map((c) => (
            <Reveal key={c.client}>
              <article className="flex h-full flex-col rounded-2xl border border-ink-line bg-ink-soft p-8 transition-colors duration-300 hover:border-accent/40">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">
                  {FILTERS.find((f) => f.id === c.sector)?.label}
                </p>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-[#F8FAFC]">{c.client}</h3>
                <p className="mt-2 text-sm font-medium text-accent-hover">{c.title}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-muted">{c.body}</p>
                <ul className="mt-6 space-y-2.5 border-t border-ink-line pt-6">
                  {c.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2.5 text-sm text-slate-muted">
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-signal" />
                      {o}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-ink-line px-2.5 py-1 text-[11px] font-medium text-slate-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
