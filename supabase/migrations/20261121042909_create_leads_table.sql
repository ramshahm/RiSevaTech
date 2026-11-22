/*
# Create leads table for RiSeva Tech lead capture (single-tenant, no auth)

1. New Tables
- `leads`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) - visitor's name
  - `email` (text, not null) - visitor's email address
  - `company` (text, nullable) - visitor's company / organization
  - `phone` (text, nullable) - visitor's phone number
  - `services` (text[], not null) - selected services from the project scope builder or chat flow
  - `urgency` (text, not null, default 'normal') - project urgency: standard, priority, urgent
  - `budget` (text, nullable) - budget range hint
  - `message` (text, nullable) - free-form project details
  - `source` (text, not null, default 'scope_builder') - origin of the lead: scope_builder or ai_assistant
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `leads`.
- Grant INSERT to `anon` and `authenticated` (visitors submit leads without an account).
- INSERT-only policy with WITH CHECK (true): leads are write-only from the public site;
  no public read access, so visitor submissions stay private.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  services text[] NOT NULL DEFAULT '{}',
  urgency text NOT NULL DEFAULT 'standard',
  budget text,
  message text,
  source text NOT NULL DEFAULT 'scope_builder',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON leads TO anon, authenticated;

DROP POLICY IF EXISTS "Public can submit leads" ON leads;
CREATE POLICY "Public can submit leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);
