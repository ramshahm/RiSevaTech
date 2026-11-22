import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  dark?: boolean;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      <p
        className={cn(
          'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]',
          dark ? 'text-accent-hover' : 'text-accent'
        )}
      >
        <span className="h-px w-6 bg-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          'mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]',
          dark ? 'text-[#F8FAFC]' : 'text-slate-deep'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-5 text-base leading-relaxed sm:text-lg', dark ? 'text-slate-muted' : 'text-slate-600')}>
          {description}
        </p>
      )}
    </div>
  );
}
