
import type { Database } from "@/integrations/supabase/types";

// Export the complete type for the images table
export type Image = Database['public']['Tables']['images']['Row'];
