import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Trash2 } from "lucide-react";
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
                className="w-full"
                onClick={() => setIsEditing(true)}
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
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};