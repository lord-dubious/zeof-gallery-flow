import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import type { Image } from "../types/images";

interface ImageCardProps {
  image: Image;
  onUpdate: (image: Image) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isUpdating: boolean;
}

export const ImageCard = ({ image, onUpdate, onDelete, isDeleting, isUpdating }: ImageCardProps) => {
  const [editingImage, setEditingImage] = useState<Image | null>(null);

  return (
    <div className="border rounded-lg p-2">
      {editingImage ? (
        <div className="space-y-2">
          <Input
            value={editingImage.title}
            onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
            placeholder="Title"
          />
          <Textarea
            value={editingImage.description}
            onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
            placeholder="Description"
          />
          <div className="flex gap-2">
            <Button 
              size="sm"
              onClick={() => onUpdate(editingImage)}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setEditingImage(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative aspect-square mb-2">
            <img 
              src={image.thumbnail_url || image.url} 
              alt={image.title || 'Uploaded image'}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <h4 className="font-medium truncate">{image.title || 'Untitled'}</h4>
          {image.description && (
            <p className="text-sm text-gray-500 truncate">{image.description}</p>
          )}
          <div className="flex gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setEditingImage(image)}
            >
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              className="w-full"
              onClick={() => onDelete(image.id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
