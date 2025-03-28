
export * from './database';
export * from './forms';
export * from './images';

export interface NavigationItem {
  created_at?: string;
  display_order: number;
  id?: string;
  is_active?: boolean;
  is_external?: boolean;
  path: string;
  title: string;
  updated_at?: string;
}
