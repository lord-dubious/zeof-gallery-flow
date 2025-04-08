
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { strapi } from '@/integrations/strapi/client';
import { fetchNavigation, fetchSiteContent } from '@/services/content';
import type { NavigationItem } from '@/components/admin/types/index';

// Local storage keys for development mode
const STORAGE_KEYS = {
  NAVIGATION: 'local_navigation_items',
  CONTENT: 'local_site_content'
};

// Helper to determine if we should use local storage (dev mode)
const useLocalStorage = () => {
  // You can toggle this based on environment or user preference
  return import.meta.env.DEV && localStorage.getItem('use_local_storage') === 'true';
};

export function useNavigation() {
  const queryClient = useQueryClient();
  const useLocal = useLocalStorage();
  
  // Fetch navigation items
  const { data: navigationItems, isLoading } = useQuery({
    queryKey: ['navigation'],
    queryFn: fetchNavigation
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Omit<NavigationItem, 'id' | 'created_at' | 'updated_at'>) => {
      // Try to create in Strapi first
      try {
        await strapi.create('navigation-items', {
          data: {
            title: data.title,
            path: data.path,
            display_order: data.display_order,
            is_active: data.is_active,
            is_external: data.is_external
          }
        });
        return;
      } catch (strapiError) {
        console.error("Error creating in Strapi, falling back:", strapiError);
      }
      
      if (useLocal) {
        // Store in localStorage
        const items = JSON.parse(localStorage.getItem(STORAGE_KEYS.NAVIGATION) || '[]');
        const newItem = {
          ...data,
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        items.push(newItem);
        localStorage.setItem(STORAGE_KEYS.NAVIGATION, JSON.stringify(items));
        return newItem;
      }
      
      // Fallback to Supabase
      const { error } = await supabase
        .from('navigation_items')
        .insert([{ 
          title: data.title, 
          path: data.path, 
          display_order: data.display_order,
          is_active: data.is_active,
          is_external: data.is_external
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation'] });
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NavigationItem> }) => {
      // Try Strapi first
      try {
        await strapi.update('navigation-items', id, {
          data
        });
        return;
      } catch (strapiError) {
        console.error("Error updating in Strapi, falling back:", strapiError);
      }
      
      if (useLocal) {
        // Update in localStorage
        const items = JSON.parse(localStorage.getItem(STORAGE_KEYS.NAVIGATION) || '[]');
        const updatedItems = items.map((item: NavigationItem) => 
          item.id === id ? { ...item, ...data, updated_at: new Date().toISOString() } : item
        );
        localStorage.setItem(STORAGE_KEYS.NAVIGATION, JSON.stringify(updatedItems));
        return;
      }
      
      // Fallback to Supabase
      const { error } = await supabase
        .from('navigation_items')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation'] });
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Try Strapi first
      try {
        await strapi.delete('navigation-items', id);
        return;
      } catch (strapiError) {
        console.error("Error deleting from Strapi, falling back:", strapiError);
      }
      
      if (useLocal) {
        // Delete from localStorage
        const items = JSON.parse(localStorage.getItem(STORAGE_KEYS.NAVIGATION) || '[]');
        const filteredItems = items.filter((item: NavigationItem) => item.id !== id);
        localStorage.setItem(STORAGE_KEYS.NAVIGATION, JSON.stringify(filteredItems));
        return;
      }
      
      // Fallback to Supabase
      const { error } = await supabase
        .from('navigation_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation'] });
    }
  });

  return {
    navigationItems,
    isLoading,
    createItem: createMutation.mutate,
    updateItem: updateMutation.mutate,
    deleteItem: deleteMutation.mutate,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
}

export function useContent(page: string, section?: string) {
  const queryClient = useQueryClient();
  const useLocal = useLocalStorage();
  
  const { data: content, isLoading } = useQuery({
    queryKey: ['site-content', page, section],
    queryFn: async () => fetchSiteContent(page, section)
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      // Try Strapi first
      try {
        // Handle image upload if it's included
        let imageId = null;
        if (data.image && data.image instanceof File) {
          const formData = new FormData();
          formData.append('files', data.image);
          const uploadRes = await strapi.axios.post('/upload', formData);
          if (uploadRes.data && uploadRes.data[0]) {
            imageId = uploadRes.data[0].id;
          }
          delete data.image;
        }
        
        await strapi.update('site-contents', id, {
          data: {
            ...data,
            ...(imageId ? { image: imageId } : {})
          }
        });
        return;
      } catch (strapiError) {
        console.error("Error updating content in Strapi, falling back:", strapiError);
      }
      
      if (useLocal) {
        // Update in localStorage
        const allContent = JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTENT) || '[]');
        const updatedContent = allContent.map((item: any) => 
          item.id === id ? { ...item, ...data, updated_at: new Date().toISOString() } : item
        );
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(updatedContent));
        return;
      }
      
      // Fallback to Supabase
      const { error } = await supabase
        .from('site_content')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content', page, section] });
    }
  });

  return {
    content,
    isLoading,
    updateContent: updateMutation.mutate,
    isPending: updateMutation.isPending
  };
}

