-- BetAndPlayUSA Supabase Setup
-- Run this SQL in your Supabase project's SQL Editor

-- Create host_codes table
create table host_codes (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,
  venue_name text not null,
  host_name text,
  city text,
  state text,
  active boolean default true,
  created_at timestamp with time zone default now()
);

-- Create submissions table
create table submissions (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('inperson', 'social')),
  first_name text not null,
  last_name text not null,
  email text not null,
  telegram_username text,
  sportsbook text not null,
  host_code text references host_codes(code),
  venue_name text,
  state text,
  file_urls text[],
  status text default 'pending' check (status in ('pending', 'approved', 'flagged', 'rejected')),
  consent_age boolean default false,
  consent_data boolean default false,
  consent_affiliate boolean default false,
  consent_telegram boolean default false,
  ip_address text,
  created_at timestamp with time zone default now()
);

-- Create payout_tracking table
create table payout_tracking (
  id uuid default gen_random_uuid() primary key,
  submission_id uuid references submissions(id),
  host_code text references host_codes(code),
  sportsbook text,
  cpa_amount numeric,
  host_payout numeric,
  our_margin numeric,
  paid_out boolean default false,
  paid_out_at timestamp with time zone,
  notes text,
  created_at timestamp with time zone default now()
);

-- Enable RLS policies for security
alter table host_codes enable row level security;
alter table submissions enable row level security;
alter table payout_tracking enable row level security;

-- RLS policies - allow public read on host_codes (for validation)
create policy "Allow public to read active host codes" on host_codes
  for select using (active = true);

-- RLS policies - allow anonymous inserts to submissions
create policy "Allow anonymous to insert submissions" on submissions
  for insert with check (true);

-- RLS policies - only admin can read submissions
create policy "Allow authenticated admin to read submissions" on submissions
  for select using (auth.role() = 'authenticated');

create policy "Allow authenticated admin to update submissions" on submissions
  for update using (auth.role() = 'authenticated');

-- RLS policies - admin access to payout_tracking
create policy "Allow authenticated admin to manage payouts" on payout_tracking
  for all using (auth.role() = 'authenticated');

-- Create storage bucket for proof uploads
insert into storage.buckets (id, name, public)
values ('proof-uploads', 'proof-uploads', false)
on conflict do nothing;

-- Set up RLS policies for storage bucket
create policy "Allow authenticated users to upload proof files"
on storage.objects
for insert
with check (bucket_id = 'proof-uploads' AND auth.role() = 'authenticated');

create policy "Allow authenticated admin to read proof files"
on storage.objects
for select
with check (bucket_id = 'proof-uploads' AND auth.role() = 'authenticated');
