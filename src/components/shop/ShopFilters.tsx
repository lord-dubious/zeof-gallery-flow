
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useCategories } from "@/hooks/use-categories";

interface ShopFiltersProps {
  currentCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const ShopFilters = ({ currentCategory, onCategoryChange }: ShopFiltersProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const { categories } = useCategories();

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <button
          className="flex items-center justify-between w-full font-medium text-left"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <span className="text-lg">Categories</span>
          {isCategoryOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {isCategoryOpen && (
          <div className="mt-4 space-y-2">
            <Button
              variant={currentCategory === null ? "default" : "ghost"}
              className={`w-full justify-start ${
                currentCategory === null ? "bg-zeof-gold hover:bg-zeof-gold/90" : ""
              }`}
              onClick={() => onCategoryChange(null)}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant={currentCategory === category.slug ? "default" : "ghost"}
                className={`w-full justify-start ${
                  currentCategory === category.slug ? "bg-zeof-gold hover:bg-zeof-gold/90" : ""
                }`}
                onClick={() => onCategoryChange(category.slug)}
              >
                {category.title}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopFilters;
