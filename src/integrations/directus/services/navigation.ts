
import { directusClient } from '../client';
import type { NavigationItem } from '@/components/admin/types';

export const navigationService = {
  async getItems(): Promise<NavigationItem[]> {
    try {
      // If using Directus, this would fetch from a collection
      const response = await directusClient.get('/items/navigation_items', {
        params: {
          sort: 'display_order',
        },
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching navigation items from Directus:', error);
      // Fallback to Supabase if Directus fetch fails
      return [];
    }
  },

  async createItem(item: Omit<NavigationItem, 'id' | 'created_at' | 'updated_at'>): Promise<NavigationItem> {
    const response = await directusClient.post('/items/navigation_items', item);
    return response.data.data;
  },

  async updateItem(id: string, item: Partial<NavigationItem>): Promise<NavigationItem> {
    const response = await directusClient.patch(`/items/navigation_items/${id}`, item);
    return response.data.data;
  },

  async deleteItem(id: string): Promise<void> {
    await directusClient.delete(`/items/navigation_items/${id}`);
  },
};
