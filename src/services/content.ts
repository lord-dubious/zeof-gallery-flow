
// Static content types
export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  display_order: number;
  is_active: boolean;
  is_external: boolean;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  display_order: number;
  image_url: string | null;
  is_active: boolean;
}

export interface Image {
  id: string;
  url: string;
  magazine_title?: string;
  description?: string;
  category?: string;
  image_role?: string;
}

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  title: string;
  subtitle?: string;
  description: string;
  image_url?: string;
  content?: any;
}

// Static data
const navigationItems: NavigationItem[] = [
  {
    id: '1',
    title: 'Home',
    path: '/',
    display_order: 1,
    is_active: true,
    is_external: false
  },
  {
    id: '2',
    title: 'Gallery',
    path: '/gallery',
    display_order: 2,
    is_active: true,
    is_external: false
  },
  {
    id: '3',
    title: 'About',
    path: '/about',
    display_order: 3,
    is_active: true,
    is_external: false
  },
  {
    id: '4',
    title: 'Contact',
    path: '/contact',
    display_order: 4,
    is_active: true,
    is_external: false
  }
];

const siteContent: SiteContent[] = [
  {
    id: '1',
    page: 'home',
    section: 'hero',
    title: 'Welcome to Our Studio',
    subtitle: 'Creative Excellence',
    description: 'Where timeless craftsmanship meets contemporary sophistication',
    image_url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574',
    content: {
      overlayColor: '#000000',
      overlayOpacity: 0.6,
      imagePosition: { x: 50, y: 50 },
      heroText: {
        heading: 'The Art of Refined Elegance',
        subheading: 'Where timeless craftsmanship meets contemporary sophistication',
        buttonText: 'Explore Collection',
        buttonUrl: '/gallery'
      }
    }
  },
  {
    id: '2',
    page: 'home',
    section: 'featured',
    title: 'Masterpieces of Craftsmanship',
    description: 'Discover our curated collections, where each piece embodies the pinnacle of sartorial excellence',
    image_url: null,
    content: {}
  },
  {
    id: '3',
    page: 'home',
    section: 'shop',
    title: 'Discover Our Atelier',
    description: 'Experience the epitome of bespoke craftsmanship',
    image_url: 'https://images.unsplash.com/photo-1594938328870-9623159c8c99',
    content: {}
  },
  {
    id: '4',
    page: 'about',
    section: 'hero',
    title: 'Our Story',
    description: 'A legacy of excellence and innovation',
    image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671',
    content: {
      overlayColor: '#000000',
      overlayOpacity: 0.6,
      heroText: {
        heading: 'Crafting Excellence Since 1985',
        subheading: 'Our journey of passion and precision',
        buttonText: 'Learn More',
        buttonUrl: '/contact'
      }
    }
  }
];

const categories: Category[] = [
  {
    id: '1',
    title: 'Suits',
    slug: 'suits',
    description: 'Bespoke tailoring for the modern gentleman',
    display_order: 1,
    image_url: 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?q=80&w=2680',
    is_active: true
  },
  {
    id: '2',
    title: 'Evening Wear',
    slug: 'evening-wear',
    description: 'Sophisticated attire for special occasions',
    display_order: 2,
    image_url: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=2680',
    is_active: true
  },
  {
    id: '3',
    title: 'Accessories',
    slug: 'accessories',
    description: 'The finishing touches for your ensemble',
    display_order: 3,
    image_url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2657',
    is_active: true
  }
];

const images: Image[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?q=80&w=2680',
    magazine_title: 'Summer Collection',
    description: 'Featuring our new linen suits',
    category: 'suits',
    image_role: 'suits_collection'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=2680',
    magazine_title: 'Gala Evening',
    description: 'Sophisticated tuxedos for special occasions',
    category: 'evening',
    image_role: 'evening_collection'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2657',
    magazine_title: 'Fine Details',
    description: 'Handcrafted accessories for the perfect finish',
    category: 'accessories',
    image_role: 'accessories_collection'
  }
];

// Function to get static data
export async function fetchNavigation(): Promise<NavigationItem[]> {
  return Promise.resolve(navigationItems);
}

export async function fetchSiteContent(page: string, section?: string): Promise<SiteContent[]> {
  let filteredContent = siteContent;
  
  if (page) {
    filteredContent = filteredContent.filter(item => item.page === page);
  }
  
  if (section) {
    filteredContent = filteredContent.filter(item => item.section === section);
  }
  
  return Promise.resolve(filteredContent);
}

export async function fetchCategories(): Promise<Category[]> {
  return Promise.resolve(categories);
}

export async function fetchImages(): Promise<Image[]> {
  return Promise.resolve(images);
}
