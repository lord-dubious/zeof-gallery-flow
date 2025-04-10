
import { 
  NavigationItem, 
  SiteContent, 
  Category, 
  CategoryItem, 
  Image,
  CategoryFormData 
} from "@/components/admin/types";

// Helper to generate UUIDs
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Helper to get current ISO datetime
const now = (): string => new Date().toISOString();

// Local storage keys
const STORAGE_KEYS = {
  NAVIGATION: "local_navigation_items",
  CONTENT: "local_site_content",
  CATEGORIES: "local_categories",
  IMAGES: "local_images"
};

export const db = {
  // Navigation methods
  navigation: {
    async getAll(): Promise<NavigationItem[]> {
      try {
        const items = localStorage.getItem(STORAGE_KEYS.NAVIGATION);
        return items ? JSON.parse(items) : [];
      } catch (error) {
        console.error("Error fetching navigation items:", error);
        return [];
      }
    },
    
    async create(item: Omit<NavigationItem, 'id' | 'created_at' | 'updated_at'>): Promise<NavigationItem | null> {
      try {
        const items = await this.getAll();
        const newItem = {
          ...item,
          id: generateId(),
          created_at: now(),
          updated_at: now()
        };
        
        items.push(newItem);
        localStorage.setItem(STORAGE_KEYS.NAVIGATION, JSON.stringify(items));
        return newItem;
      } catch (error) {
        console.error("Error creating navigation item:", error);
        return null;
      }
    },
    
    async update(id: string, updates: Partial<NavigationItem>): Promise<boolean> {
      try {
        const items = await this.getAll();
        const updatedItems = items.map(item => 
          item.id === id ? { ...item, ...updates, updated_at: now() } : item
        );
        localStorage.setItem(STORAGE_KEYS.NAVIGATION, JSON.stringify(updatedItems));
        return true;
      } catch (error) {
        console.error("Error updating navigation item:", error);
        return false;
      }
    },
    
    async delete(id: string): Promise<boolean> {
      try {
        const items = await this.getAll();
        const filteredItems = items.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEYS.NAVIGATION, JSON.stringify(filteredItems));
        return true;
      } catch (error) {
        console.error("Error deleting navigation item:", error);
        return false;
      }
    }
  },
  
  // Site content methods
  content: {
    async getByPage(page: string, section?: string): Promise<SiteContent[]> {
      try {
        const contents = localStorage.getItem(STORAGE_KEYS.CONTENT);
        const allContent: SiteContent[] = contents ? JSON.parse(contents) : [];
        
        return allContent.filter(item => {
          if (section) {
            return item.page === page && item.section === section;
          }
          return item.page === page;
        });
      } catch (error) {
        console.error("Error fetching content:", error);
        return [];
      }
    },
    
    async update(id: string, updates: Partial<SiteContent>): Promise<boolean> {
      try {
        const contents = localStorage.getItem(STORAGE_KEYS.CONTENT);
        const allContent: SiteContent[] = contents ? JSON.parse(contents) : [];
        
        const updatedContent = allContent.map(item => 
          item.id === id ? { ...item, ...updates, updated_at: now() } : item
        );
        
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(updatedContent));
        return true;
      } catch (error) {
        console.error("Error updating content:", error);
        return false;
      }
    }
  },
  
  // Categories methods
  categories: {
    async getAll(): Promise<Category[]> {
      try {
        const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        return categories ? JSON.parse(categories) : [];
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    },
    
    async create(category: CategoryFormData): Promise<Category | null> {
      try {
        const categories = await this.getAll();
        const newCategory: Category = {
          ...category,
          id: generateId(),
          is_active: category.is_active ?? true,
          created_at: now(),
          updated_at: now()
        };
        
        categories.push(newCategory);
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
        return newCategory;
      } catch (error) {
        console.error("Error creating category:", error);
        return null;
      }
    },
    
    async update(id: string, updates: Partial<Category>): Promise<boolean> {
      try {
        const categories = await this.getAll();
        const updatedCategories = categories.map(cat => 
          cat.id === id ? { ...cat, ...updates, updated_at: now() } : cat
        );
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updatedCategories));
        return true;
      } catch (error) {
        console.error("Error updating category:", error);
        return false;
      }
    },
    
    async delete(id: string): Promise<boolean> {
      try {
        const categories = await this.getAll();
        const filteredCategories = categories.filter(cat => cat.id !== id);
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filteredCategories));
        return true;
      } catch (error) {
        console.error("Error deleting category:", error);
        return false;
      }
    }
  },
  
  // Images methods
  images: {
    async getAll(): Promise<Image[]> {
      try {
        const images = localStorage.getItem(STORAGE_KEYS.IMAGES);
        return images ? JSON.parse(images) : [];
      } catch (error) {
        console.error("Error fetching images:", error);
        return [];
      }
    },
    
    async create(image: Omit<Image, 'id' | 'created_at' | 'updated_at'>): Promise<Image | null> {
      try {
        const images = await this.getAll();
        const newImage: Image = {
          ...image,
          id: generateId(),
          created_at: now(),
          updated_at: now()
        };
        
        images.push(newImage);
        localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
        return newImage;
      } catch (error) {
        console.error("Error creating image:", error);
        return null;
      }
    },
    
    async update(id: string, updates: Partial<Image>): Promise<boolean> {
      try {
        const images = await this.getAll();
        const updatedImages = images.map(img => 
          img.id === id ? { ...img, ...updates, updated_at: now() } : img
        );
        localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(updatedImages));
        return true;
      } catch (error) {
        console.error("Error updating image:", error);
        return false;
      }
    },
    
    async delete(id: string): Promise<boolean> {
      try {
        const images = await this.getAll();
        const filteredImages = images.filter(img => img.id !== id);
        localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(filteredImages));
        return true;
      } catch (error) {
        console.error("Error deleting image:", error);
        return false;
      }
    }
  }
};
