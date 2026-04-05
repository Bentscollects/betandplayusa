# BetAndPlayUSA — Build Progress & Current Status

## Last updated: April 5, 2026

---

## Project Overview

**BetAndPlayUSA** is a US sports betting affiliate website with two acquisition channels:
1. **In-person landbased activation** — QR code at bars/events → host code → sportsbook signup → cash reward
2. **Social media acquisition** — paid ads → sign up → proof upload → Telegram group access

**Domain:** betandplayusa.com (registered on Namecheap, not yet connected to Vercel)
**Live URL:** https://betandplayusa.vercel.app
**GitHub:** https://github.com/Bentscollects/betandplayusa
**Tech stack:** Next.js, Supabase, Vercel, Resend

---

## Credentials & Keys

### Admin login
- **URL:** /admin
- **Email:** liambenton2@gmail.com
- **Password:** BetAndPlay2026!

### Supabase
- **Project:** BetAndPlayUSA
- **Project ID:** pnloiztluwwzznotbejg
- **URL:** https://pnloiztluwwzznotbejg.supabase.co
- **Anon key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyOTkzNzcsImV4cCI6MjA5MDg3NTM3N30.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
- **Service role key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubG9penRsdXd3enpub3RiZWpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI5OTM3NywiZXhwIjoyMDkwODc1Mzc3fQ.PufBrjpwsNosGHWSK1CK9m-vSOB757vzAsdfy5JUONc

### Resend
- **API key:** re_Uovusepx_Gq9ZXbg9X7yz9joCDeRnqvsa
- **Send from:** onboarding@resend.dev (temporary until domain connected)
- **Admin notifications to:** liambenton2@gmail.com

### GitHub
- **Repo:** https://github.com/Bentscollects/betandplayusa
- **Username:** Bentscollects
- **Branch:** main
- **Note:** Regenerate GitHub PAT token if needed at https://github.com/settings/tokens

### Test host codes (in database)
- BAR-001 — McGee's Bar & Grill, New York NY (host: Mike D.)
- BAR-002 — The Sports Lounge, Newark NJ (host: Sarah K.)
- BAR-003 — Champions Bar, Chicago IL (host: James T.)
- TEST-001 — Test Venue, Las Vegas NV

---

## Brand & Design

- **Brand name:** BetAndPlayUSA
- **Navy:** #0B2545
- **Red:** #E63946
- **White:** #ffffff
- **Green (success):** #22c55e
- **All styling:** Inline styles (Tailwind CSS not working — use inline styles throughout)
- **Logo:** Star icon in red circle + "Bet&PlayUSA" wordmark

### Sportsbook colours
- FanDuel: bg #1059a4, text white, initials FD
- DraftKings: bg #1a1a2e, text #00d4aa, initials DK
- Caesars: bg #003087, text #FFD700, initials CS
- BetMGM: bg #c9a84c, text #1a1a1a, initials BM
- Fanatics: bg #cc0000, text white, initials FA

### CPA rates
- FanDuel: $250
- DraftKings: $200
- Caesars: $200
- Fanatics: $200
- BetMGM: $150

---

## Deployment

- **Hosting:** Vercel (connected to GitHub, auto-deploys on push)
- **Live URL:** https://betandplayusa.vercel.app
- **Domain:** betandplayusa.com (registered on Namecheap, not yet pointed to Vercel)

### To deploy changes:
1. Make changes locally and test on localhost:3000
2. Run in Mac Terminal:
   git add . && git commit -m "description" && git push
3. Vercel auto-deploys within 1-2 minutes

### To connect betandplayusa.com domain (when ready):
1. Go to Vercel dashboard → Project → Settings → Domains
2. Add betandplayusa.com
3. In Namecheap DNS, add:
   - CNAME: www → cname.vercel-dns.com
   - A record: @ → 76.76.21.21

---

## What's Built & Working

### ✅ Homepage (/)
- Navy hero with "Bet smarter. Get rewarded."
- State pills bar showing all legal US states
- How it works — 4 steps
- Sportsbook cards with coloured avatars, CPA badges, offers, Claim offer buttons
- Trust stats (30+ states, 5 sportsbooks, $500+ rewards, 21+)
- Geo-detection callout (fails silently outside US)
- Footer with quick links and responsible gambling

### ✅ In-person activation (/activate) — FULLY WORKING END TO END
- Step 1: Host code entry → validates against Supabase host_codes table → shows venue name
- Step 2: Sportsbook selection — 5 cards
- Step 3: Form — first name, last name, email + proof file upload (min 2 files) + 3 GDPR consent checkboxes
- Files upload to Supabase Storage bucket: proof-uploads/submissions/[HOST_CODE]/
- Submission saves to Supabase submissions table
- Instant email notification to liambenton2@gmail.com via Resend
- Confirmation email to user via Resend
- Step 4: Confirmation screen

