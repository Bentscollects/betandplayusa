# BetAndPlayUSA — Setup Checklist

Follow these steps to get the site running locally and deploy to production.

## Phase 1: Local Setup (30 minutes)

- [ ] **1. Install Node.js**
  - Visit https://nodejs.org and install LTS version
  - Verify: `node --version` and `npm --version`

- [ ] **2. Install dependencies**
  ```bash
  cd /Users/liambenton/Desktop/betandplayusa
  npm install
  npm install resend
  ```

- [ ] **3. Set up Supabase**
  - Go to https://app.supabase.com/
  - Click on project "BetAndPlayUSA" (pnloiztluwwzznotbejg)
  - Go to SQL Editor
  - Create new query and **paste entire contents of `supabase-setup.sql`**
  - Run query (⌘ + Enter or Ctrl + Enter)
  - Wait for success message (tables should appear in Database)

- [ ] **4. Get Supabase keys**
  - In Supabase: Settings → API
  - Copy "anon public" key
  - Copy "service_role" key
  - Copy "Project URL"

- [ ] **5. Create admin user in Supabase**
  - In Supabase: Auth → Users
  - Click "Add user"
  - Email: liambenton2@gmail.com
  - Password: (create strong password, save it)
  - Confirm

- [ ] **6. Update `.env.local`**
  - Open `.env.local` in your editor
  - Fill in these values from Supabase:
    ```
    NEXT_PUBLIC_SUPABASE_URL=https://pnloiztluwwzznotbejg.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key_from_step_4>
    SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key_from_step_4>
    RESEND_API_KEY=re_Uovusepx_Gq9ZXbg9X7yz9joCDeRnqvsa
    ADMIN_EMAIL=liambenton2@gmail.com
    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    CRON_SECRET=my_super_secret_cron_key_12345
    ```
  - Save file

- [ ] **7. Start development server**
  ```bash
  npm run dev
  ```
  - Open browser to http://localhost:3000
  - Should see homepage with sportsbooks

- [ ] **8. Test key flows**
  - Visit http://localhost:3000 → Homepage loads ✓
  - Visit http://localhost:3000/activate → Activation page loads ✓
  - Visit http://localhost:3000/admin → Login page loads ✓
  - Login with liambenton2@gmail.com and your password from step 5 ✓
  - Visit admin dashboard http://localhost:3000/admin/overview ✓

---

## Phase 2: Update Affiliate Links (15 minutes)

- [ ] **Replace affiliate link placeholders**
  - Open `/lib/sportsbooks.js`
  - Find each `AFFILIATE_LINK_[BOOKNAME]`
  - Replace with actual affiliate URLs from each sportsbook
  - Example:
    ```javascript
    affiliateLink: 'https://fanduel.com/affiliate?ref=YOURREF'
    ```

- [ ] **Update promo codes (if needed)**
  - In `/lib/sportsbooks.js`
  - Update `PROMO_CAESARS`, `PROMO_BETMGM`, `PROMO_FANATICS` with real codes
  - Or remove if sportsbooks don't require them

---

## Phase 3: Production Deployment (45 minutes)

- [ ] **1. Create GitHub repository**
  - Create new repo on https://github.com
  - Follow instructions to push your local code

- [ ] **2. Link to Vercel**
  - Go to https://vercel.com
  - Click "New Project"
  - Import your GitHub repository
  - Click "Continue"

- [ ] **3. Add environment variables in Vercel**
  - In Vercel project settings: Settings → Environment Variables
  - Add all variables from `.env.local`:
    ```
    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY
    RESEND_API_KEY
    ADMIN_EMAIL
    NEXT_PUBLIC_SITE_URL=https://betandplayusa.com
    CRON_SECRET
    ```

- [ ] **4. Deploy**
  - Click Deploy button
  - Wait for build to complete
  - Visit your production URL

- [ ] **5. Update domain**
  - Go to Settings → Domains
  - Add your domain betandplayusa.com
  - Update DNS records (Vercel will show instructions)
  - Wait for DNS propagation (can take up to 24 hours)

---

## Phase 4: Testing in Production (30 minutes)

- [ ] **Test all public pages**
  - [ ] Homepage loads
  - [ ] Geo-detection works
  - [ ] /activate flow works end-to-end
  - [ ] /join form submits
  - [ ] /sportsbooks directory works
  - [ ] /states/[state] pages work
  - [ ] All legal pages load

- [ ] **Test admin dashboard**
  - [ ] Admin login works
  - [ ] Can view submissions
  - [ ] Can create host codes
  - [ ] Can update submission status

- [ ] **Test file uploads**
  - [ ] Upload files on /activate page
  - [ ] Files appear in Supabase Storage (check dashboard)

- [ ] **Test emails**
  - [ ] Submit activation form (check inbox)
  - [ ] Check admin notification email
  - [ ] Check user confirmation email

- [ ] **Test cron job**
  - [ ] Wait for 8 AM UTC
  - [ ] Check if daily digest email arrives
  - [ ] Or manually test with API call to /api/cron/daily-digest

---

## Phase 5: Going Live (15 minutes)

- [ ] **Create host codes for your partners**
  - Log into admin dashboard
  - Go to Host Codes section
  - Create codes for each bar/venue
  - Share QR codes that link to /activate?code=BAR-XXX

- [ ] **Set up Telegram group (optional)**
  - Create private Telegram channel
  - Update `/join` page with your channel link

- [ ] **Monitor submissions**
  - Check admin dashboard daily
  - Approve/flag submissions
  - Track payouts in payout_tracking table

---

## Troubleshooting

### "Module not found" errors
- Run: `npm install`
- Clear cache: `rm -rf .next node_modules && npm install`

### "Cannot find Supabase keys"
- Check `.env.local` exists and is in `.gitignore`
- Verify keys are from correct Supabase project
- Restart dev server: `npm run dev`

### Admin login doesn't work
- Verify user was created in Supabase Auth
- Check email is exactly: `liambenton2@gmail.com`
- Try resetting password in Supabase

### Email not sending
- Check RESEND_API_KEY is correct
- Verify email is valid
- Check Resend dashboard for errors

### File uploads failing
- Verify proof-uploads bucket exists in Supabase Storage
- Check storage permissions in Supabase RLS policies
- Files should appear in Storage → proof-uploads

### Cron job not running
- Cron only works on Vercel (not localhost)
- Check vercel.json schedule syntax
- Verify CRON_SECRET is set in Vercel
- Check Function Logs in Vercel dashboard

---

## Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Resend Docs:** https://resend.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## Project Info

- **Domain:** betandplayusa.com
- **Supabase Project:** BetAndPlayUSA (pnloiztluwwzznotbejg)
- **Admin Email:** liambenton2@gmail.com
- **Tech Stack:** Next.js, Tailwind, Supabase, Resend, Vercel

Ready to launch! 🚀
