export interface Image {
  id: string;
  url: string;
  title?: string | null;
  description?: string | null;
  magazine_title?: string | null;
  category_id?: string | null;
  is_published?: boolean | null;
  created_at?: string;
}
