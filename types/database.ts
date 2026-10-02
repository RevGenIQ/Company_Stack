export type LeadStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'QUALIFIED' 
  | 'MEETING_BOOKED' 
  | 'PROPOSAL' 
  | 'WON' 
  | 'LOST' 
  | 'NURTURE';

export type UserRole = 'admin' | 'manager' | 'editor';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  summary: string;
  outcomes: string[];
  process: { title: string; body: string }[];
  metric: { value: string; label: string };
  created_at?: string;
  updated_at?: string;
}

export interface IndustryItem {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  challenges: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  services: string[];
  metrics: { value: string; label: string }[];
  quote: { text: string; author: string; role: string };
  featured_image?: string;
  gallery?: string[];
  status: 'draft' | 'published';
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  created_at?: string;
}

export interface BlogTag {
  id: string;
  slug: string;
  name: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown from TipTap
  featured_image?: string;
  author_name: string;
  category_id?: string;
  category?: BlogCategory;
  reading_time_minutes: number;
  is_featured: boolean;
  is_published: boolean;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  og_image?: string;
  tags?: BlogTag[];
  created_at?: string;
  updated_at?: string;
}

export interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  role: string;
  company: string;
  avatar_url?: string;
  is_featured: boolean;
  created_at?: string;
}

export interface Lead {
  id: string;
  full_name: string;
  company: string;
  business_email: string;
  phone?: string;
  website?: string;
  service_interest: string;
  company_size?: string;
  message?: string;
  consent: boolean;
  status: LeadStatus;
  owner_id?: string;
  owner?: Profile;

  // Lead Attribution Fields
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
  page_url?: string;

  created_at: string;
  updated_at: string;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  activity_type: string;
  title: string;
  description?: string;
  created_by?: string;
  created_at: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  content: string;
  created_by?: string;
  author?: Profile;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url?: string;
  linkedin_url?: string;
  display_order: number;
}

export interface MediaAsset {
  id: string;
  file_name: string;
  file_url: string;
  mime_type: string;
  file_size: number;
  created_by?: string;
  created_at: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
}
