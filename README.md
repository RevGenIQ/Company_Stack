# RevGen IQ - B2B Outbound Revenue Platform & Internal CMS

RevGen IQ is a production-ready, scalable B2B revenue-generation agency website with a public marketing portal, dynamic Blog CMS, Case Study CMS, lead capture engine with automatic UTM attribution, and an authenticated admin dashboard.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Components**: shadcn/ui & Lucide React
- **Database & Auth**: Supabase PostgreSQL, Supabase Auth & Storage
- **Rich-Text Editor**: TipTap Editor
- **Forms & Validation**: React Hook Form & Zod
- **Transactional Email**: Resend SDK
- **Charts**: Recharts
- **Deployment**: Vercel Ready

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   RESEND_API_KEY=re_123456789
   NOTIFICATION_EMAIL=leads@revgeniq.com
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Public Routes

- `/` - Marketing Homepage
- `/about` - About RevGen IQ & Team
- `/services` & `/services/[slug]` - Outbound Services Catalog & Details
- `/industries` & `/industries/[slug]` - Target Industry Solutions
- `/case-studies` & `/case-studies/[slug]` - Client Results & Outcome Case Studies
- `/blog` & `/blog/[slug]` - Outbound Insights & Articles
- `/contact` - Contact Strategy Team
- `/book-a-call` - 30-Minute Consultation Scheduler

## Admin Routes

- `/admin` - Executive Pipeline & CMS Dashboard
- `/admin/leads` & `/admin/leads/[id]` - Lead Pipeline & Detail Management
- `/admin/blog`, `/admin/blog/new`, `/admin/blog/[id]` - TipTap Blog CMS
- `/admin/case-studies` & `/admin/case-studies/new` - Case Studies CMS
- `/admin/services` - Service Offering Settings
- `/admin/industries` - Industry Vertical Settings
- `/admin/testimonials` - Testimonials Management
- `/admin/media` - Supabase Storage Media Library
- `/admin/users` - RBAC User Roles
- `/admin/settings` - System Configuration
