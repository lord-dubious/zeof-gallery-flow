export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  category_items?: CategoryItem[];
}

export interface CategoryItem {
  id: string;
  category_id: string | null;
  title: string;
  description: string | null;
  image_path: string;
  is_active: boolean | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryFormData {
  title: string;
  slug: string;
  description: string | null;
  display_order: number;
  image?: File;
  image_url?: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  is_active: boolean | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface NavigationItemUpdate {
  title?: string;
  path?: string;
  is_active?: boolean;
  display_order?: number;
}

export interface Image {
  id: string;
  title: string | null;
  description: string | null;
  url: string;
  thumbnail_url: string | null;
  user_id: string | null;
  is_published: boolean | null;
  metadata: any | null;
  created_at: string;
  updated_at: string;
}

export interface ImageUpdate {
  title?: string;
  description?: string;
  is_published?: boolean;
  metadata?: any;
}