
import type { Database } from "@/integrations/supabase/types";

// Export the complete type for the images table
export type Image = Database['public']['Tables']['images']['Row'];

// Export types for insert and update operations
export type ImageInsert = Database['public']['Tables']['images']['Insert'];
export type ImageUpdate = Database['public']['Tables']['images']['Update'];
