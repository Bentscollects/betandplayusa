# BetAndPlayUSA — Build Progress & Current Status

## Last updated: April 6, 2026

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
- **URL:** /admin/overview (hidden from public nav)
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

### Test host codes (in database)
- BAR-001 — McGee's Bar & Grill, New York NY
- BAR-002 — The Sports Lounge, Newark NJ
- BAR-003 — Champions Bar, Chicago IL
- TEST-001 — Test Venue, Las Vegas NV

---

## Brand & Design

- **Brand name:** BetAndPlayUSA
- **Primary Navy:** #1B3A6B
- **Bold Red:** #D91E27
- **White:** #FFFFFF
- **Light background:** #F4F6FA
- **Charcoal text:** #111827
- **Green (success):** #22c55e
- **All styling:** Inline styles throughout (Tailwind not working)
- **Design style:** American sports bar — patriotic, bold, energetic. Uppercase headings, diagonal stripe textures, red accent bars.
- **Logo:** Currently text wordmark (star circle + Bet&PlayUSA text). Logo PNG files available but not yet implemented cleanly.

### Sportsbook logos (in /public folder)
- /fanduel.png, /draftkings.png, /caesars.png, /fanatics.png, /betmgm.png

### Affiliate links
- FanDuel: https://wlfanduelus.adsrv.eacdn.com/C.ashx?btag=a_44859b_16c_&af

---

## What's Built & Working

### ✅ Core pages
- Homepage (/)
- Sportsbooks page (/sportsbooks)
- Activate page (/activate) — in-person flow
- Join page (/join) — social/Telegram flow
- Host portal (/host) — venue operator login + submission verify
- Responsible gambling, Privacy, Terms, Cookies pages

### ✅ Admin portal (/admin)
- Login with hardcoded credentials
- Overview — all submissions table, status update (approve/reject/flag)
- Hosts — host code management (create, activate/deactivate)
- Reports — date filter, CPA tracking, by venue/sportsbook tables, CSV export, Mark as Paid

### ✅ API routes
- /api/submit — new submission
- /api/validate-code — host code validation
- /api/verify-submission — host portal verification
- /api/upload-proof — proof image upload
- /api/send-email — email notifications
- /api/admin/submissions — admin fetch + status update
- /api/admin/hosts — host code CRUD
- /api/cron/daily-digest — daily Resend email report

### ✅ Sweepstakes page (/sweepstakes)
- 5 sweepstakes casinos: Stake.us, Pulsz, McLuck, WOW Vegas, Chanced
- Legal in all 50 states messaging
- How it works section
- Affiliate link placeholders (need real links)

### ✅ Casino page (/casino)
- 5 online casinos: BetMGM, DraftKings, FanDuel, Caesars, Golden Nugget
- Available in NJ, PA, MI, WV, CT, DE only
- Star ratings and Best For labels
- Affiliate link placeholders (need real links)

### ✅ Homepage enhancements
- Red scrolling ticker banner at top
- Social proof bar (2,400+ members, $485k+ claimed)
- Why BetAndPlayUSA section (4 trust cards)
- Sweepstakes and Casino teaser sections
- FAQ section
- States bar removed, replaced with cleaner layout

### ✅ Sportsbooks enhancements
- Star ratings, Best For, Payout Speed on each card
- T&Cs text on every offer
- Limited Time badge on FanDuel

### ✅ Admin reports
- Mark as Paid button on approved submissions

---

## What Still Needs Building

1. Real affiliate links for sweepstakes casinos (Stake.us, Pulsz, McLuck, WOW Vegas, Chanced)
2. Real affiliate links for online casinos (BetMGM Casino, DraftKings Casino, FanDuel Casino, Caesars, Golden Nugget)
3. State landing pages — /states/[state] for top 10 states (NY, PA, NJ, MI, IL, OH, CO, TN, VA, AZ)
4. Referral system — user referral links after submission
5. Make GitHub repo private
