export interface DirectoryListing {
  id: string;
  business_name: string;
  category: string;
  city: string;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  facebook_url: string | null;
  website_url: string | null;
  google_maps_url: string | null;
  english_speaking: boolean;
  verified: boolean;
  featured: boolean;
  description: string | null;
  notes: string | null;
  is_affiliate: boolean;
  country_code: string;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  country_code: string | null;
  category: string | null;
  published: boolean;
  created_at: string;
}

export interface AffiliateLink {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  country: string | null;
  active: boolean;
  featured: boolean;
  disclosure_text: string | null;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  country: string | null;
  need_help_with: string | null;
  created_at: string;
}

// ============================================================
// Affiliate System Types
// ============================================================

export type AffiliateStatus = "pending" | "applied" | "approved" | "rejected" | "paused";
export type ApplicationStatus =
  | "not_applied"
  | "applied"
  | "approved"
  | "rejected"
  | "needs_follow_up";

export interface AffiliateCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface AffiliatePartner {
  id: string;
  category_id: string | null;
  company_name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  why_it_fits: string | null;
  typical_potential: string | null;
  official_website_url: string | null;
  affiliate_url: string | null;
  placeholder_url: string;
  affiliate_status: AffiliateStatus;
  cta_label: string;
  logo_url: string | null;
  country_focus: string;
  priority: number;
  featured: boolean;
  active: boolean;
  show_on_homepage: boolean;
  show_disclosure: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  affiliate_categories?: AffiliateCategory | null;
}

export interface AffiliateClick {
  id: string;
  partner_id: string | null;
  partner_slug: string | null;
  page_path: string | null;
  referrer: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  clicked_at: string;
}

export interface AffiliateApplication {
  id: string;
  partner_id: string | null;
  company_name: string | null;
  application_url: string | null;
  login_url: string | null;
  username_used: string | null;
  status: ApplicationStatus;
  commission_notes: string | null;
  approval_notes: string | null;
  date_applied: string | null;
  date_approved: string | null;
  follow_up_date: string | null;
  created_at: string;
  updated_at: string;
  affiliate_partners?: Pick<AffiliatePartner, "company_name" | "slug"> | null;
}
