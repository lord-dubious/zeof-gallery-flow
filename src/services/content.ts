
import { db } from "./db";
import { NavigationItem, Category, Image, SiteContent } from "@/components/admin/types";

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
