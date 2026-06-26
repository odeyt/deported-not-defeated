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
