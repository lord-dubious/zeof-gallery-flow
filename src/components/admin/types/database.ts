import type { Database } from "@/integrations/supabase/types";

export type Category = Database['public']['Tables']['categories']['Row'] & {
  category_items?: CategoryItem[];
};

export type CategoryItem = Database['public']['Tables']['category_items']['Row'];

export type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
export type CategoryUpdate = Database['public']['Tables']['categories']['Update'];