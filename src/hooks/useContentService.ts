
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { navigationService } from '@/integrations/ghost/services/navigation';
import { contentService } from '@/integrations/ghost/services/content';
import { supabase } from '@/integrations/supabase/client';
import type { NavigationItem } from '@/components/admin/types';

export function useNavigation() {
  const queryClient = useQueryClient();
  
  // Fetch navigation items, with fallback to Supabase
  const { data: navigationItems, isLoading } = useQuery({
    queryKey: ['navigation'],
    queryFn: async () => {
      try {
        // Try to get from Ghost first
        const ghostItems = await navigationService.getItems();
        if (ghostItems.length > 0) {
          return ghostItems;
        }
        
        // Fallback to Supabase
        const { data, error } = await supabase
          .from('navigation_items')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (error) throw error;
        return data as NavigationItem[];
      } catch (error) {
        console.error('Error fetching navigation:', error);
        return [];
      }
    }
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Omit<NavigationItem, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        // Try Ghost first
        await navigationService.createItem(data);
      } catch (error) {
        console.error('Error creating in Ghost, falling back to Supabase:', error);
        // Fallback to Supabase
        const { error: supabaseError } = await supabase
          .from('navigation_items')
          .insert([data]);
        if (supabaseError) throw supabaseError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation'] });
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NavigationItem> }) => {
      try {
        // Try Ghost first
        await navigationService.updateItem(id, data);
      } catch (error) {
        console.error('Error updating in Ghost, falling back to Supabase:', error);
        // Fallback to Supabase
        const { error: supabaseError } = await supabase
          .from('navigation_items')
          .update(data)
          .eq('id', id);
        if (supabaseError) throw supabaseError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation'] });
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        // Try Ghost first
        await navigationService.deleteItem(id);
      } catch (error) {
        console.error('Error deleting in Ghost, falling back to Supabase:', error);
        // Fallback to Supabase
        const { error: supabaseError } = await supabase
          .from('navigation_items')
          .delete()
          .eq('id', id);
        if (supabaseError) throw supabaseError;
      }
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
  
  const { data: content, isLoading } = useQuery({
    queryKey: ['site-content', page, section],
    queryFn: async () => {
      try {
        // Try to get from Ghost first
        const ghostContent = await contentService.getContent(page, section);
        if (ghostContent.length > 0) {
          return ghostContent;
        }
        
        // Fallback to Supabase
        let query = supabase
          .from('site_content')
          .select('*')
          .eq('page', page);
          
        if (section) {
          query = query.eq('section', section);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Error fetching content:', error);
        return [];
      }
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      try {
        // Try Ghost first
        await contentService.updateContent(id, data);
      } catch (error) {
        console.error('Error updating in Ghost, falling back to Supabase:', error);
        // Fallback to Supabase
        const { error: supabaseError } = await supabase
          .from('site_content')
          .update(data)
          .eq('id', id);
        if (supabaseError) throw supabaseError;
      }
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
