
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  sku: string;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export type ShopView = 'grid' | 'list';
