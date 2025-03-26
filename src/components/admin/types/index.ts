export * from './database';
export * from './forms';
export * from './images';

export interface NavigationItem {
  created_at?: string;
  display_order: number;
  id?: string;
  is_active?: boolean;
  path: string;
  title: string;
  updated_at?: string;
  is_external?: boolean; // Added this field to match how it's used in NavigationManager
}
