
import type { Database } from "@/integrations/supabase/types";
import { Json } from "@/integrations/supabase/types";

// Base types from the database
export type SiteContent = {
  id: string;
  created_at: string;
  updated_at: string;
  content: Record<string, any>; // Changed from Json to Record<string, any>
  page: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
};
export type SiteContentInsert = Omit<SiteContent, 'id' | 'created_at' | 'updated_at'>;
export type SiteContentUpdate = Partial<SiteContentInsert>;

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

// Add CategoryFormProps interface with onCancel property
export interface CategoryFormProps {
  initialData?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

// Add a type that combines Category with the category_items relationship
export interface CategoryWithItems extends Category {
  category_items?: CategoryItem[];
}
