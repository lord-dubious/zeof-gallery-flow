import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Eye, EyeOff, Loader2, Trash2 } from "lucide-react";
import type { Image } from "../types/images";
import { ImagePreview } from "./ImagePreview";
import { ImageMetadata } from "./ImageMetadata";

interface ImageCardProps {
  image: Image;
  onUpdate: (image: Image) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  isUpdating: boolean;
}

export const ImageCard = ({ 
  image, 
  onUpdate, 
  onDelete, 
  isDeleting, 
  isUpdating 
}: ImageCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleVisibilityToggle = () => {
    onUpdate({
      ...image,
      is_published: !image.is_published
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <ImagePreview image={image} />
        
        {isEditing ? (
          <ImageMetadata
            image={image}
            onUpdate={(updatedImage) => {
              onUpdate(updatedImage);
              setIsEditing(false);
            }}
            isUpdating={isUpdating}
          />
        ) : (
          <div className="space-y-2">
            <h4 className="font-medium truncate">{image.title || 'Untitled'}</h4>
            {image.description && (
              <p className="text-sm text-gray-500 line-clamp-2">{image.description}</p>
            )}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex-1"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleVisibilityToggle}
                className="flex-1"
              >
                {image.is_published ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show
                  </>
                )}
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(image.id)}
                disabled={isDeleting}
                className="flex-1"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};