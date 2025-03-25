
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { useImageUpload } from "@/hooks/use-image-upload";

interface CarouselSectionProps {
  content: any;
  contentObj: any;
  updateContent: (id: string, updates: any) => Promise<void>;
  theme: string;
}

export const CarouselSection = ({ 
  content, 
  contentObj,
  updateContent,
  theme 
}: CarouselSectionProps) => {
  const { uploadImage, isUploading } = useImageUpload();
  
  const hasMultipleImages = contentObj.images && contentObj.images.length > 0;

  const toggleCarousel = (enabled: boolean) => {
    const currentContent = typeof contentObj === 'object' ? contentObj : {};
    const newContent = {
      ...currentContent,
      useCarousel: enabled,
    };
    
    updateContent(content.id, { content: newContent });
  };

  const handleMultipleImageUpload = async (file: File) => {
    try {
      const uploadedImage = await uploadImage(file, 'design');
      if (uploadedImage?.publicUrl) {
        const currentContent = typeof contentObj === 'object' ? contentObj : {};
        const images = currentContent.images || [];
        const newContent = {
          ...currentContent,
          images: [...images, uploadedImage.publicUrl],
        };
        
        updateContent(content.id, { content: newContent });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const removeImageFromCarousel = (imageIndex: number) => {
    const currentContent = typeof contentObj === 'object' ? contentObj : {};
    const images = [...(currentContent.images || [])];
    images.splice(imageIndex, 1);
    
    const newContent = {
      ...currentContent,
      images,
    };
    
    updateContent(content.id, { content: newContent });
  };

  return (
    <div className="space-y-4 border-t pt-4 mt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium">Carousel Settings</h4>
        <div className="flex items-center space-x-2">
          <Switch
            id={`carousel-toggle-${content.id}`}
            checked={contentObj.useCarousel || false}
            onCheckedChange={toggleCarousel}
          />
          <Label htmlFor={`carousel-toggle-${content.id}`}>Enable Carousel</Label>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium">Additional Images</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleMultipleImageUpload(e.target.files[0]);
              }
            }}
            disabled={isUploading}
            className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white max-w-60' : 'max-w-60'}
          />
        </div>
        
        {hasMultipleImages && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {contentObj.images.map((imageUrl: string, index: number) => (
              <div key={index} className="relative group">
                <img src={imageUrl} alt={`Slide ${index + 1}`} className="w-full h-24 object-cover rounded" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImageFromCarousel(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
