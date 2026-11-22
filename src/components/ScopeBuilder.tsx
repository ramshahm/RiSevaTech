import { useState } from 'react';
import { Check, Send, MessageCircle, Loader2, AlertCircle } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { supabase } from '@/lib/supabase';
import { SERVICES, URGENCIES, buildBrief, whatsappLink, CONTACT_EMAIL } from '@/lib/constants';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ScopeBuilder() {
  const [selected, setSelected] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<string>('standard');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleService = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const brief = buildBrief({
    services: selected,
    urgency: URGENCIES.find((u) => u.id === urgency)?.label ?? urgency,
    name,
    company,
    message,
    source: 'Website Scope Builder',
  });

  const valid = name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && selected.length > 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || status === 'submitting') return;
    setStatus('submitting');
    setErrorMsg('');
    const { error } = await supabase.from('leads').insert({
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || null,
      services: selected,
      urgency,
      message: message.trim() || null,
      source: 'scope_builder',
    });
    if (error) {
      setStatus('error');
      setErrorMsg('Your brief could not be sent. Please try again, or reach us directly on WhatsApp.');
      return;
    }
    setStatus('success');
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div
        className="absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Project Scope Builder"
            title="Build your project brief in 60 seconds"
            description="Select what you need, set the urgency, and receive a structured brief — submitted instantly or handed off to WhatsApp, your choice."
          />
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={submit}
            className="mx-auto mt-14 max-w-4xl rounded-2xl border border-ink-line bg-ink-soft p-6 sm:p-10"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="inline-flex rounded-full bg-signal-soft p-4 text-signal">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-[#F8FAFC]">
                  Brief received. We&apos;ll respond within one business day.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-muted">
                  A senior engineer will review your requirements and reply with next steps. For an
                  instant conversation, hand the same brief to us on WhatsApp.
                </p>
                <a
                  href={whatsappLink(brief)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <>
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-muted">
                    1 — Services required
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {SERVICES.map((s) => {
                      const active = selected.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleService(s.id)}
                          aria-pressed={active}
                          className={cn(
                            'rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200',
                            active
                              ? 'border-accent bg-accent-soft text-accent-hover shadow-md shadow-accent/10'
                              : 'border-ink-line bg-white/[0.03] text-slate-muted hover:border-accent/40 hover:text-[#F8FAFC]'
                          )}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="mt-9">
                  <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-muted">
                    2 — Project urgency
                  </legend>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {URGENCIES.map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setUrgency(u.id)}
                        aria-pressed={urgency === u.id}
                        className={cn(
                          'rounded-xl border p-4 text-left transition-all duration-200',
                          urgency === u.id
                            ? 'border-accent bg-accent-soft'
                            : 'border-ink-line bg-white/[0.03] hover:border-accent/40'
                        )}
                      >
                        <span
                          className={cn(
                            'block text-sm font-semibold',
                            urgency === u.id ? 'text-accent-hover' : 'text-[#F8FAFC]'
                          )}
                        >
                          {u.label}
                        </span>
                        <span className="mt-1 block text-xs text-slate-muted">{u.note}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="mt-9">
                  <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-muted">
                    3 — Contact details
                  </legend>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      required
                      placeholder="Full name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-xl border border-ink-line bg-ink px-4 py-3.5 text-sm text-[#F8FAFC] placeholder:text-slate-muted/60 outline-none transition-colors focus:border-accent"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-xl border border-ink-line bg-ink px-4 py-3.5 text-sm text-[#F8FAFC] placeholder:text-slate-muted/60 outline-none transition-colors focus:border-accent"
                    />
                    <input
                      type="text"
                      placeholder="Company / organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="rounded-xl border border-ink-line bg-ink px-4 py-3.5 text-sm text-[#F8FAFC] placeholder:text-slate-muted/60 outline-none transition-colors focus:border-accent sm:col-span-2"
                    />
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project — goals, timeline, anything that matters."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="resize-none rounded-xl border border-ink-line bg-ink px-4 py-3.5 text-sm text-[#F8FAFC] placeholder:text-slate-muted/60 outline-none transition-colors focus:border-accent sm:col-span-2"
                    />
                  </div>
                </fieldset>

                {status === 'error' && (
                  <p className="mt-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </p>
                )}

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={!valid || status === 'submitting'}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === 'submitting' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {status === 'submitting' ? 'Submitting…' : 'Submit Brief'}
                  </button>
                  <a
                    href={whatsappLink(brief)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-signal/40 bg-signal-soft px-6 py-4 text-sm font-semibold text-signal transition-all hover:bg-signal/20"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send via WhatsApp
                  </a>
                </div>
                <p className="mt-4 text-center text-xs text-slate-muted">
                  Select at least one service and fill in name and email to submit. Your brief is stored
                  securely and never shared — or reach us directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent-hover hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
