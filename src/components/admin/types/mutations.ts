import { Database } from "@/integrations/supabase/types";

export type CategoryMutationFn = (data: Database['public']['Tables']['categories']['Insert']) => void;
export type CategoryUpdateFn = (id: string, data: Database['public']['Tables']['categories']['Update']) => void;
export type CategoryDeleteFn = (id: string) => void;

export type ImageMutationFn = (data: Database['public']['Tables']['images']['Insert']) => void;
export type ImageUpdateFn = (id: string, data: Database['public']['Tables']['images']['Update']) => void;
export type ImageDeleteFn = (id: string) => void;

export type NavigationMutationFn = (data: Database['public']['Tables']['navigation_items']['Insert']) => void;
export type NavigationUpdateFn = (id: string, data: Database['public']['Tables']['navigation_items']['Update']) => void;
export type NavigationDeleteFn = (id: string) => void;