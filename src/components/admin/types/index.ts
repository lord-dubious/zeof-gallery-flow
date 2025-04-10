
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
  image_url?: string;
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
  is_active: boolean | null;
  created_at?: string;
  updated_at?: string;
  category_items?: CategoryItem[];
}

export interface CategoryItem {
  id: string;
  title: string;
  description?: string | null;
  price?: number;
  image_url?: string;
  is_featured: boolean;
  category_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface Image {
  id: string;
  title?: string;
  description?: string;
  url: string;
  thumbnail_url?: string;
  is_published?: boolean;
  image_role?: string;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
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

export type CategoryInsert = Omit<Category, 'id' | 'created_at' | 'updated_at' | 'category_items'>;
export type CategoryUpdate = Partial<CategoryInsert>;
