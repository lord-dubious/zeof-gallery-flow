
import { strapi } from '@/integrations/strapi/client';

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  display_order: number;
  is_active: boolean;
  is_external: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function fetchNavigation(): Promise<NavigationItem[]> {
  try {
    const { data } = await strapi.find('navigation-items', {
      sort: 'display_order:asc',
      populate: '*',
    });
    
    if (data && data.length > 0) {
      return data.map((item: any) => ({
        id: item.id,
        title: item.attributes.title,
        path: item.attributes.path,
        display_order: item.attributes.display_order,
        is_active: item.attributes.is_active,
        is_external: item.attributes.is_external,
        created_at: item.attributes.createdAt,
        updated_at: item.attributes.updatedAt,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching navigation from Strapi:", error);
    return [];
  }
}

export async function fetchSiteContent(page: string, section?: string) {
  try {
    const query = {
      filters: {
        page: { $eq: page },
        ...(section ? { section: { $eq: section } } : {}),
      },
      populate: '*',
    };
    
    const { data } = await strapi.find('site-contents', query);
    
    if (data && data.length > 0) {
      return data.map((item: any) => ({
        id: item.id,
        page: item.attributes.page,
        section: item.attributes.section,
        title: item.attributes.title,
        subtitle: item.attributes.subtitle,
        description: item.attributes.description,
        content: item.attributes.content,
        image_url: item.attributes.image?.data?.attributes?.url 
          ? `${strapi.axios.defaults.baseURL}${item.attributes.image.data.attributes.url}`
          : null,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching content from Strapi:", error);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const { data } = await strapi.find('categories', {
      sort: 'display_order:asc',
      populate: '*',
    });
    
    if (data && data.length > 0) {
      return data.map((item: any) => ({
        id: item.id,
        title: item.attributes.title,
        slug: item.attributes.slug,
        description: item.attributes.description,
        display_order: item.attributes.display_order,
        image_url: item.attributes.image?.data?.attributes?.url 
          ? `${strapi.axios.defaults.baseURL}${item.attributes.image.data.attributes.url}`
          : null,
        is_active: item.attributes.is_active,
        created_at: item.attributes.createdAt,
        updated_at: item.attributes.updatedAt,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories from Strapi:", error);
    return [];
  }
}

export async function fetchImages() {
  try {
    const { data } = await strapi.find('images', {
      populate: '*',
    });
    
    if (data && data.length > 0) {
      return data.map((item: any) => ({
        id: item.id,
        title: item.attributes.title,
        description: item.attributes.description,
        url: item.attributes.image?.data?.attributes?.url 
          ? `${strapi.axios.defaults.baseURL}${item.attributes.image.data.attributes.url}`
          : null,
        thumbnail_url: item.attributes.thumbnail?.data?.attributes?.url 
          ? `${strapi.axios.defaults.baseURL}${item.attributes.thumbnail.data.attributes.url}`
          : null,
        is_published: item.attributes.is_published,
        image_role: item.attributes.image_role,
        metadata: item.attributes.metadata,
        created_at: item.attributes.createdAt,
        updated_at: item.attributes.updatedAt,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching images from Strapi:", error);
    return [];
  }
}
