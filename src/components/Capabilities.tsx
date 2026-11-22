import {
  BrainCircuit,
  Layers,
  Smartphone,
  TrendingUp,
  Share2,
  Clapperboard,
  ArrowUpRight,
} from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

const CAPABILITIES = [
  {
    icon: BrainCircuit,
    title: 'AI Development & Workflow Automation',
    body: 'Custom AI agents, RAG systems, document intelligence, and automation pipelines that remove manual work and compound efficiency across your operations.',
    tags: ['LLM Integration', 'RAG', 'Process Automation'],
    span: 'lg:col-span-3',
    featured: true,
  },
  {
    icon: Layers,
    title: 'Production-Ready SaaS & Web Platforms',
    body: 'Multi-tenant SaaS, customer portals, and enterprise web applications engineered for scale, security, and long-term maintainability.',
    tags: ['SaaS', 'Web Apps'],
    span: 'lg:col-span-3',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    body: 'Native-quality iOS and Android applications with offline-first data, push workflows, and store-ready release pipelines.',
    tags: ['iOS', 'Android'],
    span: 'lg:col-span-2',
  },
  {
    icon: TrendingUp,
    title: 'Digital Transformation & Growth Systems',
    body: 'End-to-end operating systems for growing businesses — quotations, inventory, service records, and reporting on one stack.',
    tags: ['BizOS', 'Ops'],
    span: 'lg:col-span-2',
  },
  {
    icon: Share2,
    title: 'Social Media & Performance Growth',
    body: 'Content engines, analytics-driven calendars, and lead capture funnels that turn attention into a measurable pipeline.',
    tags: ['Content', 'Ads', 'Analytics'],
    span: 'lg:col-span-2',
  },
  {
    icon: Clapperboard,
    title: '2D Video & Creative Production',
    body: 'Story-driven edits, motion graphics, and commercial video production built for creators, brands, and campaigns.',
    tags: ['Motion GFX', 'Editing'],
    span: 'lg:col-span-3',
  },
  {
    icon: ArrowUpRight,
    title: 'Consulting & Technical Direction',
    body: 'Architecture reviews, vendor selection, and roadmaps from engineers who have shipped at production scale.',
    tags: ['Architecture', 'Roadmap'],
    span: 'lg:col-span-3',
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Core Capabilities"
            title="One partner across the full delivery stack"
            description="From AI engineering to creative production — every service line is delivered in-house by accountable, senior-led teams."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line md:grid-cols-2 lg:grid-cols-6">
          {CAPABILITIES.map((cap, i) => (
            <Reveal
              key={cap.title}
              delay={i * 60}
              className={cn('group bg-ink-soft p-8 transition-colors duration-300 hover:bg-ink-raised', cap.span)}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      'inline-flex rounded-xl border p-3 transition-colors',
                      cap.featured
                        ? 'border-accent/40 bg-accent-soft text-accent-hover'
                        : 'border-ink-line bg-white/[0.03] text-slate-muted group-hover:text-accent-hover'
                    )}
                  >
                    <cap.icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-slate-muted/70 group-hover:opacity-100" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-[#F8FAFC]">{cap.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-muted">{cap.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-ink-line px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
