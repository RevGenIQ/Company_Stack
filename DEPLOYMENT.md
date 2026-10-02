# RevGen IQ — Deployment Guide

## Deploying to DomainIndia Shared Hosting (cPanel)

> [!IMPORTANT]
> DomainIndia shared hosting uses **cPanel** with Apache/LiteSpeed.  
> Next.js App Router requires **Node.js** — shared hosts do NOT support running `next start` natively.  
> **Use static export (`output: 'export'`)** for shared hosting. This converts the Next.js app into a static HTML/CSS/JS site.

---

## Prerequisites

| Requirement | Version / Detail |
|---|---|
| Node.js (local build machine) | v20 LTS or higher |
| npm | v10+ |
| DomainIndia account | Active cPanel hosting plan |
| Domain | revgeniq.com (or subdomain) |
| Supabase project | Already provisioned |

---

## Part 1 — Configure Next.js for Static Export

### 1.1 Update `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // ← Static HTML export
  trailingSlash: true,       // cPanel prefers trailing slashes
  images: {
    unoptimized: true,       // No Next.js image server on shared hosting
  },
};

export default nextConfig;
```

> [!WARNING]
> Static export disables server-side features:
> - **API Routes** (`/api/*`) → Replace with Supabase client-side calls or Supabase Edge Functions
> - **Server Actions** → Move to Supabase Edge Functions (see Part 3)
> - **Middleware** → Not available (remove or use Supabase client-side auth redirect)

### 1.2 Update `middleware.ts` for Static Mode

For static export, comment out or remove the middleware (it won't run on shared hosting):

```ts
// middleware.ts — DISABLED for static export
// Auth protection must be handled client-side or via Supabase Edge Functions
export const config = { matcher: [] };
```

Add a client-side redirect check inside each admin page:

```tsx
// components/admin/AdminGuard.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) { router.replace('/admin/login'); return; }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/admin/login');
    });
  }, [router]);
  return <>{children}</>;
}
```

---

## Part 2 — Build the Static Site

Run these commands on your **local machine** (or a CI/CD pipeline):

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables (create .env.local)
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (see Part 5)

# 3. Build the static export
npm run build
```

After a successful build, the static site will be in the **`out/`** directory.

```
out/
├── index.html
├── about/index.html
├── services/index.html
├── admin/index.html
├── _next/static/    ← JS, CSS, chunks
└── ...
```

---

## Part 3 — Upload to DomainIndia via cPanel File Manager

### 3.1 Log in to cPanel

1. Go to `https://domainindia.com/client` → **Login**
2. Navigate to your hosting account → **cPanel**

### 3.2 Upload Files

**Option A — File Manager (small sites)**

1. cPanel → **File Manager**
2. Navigate to `public_html/`
3. Click **Upload** → Upload all contents of the `out/` folder
4. Preserve the directory structure exactly

**Option B — FTP/SFTP (recommended)**

Use FileZilla or WinSCP:
```
Host:     ftp.yourdomain.com
Username: your_cpanel_username
Password: your_cpanel_password
Port:     21 (FTP) or 22 (SFTP if enabled)
```
Upload all files from `out/` to `public_html/`

### 3.3 `.htaccess` Configuration

Create or update `public_html/.htaccess`:

```apache
# RevGen IQ — Apache/.htaccess for Next.js Static Export
Options -Indexes

# Security headers
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Next.js static export routing — serve index.html for directories
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}/index.html -f
RewriteRule ^(.+)/?$ /$1/index.html [L]

# 404 fallback
ErrorDocument 404 /404/index.html

# Cache static assets aggressively
<FilesMatch "\.(js|css|woff2?|png|jpg|jpeg|svg|ico|webp)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# No cache for HTML pages
<FilesMatch "\.html$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>
```

---

## Part 4 — Domain & SSL Setup on DomainIndia

### 4.1 Point Your Domain

cPanel → **Zone Editor** → Add/Update A record:
```
Type: A       Name: @      Value: [server IP from cPanel]  TTL: 3600
Type: CNAME   Name: www    Value: yourdomain.com
```

### 4.2 Enable Free SSL (Let's Encrypt)

1. cPanel → **SSL/TLS** → **Let's Encrypt SSL**
2. Select your domain → **Issue Certificate**
3. Enable **AutoSSL** to auto-renew

---

## Part 5 — Environment Variables

All `NEXT_PUBLIC_*` variables must be set **before** running `npm run build`.

### `.env.local` (local builds)

```env
# ── Supabase ─────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# ── Site URL ──────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://revgeniq.com

# ── Email (server-side only — use Edge Function) ──
# RESEND_API_KEY=re_xxxxxxxxxxxx
# RESEND_FROM_EMAIL=hello@revgeniq.com
```

### Supabase Edge Function for Lead Capture

```typescript
// supabase/functions/capture-lead/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Not allowed', { status: 405 })
  const body = await req.json()
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  const { error } = await supabase.from('leads').insert(body)
  if (error) return new Response(JSON.stringify({ error }), { status: 400 })
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  })
})
```

Deploy with: `supabase functions deploy capture-lead`

---

## Part 6 — Supabase Setup

### Run Database Schema

1. Supabase Dashboard → **SQL Editor**
2. Paste and run `supabase/schema.sql`
3. Verify all tables are created

### Create Admin User

Supabase Dashboard → **Authentication → Users → Invite User** → enter admin email.

### Storage Buckets

Dashboard → **Storage** → Create:
- `blog-images` (Public)
- `case-study-assets` (Public)
- `avatars` (Private)

---

## Part 7 — Alternative: Deploy to Vercel (Recommended)

> [!TIP]
> For **full feature set** (Server Actions, API routes, ISR, edge middleware), deploy to **Vercel** instead. Use DomainIndia only as a custom domain pointer.

```bash
npx vercel --prod
```

Then in DomainIndia cPanel → Zone Editor, add:
```
Type: CNAME   Name: www   Value: cname.vercel-dns.com
```
For apex domain, follow Vercel's nameserver or A-record instructions in their Dashboard.

---

## Part 8 — GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Build & Deploy to DomainIndia
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Build static export
        env:
          NEXT_PUBLIC_SUPABASE_URL:      ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          NEXT_PUBLIC_SITE_URL:          ${{ secrets.NEXT_PUBLIC_SITE_URL }}
        run: npm run build
      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server:      ${{ secrets.FTP_SERVER }}
          username:    ${{ secrets.FTP_USERNAME }}
          password:    ${{ secrets.FTP_PASSWORD }}
          local-dir:   ./out/
          server-dir:  /public_html/
```

---

## Part 9 — Test Checklist

### Pre-Deploy
- [ ] `npm run build` completes without errors
- [ ] `npx tsc --noEmit` passes
- [ ] All nav routes render in dev mode
- [ ] Lead form submits (via Supabase Edge Function)
- [ ] Admin login works with Supabase auth
- [ ] `out/` directory generated with all HTML files

### Post-Deploy (DomainIndia)
- [ ] Homepage loads at `https://revgeniq.com`
- [ ] All nav links work correctly (no 404s)
- [ ] Contact/Book a Call form submits
- [ ] SSL is active (padlock shown in browser)
- [ ] Admin portal accessible at `/admin/login`
- [ ] No broken images or missing assets
- [ ] Mobile responsive layout verified
- [ ] Google PageSpeed score > 85

---

## Part 10 — Known Limitations (Static Export)

| Feature | Status | Workaround |
|---|---|---|
| Server Actions | ❌ Disabled | Supabase Edge Functions |
| API Routes (`/api/*`) | ❌ Disabled | Supabase Edge Functions |
| Edge Middleware | ❌ Disabled | Client-side `AdminGuard` component |
| ISR / Revalidation | ❌ Disabled | Rebuild + redeploy on content change |
| Dynamic `[slug]` pages | ⚠️ Must pre-generate | Add `generateStaticParams()` to each |
| `next/image` optimization | ❌ Disabled | `images: { unoptimized: true }` |
| Streaming / Suspense | ❌ Not available | Pages load fully |

---

## Part 11 — Recommended Next Steps

1. ✅ **Move to Vercel** for full Next.js feature support
2. ✅ **Deploy Supabase Edge Functions** for lead capture + email notifications
3. ✅ **Add `generateStaticParams()`** to all dynamic `[slug]` / `[id]` routes
4. ✅ **Configure Resend** in Supabase Edge Function for email alerts
5. ✅ **Set up Google Analytics 4** via `NEXT_PUBLIC_GA_ID` env var
6. ✅ **Create the first admin user** via Supabase Dashboard Auth
7. ✅ **Seed the database** using `supabase/schema.sql` + `lib/mock-store.ts` data
8. ✅ **Enable Supabase Realtime** for live admin dashboard updates
9. ✅ **Configure custom SMTP** in Supabase for branded auth emails
10. ✅ **Set up Supabase Storage** buckets and update `LeadForm` / blog editor

---

## Quick Commands Reference

```bash
# Development
npm run dev              # http://localhost:3000

# Static build (for shared hosting)
npm run build            # outputs to out/

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Deploy to Vercel (alternative)
npx vercel --prod
```

---

*RevGen IQ — Deployment Guide v1.0 | October 2026*
