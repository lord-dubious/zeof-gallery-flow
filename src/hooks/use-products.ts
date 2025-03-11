
import { useState, useEffect } from "react";
import { Product } from "@/types/shop";

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Tailored Wool Suit",
    description: "Impeccably crafted suit made from premium Italian wool.",
    price: 1250.00,
    category: "suits",
    images: [
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
  },
  {
    id: "2",
    name: "Silk Dress Shirt",
    description: "Luxurious dress shirt crafted from 100% mulberry silk.",
    price: 320.00,
    category: "shirts",
    images: [
      "https://images.unsplash.com/photo-1603251579711-3e9c81d6ec24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
  },
  {
    id: "3",
    name: "Cashmere Sweater",
    description: "Soft and lightweight cashmere sweater for everyday luxury.",
    price: 480.00,
    category: "knitwear",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Leather Brogues",
    description: "Hand-crafted leather brogues with Goodyear welt construction.",
    price: 650.00,
    category: "footwear",
    images: [
      "https://images.unsplash.com/photo-1614253429340-98120bd6d753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
  },
  {
    id: "5",
    name: "Silk Tie",
    description: "Pure silk tie with a timeless pattern.",
    price: 180.00,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1612811203936-bfdb3132ac4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Merino Wool Scarf",
    description: "Soft and warm scarf made from 100% merino wool.",
    price: 220.00,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1569154027282-fcd05334985b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setProducts(mockProducts);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
};
