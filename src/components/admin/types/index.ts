
import type { Database } from "@/integrations/supabase/types";

export type SiteContent = Database['public']['Tables']['site_content']['Row'];
export type SiteContentInsert = Database['public']['Tables']['site_content']['Insert'];
export type SiteContentUpdate = Database['public']['Tables']['site_content']['Update'];

export type Category = Database['public']['Tables']['categories']['Row'] & {
  category_items?: CategoryItem[];
};

export type CategoryItem = Database['public']['Tables']['category_items']['Row'];

export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type CategoryUpdate = Database['public']['Tables']['categories']['Update'];

// Add types for navigation items
export type NavigationItem = Database['public']['Tables']['navigation_items']['Row'];
export type NavigationItemInsert = Database['public']['Tables']['navigation_items']['Insert'];
export type NavigationItemUpdate = Database['public']['Tables']['navigation_items']['Update'];
