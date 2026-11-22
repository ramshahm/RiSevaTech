export const WHATSAPP_NUMBER = '917607704326';
export const CONTACT_EMAIL = 'risevatech@gmail.com';

export const SERVICES = [
  { id: 'ai', label: 'AI Development & Automation' },
  { id: 'saas', label: 'SaaS / Web Platform' },
  { id: 'app', label: 'Mobile App (iOS & Android)' },
  { id: 'social', label: 'Social Media & Growth' },
  { id: 'video', label: '2D Video / Creative Production' },
  { id: 'growth', label: 'Digital Transformation / Biz Systems' },
] as const;

export type ServiceId = (typeof SERVICES)[number]['id'];

export const URGENCIES = [
  { id: 'standard', label: 'Standard', note: 'Start within 2–4 weeks' },
  { id: 'priority', label: 'Priority', note: 'Start within 1–2 weeks' },
  { id: 'urgent', label: 'Urgent', note: 'Assemble team now' },
] as const;

export type UrgencyId = (typeof URGENCIES)[number]['id'];

export function buildBrief(opts: {
  services: string[];
  urgency: string;
  name?: string;
  company?: string;
  message?: string;
  source: string;
}): string {
  const lines: string[] = ['RiSeva Tech — New Project Brief'];
  if (opts.company) lines.push(`Company: ${opts.company}`);
  else if (opts.name) lines.push(`Contact: ${opts.name}`);
  const labels = opts.services
    .map((id) => SERVICES.find((s) => s.id === id)?.label ?? id)
    .join(', ');
  lines.push(`Services: ${labels || 'General enquiry'}`);
  lines.push(`Urgency: ${opts.urgency}`);
  if (opts.message) lines.push(`Details: ${opts.message}`);
  lines.push(`Via: ${opts.source}`);
  return lines.join('\n');
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
