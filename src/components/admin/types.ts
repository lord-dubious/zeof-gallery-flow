
import type { Database } from "@/integrations/supabase/types";

// Base types from the database
export type SiteContent = Database['public']['Tables']['site_content']['Row'];
export type SiteContentInsert = Database['public']['Tables']['site_content']['Insert'];
export type SiteContentUpdate = Database['public']['Tables']['site_content']['Update'];

// Define Category type without relying on category_items from Database type
export type Category = Database['public']['Tables']['categories']['Row'];
export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type CategoryUpdate = Database['public']['Tables']['categories']['Update'];

// Define CategoryItem type manually since it doesn't exist in the Database type
export type CategoryItem = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string | null;
  image_path: string;
  display_order: number;
  is_active: boolean | null;
  category_id: string | null;
};

export type CategoryItemInsert = Omit<CategoryItem, 'id' | 'created_at' | 'updated_at'>;
export type CategoryItemUpdate = Partial<CategoryItemInsert>;

// Define NavigationItem types manually
export type NavigationItem = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  path: string;
  display_order: number;
  is_active: boolean;
};

export type NavigationItemInsert = Omit<NavigationItem, 'id' | 'created_at' | 'updated_at'>;
export type NavigationItemUpdate = Partial<NavigationItemInsert>;

// Interface for form data
export interface CategoryFormData {
  title: string;
  slug: string;
  description?: string | null;
  display_order: number;
  image?: File;
  image_url?: string;
  is_active?: boolean;
}

// Add a type that combines Category with the category_items relationship
export interface CategoryWithItems extends Category {
  category_items?: CategoryItem[];
}
