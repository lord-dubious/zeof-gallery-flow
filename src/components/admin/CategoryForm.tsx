
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { CategoryFormData } from "./types/categories";

interface CategoryFormProps {
  initialData: CategoryFormData;
  onSubmit: (data: CategoryFormData) => void;
  isLoading?: boolean;
}

export const CategoryForm = ({ initialData, onSubmit, isLoading = false }: CategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Display Order</label>
        <input
          type="number"
          name="display_order"
          value={formData.display_order}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active || false}
          onChange={handleChange}
          className="mr-2"
          id="is_active"
        />
        <label htmlFor="is_active" className="text-sm">Active</label>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </form>
  );
};
