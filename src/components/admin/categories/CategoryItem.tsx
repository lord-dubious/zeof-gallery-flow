import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { CategoryForm } from "./CategoryForm";
import { Category, CategoryItem as CategoryItemType, NewCategory } from "./types";

interface CategoryItemProps {
  category: Category;
  items: CategoryItemType[];
  onUpdate: (id: string, data: NewCategory) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export const CategoryItem = ({ 
  category, 
  items, 
  onUpdate, 
  onDelete,
  isUpdating,
  isDeleting 
}: CategoryItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="border rounded-lg p-4">
        <CategoryForm
          initialData={category}
          onSubmit={(data) => {
            onUpdate(category.id, data);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
          isLoading={isUpdating}
        />
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
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
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete(category.id)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">{category.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item) => (
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
    </div>
  );
};