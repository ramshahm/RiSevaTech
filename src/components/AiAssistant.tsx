import { useEffect, useRef, useState } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SERVICES, buildBrief, whatsappLink, CONTACT_EMAIL } from '@/lib/constants';
import { cn } from '@/lib/utils';

type FlowId = 'build' | 'ai' | 'media' | 'work';

const QUICK_REPLIES: Array<{ id: FlowId; label: string }> = [
  { id: 'build', label: 'Website / App / SaaS' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'media', label: 'Social Media & 2D Video' },
  { id: 'work', label: 'Past Work & Pricing' },
];

const FLOW_RESPONSES: Record<FlowId, { text: string; services: string[] }> = {
  build: {
    text: 'Great — we build production-grade websites, mobile apps, and multi-tenant SaaS platforms. To scope it properly, could you share your name and email below, plus a line about what you want to launch?',
    services: ['saas', 'app'],
  },
  ai: {
    text: 'Our AI team ships workflow automation, custom agents, and document intelligence that cut manual work fast. Share your name and email (and what process you want to automate), and a senior engineer will get back within one business day.',
    services: ['ai'],
  },
  media: {
    text: 'We run content pipelines, performance social media, and 2D / motion-graphics video production. Tell us your name and email plus your channel or brand, and we will send relevant work samples.',
    services: ['social', 'video'],
  },
  work: {
    text: 'We have shipped work for hospitals (Al Mannat Hospital), IIT-JEE & NEET institutes, and YouTube creators. Pricing depends on scope — after a free strategy call you get a fixed, milestone-based quote. Leave your name and email and we will share case studies and a ballpark.',
    services: [],
  },
};

type Step = 'greeting' | 'form' | 'done';

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('greeting');
  const [flow, setFlow] = useState<FlowId | null>(null);
  const [messages, setMessages] = useState<Array<{ from: 'bot' | 'user'; text: string }>>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [detail, setDetail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, step, open]);

  function pickFlow(id: FlowId) {
    setFlow(id);
    setMessages((m) => [...m, { from: 'user', text: QUICK_REPLIES.find((q) => q.id === id)?.label ?? '' }, { from: 'bot', text: FLOW_RESPONSES[id].text }]);
    setStep('form');
  }

  const brief = flow
    ? buildBrief({
        services: FLOW_RESPONSES[flow].services,
        urgency: 'Standard',
        name,
        message: detail,
        source: 'RiSeva AI Assistant',
      })
    : '';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || submitting) return;
    setSubmitting(true);
    setError(false);
    const { error: err } = await supabase.from('leads').insert({
      name: name.trim(),
      email: email.trim(),
      services: flow ? FLOW_RESPONSES[flow].services : [],
      urgency: 'standard',
      message: [flow ? QUICK_REPLIES.find((q) => q.id === flow)?.label : '', detail.trim()].filter(Boolean).join(' — ') || null,
      source: 'ai_assistant',
    });
    setSubmitting(false);
    if (err) {
      setError(true);
      return;
    }
    setMessages((m) => [...m, { from: 'bot', text: `Thanks, ${name.split(' ')[0]}! Your requirements are captured. A senior engineer will reach out within one business day — or continue instantly on WhatsApp.` }]);
    setStep('done');
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close RiSeva AI Assistant' : 'Open RiSeva AI Assistant'}
        className="safe-b fixed left-4 z-50 inline-flex items-center gap-2 sm:left-5 rounded-full border border-accent/50 bg-ink-raised/90 py-3 pl-3 pr-4 text-sm font-semibold text-[#F8FAFC] shadow-2xl shadow-accent/20 backdrop-blur-xl transition-all hover:border-accent hover:bg-ink-raised sm:pr-5"
      >
        {open ? <X className="h-5 w-5 text-accent-hover" /> : <Bot className="h-5 w-5 text-accent-hover" />}
        {!open && 'RiSeva AI Assistant'}
      </button>

      {open && (
        <div className="safe-b fixed bottom-[76px] left-4 z-50 flex h-[min(540px,calc(100dvh-160px))] w-[min(calc(100vw-88px),380px)] flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-soft shadow-2xl shadow-black/60 animate-fade-up sm:left-5">
          <div className="flex items-center gap-3 border-b border-ink-line bg-ink-raised px-5 py-4">
            <span className="relative inline-flex rounded-full bg-accent-soft p-2">
              <Bot className="h-5 w-5 text-accent-hover" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-raised bg-signal" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#F8FAFC]">RiSeva AI Assistant</p>
              <p className="text-xs text-signal">Online — replies instantly</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <ChatBubble from="bot" text="Hi! I'm the RiSeva AI Assistant. What can I help you explore today? You can also reach us anytime at risevatech@gmail.com." />
            {messages.map((m, i) => (
              <ChatBubble key={i} from={m.from} text={m.text} />
            ))}

            {step === 'greeting' && (
              <div className="grid gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => pickFlow(q.id)}
                    className="rounded-lg border border-ink-line bg-white/[0.03] px-4 py-2.5 text-left text-sm font-medium text-slate-muted transition-all hover:border-accent/50 hover:text-[#F8FAFC]"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {step === 'form' && (
              <form onSubmit={submit} className="space-y-2.5 rounded-xl border border-ink-line bg-white/[0.02] p-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-ink-line bg-ink px-3 py-2.5 text-sm text-[#F8FAFC] placeholder:text-slate-muted/60 outline-none focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-ink-line bg-ink px-3 py-2.5 text-sm text-[#F8FAFC] placeholder:text-slate-muted/60 outline-none focus:border-accent"
                />
                <textarea
                  rows={2}
                  placeholder="What do you need? (optional)"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className="w-full resize-none rounded-lg border border-ink-line bg-ink px-3 py-2.5 text-sm text-[#F8FAFC] placeholder:text-slate-muted/60 outline-none focus:border-accent"
                />
                {error && (
                  <p className="text-xs text-red-300">
                    Something went wrong — email us at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                      {CONTACT_EMAIL}
                    </a>{' '}
                    or use WhatsApp.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  {submitting ? 'Sending…' : 'Send requirements'}
                </button>
              </form>
            )}

            {step === 'done' && (
              <a
                href={whatsappLink(brief)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                Continue on WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ChatBubble({ from, text }: { from: 'bot' | 'user'; text: string }) {
  return (
    <div className={cn('flex', from === 'user' ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          from === 'user'
            ? 'rounded-br-md bg-accent text-white'
            : 'rounded-bl-md border border-ink-line bg-ink-raised text-slate-muted'
        )}
      >
        {text}
      </p>
    </div>
  );
}
