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