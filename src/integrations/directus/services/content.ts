
import { directusClient } from '../client';

export const contentService = {
  async getContent(page: string, section?: string): Promise<any[]> {
    try {
      const params: Record<string, any> = {
        filter: {
          page: {
            _eq: page,
          },
        },
      };

      if (section) {
        params.filter.section = {
          _eq: section,
        };
      }

      const response = await directusClient.get('/items/site_content', { params });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching content from Directus:', error);
      return [];
    }
  },

  async updateContent(id: string, data: any): Promise<any> {
    const response = await directusClient.patch(`/items/site_content/${id}`, data);
    return response.data.data;
  },
};
