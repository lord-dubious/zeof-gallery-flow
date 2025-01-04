import { Image } from "../types/images";
import { ImageCard } from "./ImageCard";

interface ImageGridProps {
  images: Image[];
  onUpdate: (image: Image) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export const ImageGrid = ({ 
  images, 
  onUpdate, 
  onDelete, 
  isUpdating, 
  isDeleting 
}: ImageGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images?.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};