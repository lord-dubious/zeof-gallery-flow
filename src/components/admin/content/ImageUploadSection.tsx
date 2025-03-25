
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon } from "lucide-react";
import { useImageUpload } from "@/hooks/use-image-upload";

interface ImageUploadSectionProps {
  content: any;
  isUpdating: boolean;
  handleContentChange: (id: string, field: string, value: any) => void;
  theme: string;
}

export const ImageUploadSection = ({ 
  content, 
  isUpdating, 
  handleContentChange,
  theme 
}: ImageUploadSectionProps) => {
  const { uploadImage, isUploading } = useImageUpload();

  const handleImageUpload = async (id: string, file: File) => {
    try {
      const uploadedImage = await uploadImage(file, 'design');
      if (uploadedImage?.publicUrl) {
        handleContentChange(id, "image_url", uploadedImage.publicUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-1 flex items-center">
        <ImageIcon className="h-4 w-4 mr-1" /> Image
      </label>
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className={theme === 'dark' ? 'bg-gray-700' : ''}>
          <TabsTrigger value="upload" className={theme === 'dark' ? 'data-[state=active]:bg-gray-600' : ''}>
            Upload Image
          </TabsTrigger>
          <TabsTrigger value="url" className={theme === 'dark' ? 'data-[state=active]:bg-gray-600' : ''}>
            Image URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="pt-2">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleImageUpload(content.id, e.target.files[0]);
              }
            }}
            disabled={isUploading || isUpdating}
            className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </TabsContent>
        <TabsContent value="url" className="pt-2">
          <Input
            value={content.image_url || ""}
            onChange={(e) => handleContentChange(content.id, "image_url", e.target.value)}
            disabled={isUpdating}
            placeholder="Enter image URL"
            className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </TabsContent>
      </Tabs>
      
      {content.image_url && (
        <div className="mt-2">
          <img 
            src={content.image_url} 
            alt={content.title || "Preview"} 
            className="max-h-32 rounded border" 
          />
        </div>
      )}
    </div>
  );
};
