import { useEffect, useState } from 'react';
import { Menu, X, CalendarClock, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { whatsappLink, CONTACT_EMAIL } from '@/lib/constants';

const LINKS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Proprietary Products', href: '#products' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-ink-line bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-muted transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-muted transition-colors hover:text-[#F8FAFC] xl:inline-flex"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={whatsappLink('Hi RiSeva Tech, I would like to discuss a project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-line px-4 py-2.5 text-sm font-medium text-slate-muted transition-all hover:border-signal/50 hover:text-signal"
            aria-label="Chat with RiSeva Tech on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:shadow-accent/40"
          >
            <CalendarClock className="h-4 w-4" />
            Book Strategy Call
          </a>
        </div>

        <button
          className="inline-flex rounded-lg p-2 text-slate-muted hover:bg-white/5 hover:text-[#F8FAFC] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-line bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4" aria-label="Mobile">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-slate-muted transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block rounded-lg px-3 py-3 text-base font-medium text-slate-muted transition-colors hover:bg-white/5 hover:text-[#F8FAFC]"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="flex gap-3 pt-3">
              <a
                href={whatsappLink('Hi RiSeva Tech, I would like to discuss a project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-ink-line px-4 py-3 text-sm font-medium text-slate-muted hover:text-signal"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white"
              >
                <CalendarClock className="h-4 w-4" />
                Book a Call
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
