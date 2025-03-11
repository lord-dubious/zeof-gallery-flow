
import { useState, useEffect } from "react";

interface Category {
  id: string;
  title: string;
  slug: string;
}

// Mock categories for now
const mockCategories: Category[] = [
  { id: "1", title: "Suits", slug: "suits" },
  { id: "2", title: "Shirts", slug: "shirts" },
  { id: "3", title: "Knitwear", slug: "knitwear" },
  { id: "4", title: "Footwear", slug: "footwear" },
  { id: "5", title: "Accessories", slug: "accessories" },
];

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setCategories(mockCategories);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};
