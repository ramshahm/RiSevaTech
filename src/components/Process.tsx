import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';

const STEPS = [
  {
    icon: Search,
    step: '01',
    title: 'Discover & Scope',
    body: 'A structured strategy call maps your goals, constraints, and success metrics into a fixed, transparent scope with milestones.',
  },
  {
    icon: PenTool,
    step: '02',
    title: 'Design & Architect',
    body: 'We design the user experience and the system architecture together — so the product is as solid under the hood as it looks on the surface.',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Build & Iterate',
    body: 'Weekly demos with working software from the first sprint. You see progress, give feedback, and steer priorities continuously.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Launch & Grow',
    body: 'Production launch with monitoring and handover documentation — then ongoing growth, automation, and iteration support.',
  },
];

export function Process() {
  return (
    <section id="process" className="relative bg-[#F8FAFC] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            dark={false}
            eyebrow="Our Process"
            title="A delivery process built for accountability"
            description="Remote-first does not mean opaque. Every engagement runs on a transparent, milestone-driven operating rhythm."
          />
        </Reveal>

        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 90} as="li">
              <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-xl bg-accent-soft p-3 text-accent">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-4xl font-semibold text-slate-100 transition-colors group-hover:text-accent/20">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-slate-deep">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
