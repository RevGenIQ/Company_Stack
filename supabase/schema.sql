-- ========================================================
-- RevGen IQ PostgreSQL Database Schema & RLS Setup
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types
CREATE TYPE lead_status AS ENUM (
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'MEETING_BOOKED',
  'PROPOSAL',
  'WON',
  'LOST',
  'NURTURE'
);

CREATE TYPE user_role AS ENUM ('admin', 'manager', 'editor');

-- 1. Profiles (extending auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role user_role DEFAULT 'editor'::user_role NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  summary TEXT NOT NULL,
  outcomes JSONB DEFAULT '[]'::jsonb NOT NULL,
  process JSONB DEFAULT '[]'::jsonb NOT NULL,
  metric JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Industries
CREATE TABLE IF NOT EXISTS industries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  blurb TEXT NOT NULL,
  challenges JSONB DEFAULT '[]'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  industry TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  services JSONB DEFAULT '[]'::jsonb NOT NULL,
  metrics JSONB DEFAULT '[]'::jsonb NOT NULL,
  quote JSONB DEFAULT '{}'::jsonb NOT NULL,
  featured_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'published' NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_name TEXT DEFAULT 'RevGen IQ Team' NOT NULL,
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  reading_time_minutes INTEGER DEFAULT 5 NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE NOT NULL,
  is_published BOOLEAN DEFAULT FALSE NOT NULL,
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. Blog Tags
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

-- 8. Blog Post Tags (Junction)
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 9. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  avatar_url TEXT,
  is_featured BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  company TEXT NOT NULL,
  business_email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  service_interest TEXT NOT NULL,
  company_size TEXT,
  message TEXT,
  consent BOOLEAN DEFAULT TRUE NOT NULL,
  status lead_status DEFAULT 'NEW'::lead_status NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- Attribution tracking fields
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  landing_page TEXT,
  referrer TEXT,
  page_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. Lead Activities
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 12. Lead Notes
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  linkedin_url TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL
);

-- 14. Media Assets
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 15. FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general' NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL
);

-- 16. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB DEFAULT '{}'::jsonb NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 17. Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 18. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- ========================================================
-- INDEXES FOR HIGH PERFORMANCE
-- ========================================================
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;

-- Public READ for marketing content
CREATE POLICY "Public services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Public industries are viewable by everyone" ON industries FOR SELECT USING (true);
CREATE POLICY "Published case studies viewable by everyone" ON case_studies FOR SELECT USING (status = 'published');
CREATE POLICY "Published blog posts viewable by everyone" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Blog categories viewable by everyone" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Testimonials viewable by everyone" ON testimonials FOR SELECT USING (true);

-- Lead capture: Anyone can insert a new lead
CREATE POLICY "Anyone can submit a lead" ON leads FOR INSERT WITH CHECK (true);

-- Authenticated Admin / Staff Access
CREATE POLICY "Admins full access to leads" ON leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access to lead activities" ON lead_activities FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access to lead notes" ON lead_notes FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access to blog posts" ON blog_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access to case studies" ON case_studies FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access to profiles" ON profiles FOR ALL TO authenticated USING (true);