### ✅ Social landing page (/join) — FULLY WORKING & STYLED
- 3-step flow: pick sportsbook → your details → upload proof
- Styled with navy hero, progress bar, sportsbook cards with coloured avatars
- Telegram username field
- File upload with preview and remove
- 4 consent checkboxes (age, data, affiliate, telegram)
- Submission saves to Supabase with type=social
- Admin notification email sent on submission
- User confirmation email sent on submission

### ✅ Host portal (/host) — FULLY WORKING
- Hidden from public nav — secret URL shared with hosts only
- Host enters their code → sees all submissions from last 7 days
- Verify button → updates status to host_verified → sends email to user + admin

### ✅ Admin login (/admin)
- Email: liambenton2@gmail.com / Password: BetAndPlay2026!
- Uses localStorage for session (admin_session key)

### ✅ Admin dashboard (/admin/overview) — FULLY WORKING
- Stat cards: Total, In-Person, Telegram, Pending, Host Verified, Approved, Flagged, Rejected
- Filter tabs: All, In-Person, Telegram, Pending, Host Verified, Approved, Flagged, Rejected
- Submissions table with: Person, Sportsbook, Type, Host/Venue, Files, Status, Date, Actions
- Approve button → updates status + sends Telegram approval email to user (for social submissions)
- Flag button → updates status
- Reject button → updates status
- Toast notifications on status change
- Refresh button

### ✅ Sportsbooks directory (/sportsbooks)
- Styled cards for all 5 sportsbooks
- State filter dropdown
- Promo code display for books that require one
- Affiliate link placeholders (AFFILIATE_LINK_FANDUEL etc.) — shows alert until real links added
- Available states shown as pills on each card

### ✅ Database (Supabase)
- host_codes table
- submissions table (type: inperson/social, status: pending/approved/flagged/rejected/host_verified)
- payout_tracking table

### ✅ File storage (Supabase Storage)
- Bucket: proof-uploads (private)
- Files stored at: submissions/[HOST_CODE or social]/[timestamp]-[filename]

### ✅ Email notifications (Resend)
- Admin notification on every submission
- User confirmation on submission
- Telegram approval email when admin clicks Approve on social submission
- Host verification email when host verifies in-person submission

### ✅ Submit API (/api/submit)
- Handles both inperson and social submission types
- File upload to Supabase Storage
- Database insert
- Resend emails

### ✅ Admin submissions API
- GET /api/admin/submissions — fetch all submissions
- PATCH /api/admin/submissions/[id] — update status + trigger approval email

---

## What Still Needs Building

### High priority:
1. **Connect domain** — point betandplayusa.com DNS to Vercel
2. **Replace affiliate links** — AFFILIATE_LINK_FANDUEL etc. in app/sportsbooks/page.jsx and lib/sportsbooks.js
3. **Add Telegram group invite link** — replace TELEGRAM_INVITE_LINK in app/api/admin/submissions/[id]/route.js
4. **Admin reports** — per host/venue breakdown, CSV export, payout tracking
5. **Update Resend sending domain** — change from onboarding@resend.dev to noreply@betandplayusa.com once domain connected

### Medium priority:
6. **Admin hosts page** (/admin/hosts) — create/assign/deactivate host codes
7. **/states/[state] pages** — dynamic state pages for SEO
8. **Daily digest email** — Vercel cron job at 8am
9. **Privacy, Terms, Cookies pages** — need padding and proper layout styling
10. **Responsible gambling page** — needs content and styling
11. **Cookie consent banner** — built but needs testing

### Lower priority:
12. **Admin analytics page** — visual charts
13. **Admin data/GDPR page** — deletion and export requests
14. **Sportsbook state availability** — update states arrays per book in app/sportsbooks/page.jsx when confirmed

---

## Known Issues & Technical Debt

1. **Hardcoded Supabase credentials** — Several API routes use hardcoded credentials instead of process.env. Works fine but should be cleaned up before scaling.
2. **Tailwind CSS not working** — All styling uses inline styles throughout.
3. **Middleware deprecated** — middleware.js removed. Admin protection relies on localStorage check only.
4. **Resend API key** — Should be regenerated before going fully public.
5. **GitHub repo is public** — Should be made private in GitHub settings.
6. **Geo-detection** — Fails silently outside US (fixed) but still shows console warning sometimes.

---

## Important Notes for Next Claude Session

- Always use inline styles, never Tailwind classes
- Always use function() {} not arrow functions in JSX event handlers to avoid build errors
- When overwriting files, use the Write File tool — never merge or append
- If build errors occur with duplicate declarations, delete the file and recreate it
- If .next cache gets corrupted: pkill -f "next" then rm -rf .next then npm run dev
- API routes use hardcoded Supabase credentials (not process.env) — keep consistent
- Admin session stored as localStorage key "admin_session"
- Submissions type field: "inperson" or "social" (not "in-person")

---

## File Structure
