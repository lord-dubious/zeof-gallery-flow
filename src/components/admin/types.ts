
// We'll drop the Supabase types since we're using PGLite now
export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  display_order: number;
  is_active: boolean;
  is_external?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  display_order: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category_items?: CategoryItem[];
}

export interface CategoryItem {
  id: string;
  title: string;
  description: string | null;
  image_path: string;
  display_order: number;
  is_active: boolean;
  category_id: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryFormData {
  title: string;
  slug: string;
  description?: string | null;
  display_order: number;
  image?: File;
  image_url?: string | null;
  is_active?: boolean;
}

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  image_url?: string | null;
  content?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: string;
  url: string;
  thumbnail_url?: string | null;
  title?: string | null;
  description?: string | null;
  magazine_title?: string | null;
  image_role?: string | null;
  is_published?: boolean;
  metadata?: Record<string, any>;
  user_id?: string | null;
  created_at: string;
  updated_at: string;
}
