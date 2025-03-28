
import { ghostApi } from "../client";

export const contentService = {
  getContent: async (page: string, section?: string) => {
    try {
      // In a real implementation, you might use Ghost's tags or custom fields
      // to identify content for specific sections
      let filter = `tag:${page}`;
      if (section) {
        filter += `+tag:${section}`;
      }

      const posts = await ghostApi.posts.browse({
        filter,
        limit: 'all',
        include: ['tags']
      });

      return posts.map(post => ({
        id: post.id,
        title: post.title,
        description: post.excerpt,
        image_url: post.feature_image || '',
        page: page,
        section: section || 'default',
        content: JSON.parse(post.custom_excerpt || '{}'), // Use custom_excerpt to store JSON content
        created_at: post.created_at,
        updated_at: post.updated_at
      }));
    } catch (error) {
      console.error('Error fetching content from Ghost:', error);
      throw error;
    }
  },

  updateContent: async (id: string, data: any) => {
    console.log(`Updating content ${id} in Ghost (mock):`, data);
    // In a real implementation, this would update a post in Ghost
    // using the Admin API (which requires more permissions)
  }
};
