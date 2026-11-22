import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'dark', className }: LogoProps) {
  const wordmarkColor = variant === 'dark' ? 'text-[#F8FAFC]' : 'text-slate-deep';
  const subColor = variant === 'dark' ? 'text-slate-muted' : 'text-slate-500';

  return (
    <a href="#top" className={cn('flex min-w-0 items-center gap-2.5 group sm:gap-3', className)} aria-label="RiSeva Tech home">
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10"
        role="img"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="46" height="46" rx="10" stroke="rgba(148,163,184,0.25)" strokeWidth="1.5" />
        <path
          d="M12 34V14h9.5c3.6 0 6 2.2 6 5.4 0 2.5-1.5 4.4-3.9 5.1L30 34h-4.7l-5.6-8.7H16V34h-4zm4-12.4h5.1c1.6 0 2.7-1 2.7-2.5s-1.1-2.5-2.7-2.5H16v5z"
          fill="#4F46E5"
        />
        <path
          d="M27.5 17.5c0-2 1.7-3.5 4-3.5 2.1 0 3.7 1.1 4.2 2.9l-3.3 1.2c-.2-.6-.7-1-1.3-1-.6 0-1 .4-1 .9 0 1.5 5.7.6 5.7 4.5 0 2.2-1.8 3.7-4.4 3.7-2.3 0-4-1.2-4.5-3.2l3.4-1.1c.2.8.9 1.2 1.6 1.2.7 0 1.1-.4 1.1-.9 0-1.6-5.5-.7-5.5-4.7z"
          fill="#10B981"
        />
      </svg>
      <span className="flex min-w-0 flex-col leading-none">
        <span className={cn('font-display text-base font-semibold tracking-tight sm:text-lg', wordmarkColor)}>
          RiSeva Tech
        </span>
        <span className={cn('mt-1 truncate text-[10px] font-medium tracking-[0.16em] uppercase sm:text-[11px] sm:tracking-[0.18em]', subColor)}>
          Engineering &amp; Growth Studio
          </span>
      </span>
    </a>
  );
}
