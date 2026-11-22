import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const HIGHLIGHTS = [
  'Production-Ready Architecture',
  'Multi-Sector Delivery',
  'Remote-First Execution',
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-32">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-slate-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-signal" />
            </span>
            Remote-first engineering &amp; growth partner — India to global markets
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 max-w-4xl font-display text-[1.9rem] font-semibold leading-[1.18] tracking-tight text-[#F8FAFC] sm:mt-8 sm:text-5xl sm:leading-[1.1] lg:text-[4rem]">
            Enterprise AI engineering, production-ready SaaS, and{' '}
            <span className="bg-gradient-to-r from-accent-hover to-signal bg-clip-text text-transparent">
              measurable business growth
            </span>{' '}
            — delivered by one accountable team.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-muted sm:mt-7 sm:text-xl">
            RiSeva Tech builds digital transformation for hospitals, institutes, and creators:
            custom platforms, workflow automation, mobile apps, growth systems, and creative video
            production. Distributed delivery that is faster, leaner, and built to ship.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 text-base font-semibold text-white shadow-xl shadow-accent/30 transition-all hover:bg-accent-hover hover:shadow-accent/50 sm:w-auto"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#case-studies"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink-line bg-white/[0.03] px-7 py-4 text-base font-semibold text-[#F8FAFC] transition-all hover:border-accent/50 hover:bg-accent-soft sm:w-auto"
            >
              View Case Studies
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:mt-16 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h} className="flex items-center gap-3 bg-ink-soft px-5 py-4 sm:px-6 sm:py-5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-signal" />
                <dt className="text-sm font-medium text-[#F8FAFC]">{h}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
