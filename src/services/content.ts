
import { strapi } from '@/integrations/strapi/client';
import { supabase } from '@/integrations/supabase/client';
import type { NavigationItem } from '@/components/admin/types';

const useLocalStorage = () => {
  return localStorage.getItem('use_local_storage') === 'true';
};

export async function fetchNavigation(): Promise<NavigationItem[]> {
  try {
    // Try to fetch from Strapi first
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
  } catch (strapiError) {
    console.error("Error fetching from Strapi, falling back to Supabase/local:", strapiError);
  }
  
  // Fallback to local storage or Supabase
  if (useLocalStorage()) {
    const storedItems = localStorage.getItem('local_navigation_items');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  
  // Final fallback to Supabase
  const { data, error } = await supabase
    .from('navigation_items')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export async function fetchSiteContent(page: string, section?: string) {
  try {
    // Try Strapi first
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
  } catch (strapiError) {
    console.error("Error fetching content from Strapi, falling back:", strapiError);
  }
  
  // Fallback to local storage
  if (useLocalStorage()) {
    const storedContent = localStorage.getItem('local_site_content');
    if (storedContent) {
      const content = JSON.parse(storedContent);
      return content.filter((item: any) => 
        item.page === page && (!section || item.section === section)
      );
    }
  }
  
  // Final fallback to Supabase
  let query = supabase
    .from('site_content')
    .select('*')
    .eq('page', page);
    
  if (section) {
    query = query.eq('section', section);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
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
  } catch (strapiError) {
    console.error("Error fetching categories from Strapi, falling back:", strapiError);
  }
  
  // Fallback to Supabase
  const { data, error } = await supabase
    .from('categories')
    .select('*, category_items(*)')
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data || [];
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
  } catch (strapiError) {
    console.error("Error fetching images from Strapi, falling back:", strapiError);
  }
  
  // Fallback to Supabase
  const { data, error } = await supabase
    .from('images')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

