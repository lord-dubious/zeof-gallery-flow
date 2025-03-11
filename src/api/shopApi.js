
import { mockProducts } from '../hooks/use-products';

// This would typically connect to a real backend API
export const getProducts = async (query = {}) => {
  const { category, page = 1, limit = 20 } = query;
  
  // Filter products if category is provided
  const filteredProducts = category 
    ? mockProducts.filter(product => product.category === category)
    : mockProducts;
    
  // Simulate pagination
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);
  
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
      }
    })),
    page: {
      total: filteredProducts.length,
      current: page,
      size: limit
    }
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
      }
    }
  };
};
