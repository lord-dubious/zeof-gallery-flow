
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { CategoryFormData, CategoryFormProps } from "../types";

export const CategoryForm = ({ initialData, onSubmit, onCancel, isLoading }: CategoryFormProps) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    display_order: initialData?.display_order || 0,
    image_url: initialData?.image_url || ""
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.image_url || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData({ ...formData, image: file });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="order">Display Order</Label>
        <Input
          id="order"
          type="number"
          value={formData.display_order}
          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <Label htmlFor="image">Category Image</Label>
        <div className="mt-2 space-y-4">
          {previewUrl && (
            <div className="relative w-full h-48">
              <img 
                src={previewUrl} 
                alt="Category preview" 
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="w-full"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              {previewUrl ? 'Change Image' : 'Upload Image'}
            </Button>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={() => onSubmit(formData)}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            initialData ? 'Save Changes' : 'Create Category'
          )}
        </Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};
