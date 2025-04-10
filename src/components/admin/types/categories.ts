
export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image_url?: string;
  display_order: number;
  is_active?: boolean;
  items?: CategoryItem[];
}

export interface CategoryItem {
  id: string;
  title: string;
  description?: string;
  image_path: string;
}

export interface CategoryFormData {
  title: string;
  slug: string;
  description?: string;
  display_order: number;
  image_url?: string;
  is_active?: boolean;
}
