import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { whatsappLink, CONTACT_EMAIL } from '@/lib/constants';

const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Capabilities',
    links: [
      { label: 'AI & Automation', href: '#capabilities' },
      { label: 'SaaS & Web Platforms', href: '#capabilities' },
      { label: 'Mobile Apps', href: '#capabilities' },
      { label: '2D Video & Creative', href: '#capabilities' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Proprietary Products', href: '#products' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Our Process', href: '#process' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#faq' },
      { label: 'Terms of Service', href: '#faq' },
      { label: 'Cookie Policy', href: '#faq' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-muted">
              RiSeva Tech is a remote-first engineering and growth studio serving clients across India
              and global markets. Distributed delivery that is fast, agile, and cost-efficient — no
              brick-and-mortar required.
            </p>
            <a
              href={whatsappLink('Hi RiSeva Tech, I found you through your website footer.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal-soft px-5 py-3 text-sm font-semibold text-signal transition-all hover:bg-signal/20"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 block text-sm font-medium text-slate-muted transition-colors hover:text-[#F8FAFC]"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F8FAFC]">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-slate-muted transition-colors hover:text-[#F8FAFC]"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-line pt-8 sm:flex-row">
          <p className="text-xs text-slate-muted">
            © {new Date().getFullYear()} RiSeva Tech. Engineering &amp; Growth Studio. All rights reserved.
          </p>
          <p className="text-xs text-slate-muted">
            Serving India · UAE · US · UK — remote-first, worldwide delivery
          </p>
        </div>
      </div>
    </footer>
  );
}
