
import { mockProducts } from '../hooks/use-products';

// This would typically connect to a real backend API
export const getProducts = async (query = {}) => {
  const { category, page = 1, limit = 20, sort, search } = query;
  
  let filteredProducts = [...mockProducts];
  
  // Filter by category if provided
  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  // Filter by search term if provided
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Calculate price range for filtering
  if (query.price_range) {
    const [min, max] = query.price_range.split('-').map(v => parseInt(v, 10));
    filteredProducts = filteredProducts.filter(product => {
      if (!max) return product.price >= min; // "1000-" case
      if (!min) return product.price <= max; // "0-200" case
      return product.price >= min && product.price <= max;
    });
  }
  
  // Sort products
  if (sort) {
    switch (sort) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming we'd have a date field, for mock we'll just reverse
        filteredProducts.reverse();
        break;
      default:
        // No sort
        break;
    }
  }
  
  // Simulate pagination
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);
  
  // Add facets data for filters
  const facets = {
    category: {
      suits: mockProducts.filter(p => p.category === 'suits').length,
      shirts: mockProducts.filter(p => p.category === 'shirts').length,
      knitwear: mockProducts.filter(p => p.category === 'knitwear').length,
      footwear: mockProducts.filter(p => p.category === 'footwear').length,
      accessories: mockProducts.filter(p => p.category === 'accessories').length,
    },
    price_range: {
      '0-200': mockProducts.filter(p => p.price <= 200).length,
      '200-500': mockProducts.filter(p => p.price > 200 && p.price <= 500).length,
      '500-1000': mockProducts.filter(p => p.price > 500 && p.price <= 1000).length,
      '1000-': mockProducts.filter(p => p.price > 1000).length,
    }
  };
  
  // Format for React Storefront
  return {
    products: paginatedProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images.map(image => ({
        src: image,
        alt: product.name
      })),
      thumbnail: {
        src: product.images[0],
        alt: product.name
      },
      category: product.category
    })),
    page: {
      total: filteredProducts.length,
      current: page,
      size: limit
    },
    facets
  };
};

export const getProduct = async (id) => {
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return {
    product: {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images.map(image => ({
        src: image,
        alt: product.name
      })),
      thumbnail: {
        src: product.images[0],
        alt: product.name
      },
      category: product.category,
      inStock: product.inStock
    }
  };
};
