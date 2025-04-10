
// Types for static content
export interface SiteContent {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  section: string;
  page: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  order: number;
  is_active: boolean;
  parent_id?: string | null;
}

// Static content data
const siteContent: SiteContent[] = [
  {
    id: "1",
    title: "Discover Our Atelier",
    description: "Experience the epitome of bespoke craftsmanship",
    image_url: "https://images.unsplash.com/photo-1594938328870-9623159c8c99",
    section: "shop",
    page: "home"
  },
  {
    id: "2",
    title: "Handcrafted Excellence",
    description: "Where tradition meets contemporary design",
    image_url: "https://images.unsplash.com/photo-1589363460779-7c40ddb74aa3",
    section: "featured",
    page: "home"
  },
  {
    id: "3",
    title: "Our Heritage",
    description: "Crafting distinction since 1985",
    image_url: "https://images.unsplash.com/photo-1604644401890-0bd678c83788",
    section: "hero",
    page: "home"
  }
];

// Function to fetch site content
export const fetchSiteContent = async (page: string, section?: string): Promise<SiteContent[]> => {
  // Filter by page and optionally by section
  return siteContent.filter(item => {
    if (section) {
      return item.page === page && item.section === section;
    }
    return item.page === page;
  });
};

// Static navigation data
const navigationItems: NavigationItem[] = [
  {
    id: "1",
    label: "Home",
    url: "/",
    order: 1,
    is_active: true
  },
  {
    id: "2",
    label: "Gallery",
    url: "/gallery",
    order: 2,
    is_active: true
  },
  {
    id: "3",
    label: "About",
    url: "/about",
    order: 3,
    is_active: true
  },
  {
    id: "4",
    label: "Contact",
    url: "/contact",
    order: 4,
    is_active: true
  }
];

// Function to fetch navigation items
export const fetchNavigationItems = async (): Promise<NavigationItem[]> => {
  return navigationItems;
};
