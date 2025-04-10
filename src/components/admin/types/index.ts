
// Basic types for navigation, content, and categories
export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  display_order: number;
  is_active: boolean;
  is_external: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: any;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  display_order: number;
  image_url?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryItem {
  id: string;
  category_id: string;
  title: string;
  description?: string | null;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Image {
  id: string;
  title?: string | null;
  description?: string | null;
  url: string;
  thumbnail_url?: string | null;
  is_published?: boolean | null;
  image_role?: string | null;
  metadata?: any | null;
  created_at?: string;
  updated_at?: string;
}

// Form data interfaces
export interface CategoryFormData {
  title: string;
  slug: string;
  description?: string | null;
  display_order: number;
  image?: File;
  image_url?: string | null;
  is_active?: boolean;
}

export interface ImageFormData {
  title?: string | null;
  description?: string | null;
  image?: File;
  url?: string;
  image_role?: string | null;
  is_published?: boolean;
}
