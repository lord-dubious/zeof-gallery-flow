
import { supabase } from "@/integrations/supabase/client";
import { 
  NavigationItem, 
  SiteContent, 
  Category, 
  CategoryItem, 
  Image 
} from "@/components/admin/types";

export const db = {
  // Navigation methods
  navigation: {
    async getAll(): Promise<NavigationItem[]> {
      try {
        const { data, error } = await supabase
          .from("categories") // Use existing tables as fallback
          .select("*")
          .order("display_order", { ascending: true });
          
        if (error) throw error;

        // Map the categories to navigation items as a fallback
        return data.map((cat: any) => ({
          id: cat.id,
          title: cat.title,
          path: `/category/${cat.slug}`,
          display_order: cat.display_order,
          is_active: cat.is_active,
          is_external: false,
          created_at: cat.created_at,
          updated_at: cat.updated_at
        }));
      } catch (error) {
        console.error("Error fetching navigation items:", error);
        return [];
      }
    },
    
    async create(item: Omit<NavigationItem, 'id' | 'created_at' | 'updated_at'>): Promise<NavigationItem | null> {
      try {
        // Simulate creating a navigation item by creating a category
        const { data, error } = await supabase
          .from("categories")
          .insert([{
            title: item.title,
            slug: item.title.toLowerCase().replace(/\s+/g, '-'),
            display_order: item.display_order,
            is_active: item.is_active,
            description: `Navigation item: ${item.path}`
          }])
          .select();
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          return {
            id: data[0].id,
            title: data[0].title,
            path: item.path,
            display_order: data[0].display_order,
            is_active: data[0].is_active,
            is_external: item.is_external,
            created_at: data[0].created_at,
            updated_at: data[0].updated_at
          };
        }
        return null;
      } catch (error) {
        console.error("Error creating navigation item:", error);
        return null;
      }
    },
    
    async update(id: string, updates: Partial<NavigationItem>): Promise<boolean> {
      try {
        // Simulate updating a navigation item by updating a category
        const { error } = await supabase
          .from("categories")
          .update({
            title: updates.title,
            display_order: updates.display_order,
            is_active: updates.is_active
          })
          .eq("id", id);
          
        if (error) throw error;
        return true;
      } catch (error) {
        console.error("Error updating navigation item:", error);
        return false;
      }
    },
    
    async delete(id: string): Promise<boolean> {
      try {
        // Delete from categories
        const { error } = await supabase
          .from("categories")
          .delete()
          .eq("id", id);
          
        if (error) throw error;
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
        // Use images table as a temporary content storage
        const query = supabase
          .from("images")
          .select("*");
          
        if (section) {
          query.eq("image_role", `${page}/${section}`);
        } else {
          query.like("image_role", `${page}/%`);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Map the images to content items as a fallback
        return data.map((image: any) => {
          // Parse section from image_role
          const [imagePage, imageSection] = (image.image_role || "/").split("/");
          
          return {
            id: image.id,
            page: imagePage || page,
            section: imageSection || "content",
            title: image.title,
            description: image.description,
            image_url: image.url,
            content: image.metadata || {},
            created_at: image.created_at,
            updated_at: image.updated_at
          };
        });
      } catch (error) {
        console.error("Error fetching content:", error);
        return [];
      }
    },
    
    async update(id: string, updates: Partial<SiteContent>): Promise<boolean> {
      try {
        // Update in images table
        const { error } = await supabase
          .from("images")
          .update({
            title: updates.title,
            description: updates.description,
            url: updates.image_url,
            metadata: updates.content
          })
          .eq("id", id);
          
        if (error) throw error;
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
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("display_order", { ascending: true });
          
        if (error) throw error;
        
        return data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    },
    
    async create(category: CategoryInsert): Promise<Category | null> {
      try {
        const { data, error } = await supabase
          .from("categories")
          .insert([category])
          .select();
          
        if (error) throw error;
        
        return data && data.length > 0 ? data[0] : null;
      } catch (error) {
        console.error("Error creating category:", error);
        return null;
      }
    },
    
    async update(id: string, updates: Partial<Category>): Promise<boolean> {
      try {
        const { error } = await supabase
          .from("categories")
          .update(updates)
          .eq("id", id);
          
        if (error) throw error;
        return true;
      } catch (error) {
        console.error("Error updating category:", error);
        return false;
      }
    },
    
    async delete(id: string): Promise<boolean> {
      try {
        const { error } = await supabase
          .from("categories")
          .delete()
          .eq("id", id);
          
        if (error) throw error;
        return true;
      } catch (error) {
        console.error("Error deleting category:", error);
        return false;
      }
    }
  }
};
