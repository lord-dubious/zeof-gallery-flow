
import { db } from "./db";

// Define types that are needed
export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  display_order: number;
  is_active: boolean;
  is_external?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  display_order: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: string;
  url: string;
  thumbnail_url?: string;
  title?: string;
  description?: string;
  magazine_title?: string;
  image_role?: string;
  is_published?: boolean;
  metadata?: Record<string, any>;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  content?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Legacy functions that use the db service to maintain compatibility
export async function fetchNavigation(): Promise<NavigationItem[]> {
  try {
    return await db.navigation.getAll();
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return [];
  }
}

export async function fetchSiteContent(page: string, section?: string): Promise<SiteContent[]> {
  try {
    return await db.content.getByPage(page, section);
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    return await db.categories.getAll();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchImages(): Promise<Image[]> {
  try {
    return await db.images.getAll();
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}
