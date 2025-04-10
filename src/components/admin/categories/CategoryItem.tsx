
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { CategoryForm } from "./CategoryForm";
import { Category, CategoryFormData } from "../types";

interface CategoryItemProps {
  category: Category;
  onUpdate: (data: CategoryFormData) => void;
  onDelete: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export const CategoryItem = ({ 
  category, 
  onUpdate, 
  onDelete,
  isUpdating,
  isDeleting 
}: CategoryItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 space-y-4">
      {isEditing ? (
        <CategoryForm
          initialData={{
            title: category.title,
            slug: category.slug,
            description: category.description || "",
            display_order: category.display_order,
            image_url: category.image_url || undefined,
            is_active: category.is_active
          }}
          onSubmit={(data) => {
            onUpdate(data);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
          isLoading={isUpdating}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{category.title}</h3>
              <p className="text-sm text-gray-500">Slug: {category.slug}</p>
              <p className="text-sm text-gray-500">Order: {category.display_order}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={onDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {category.image_url && (
            <div className="relative w-full h-48">
              <img 
                src={category.image_url} 
                alt={category.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          )}
          {category.description && (
            <p className="text-sm text-gray-500">{category.description}</p>
          )}
          {isExpanded && category.category_items && category.category_items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {category.category_items.map((item) => (
                <div key={item.id} className="border rounded p-3">
                  <img 
                    src={item.image_path} 
                    alt={item.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
