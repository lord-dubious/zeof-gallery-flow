
import { Json } from '@/integrations/supabase/types';

export interface Image {
  created_at: string;
  description: string;
  id: string;
  image_role: string;
  is_published: boolean;
  magazine_title: string;
  metadata: Json;
  thumbnail_url: string;
  title: string;
  updated_at: string;
  url: string;
  user_id: string;
  category?: string; // Added this field to match how it's used in ImagesManager
}
