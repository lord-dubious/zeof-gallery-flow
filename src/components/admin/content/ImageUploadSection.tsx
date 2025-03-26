
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, UploadCloud, Link2, Trash2 } from "lucide-react";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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

  const handleDeleteImage = async (id: string) => {
    try {
      // Extract filename from URL
      if (!content.image_url) return;
      
      const urlParts = content.image_url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      // Delete the file from storage if it's a Supabase storage URL
      if (content.image_url.includes('site-images') || content.image_url.includes('design')) {
        await supabase.storage
          .from(content.image_url.includes('site-images') ? 'site-images' : 'design')
          .remove([fileName]);
      }
      
      // Update content in database - set image_url to null
      handleContentChange(id, "image_url", null);
      
      toast({
        title: "Success",
        description: "Image removed successfully",
      });
    } catch (error) {
      console.error("Error removing image:", error);
      toast({
        title: "Error",
        description: "Failed to remove image",
        variant: "destructive",
      });
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-1 flex items-center">
        <ImageIcon className="h-4 w-4 mr-1" /> Image
      </label>
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className={isDark ? 'bg-gray-700' : ''}>
          <TabsTrigger value="upload" className={isDark ? 'data-[state=active]:bg-gray-600' : ''}>
            <UploadCloud className="h-4 w-4 mr-1" /> Upload Image
          </TabsTrigger>
          <TabsTrigger value="url" className={isDark ? 'data-[state=active]:bg-gray-600' : ''}>
            <Link2 className="h-4 w-4 mr-1" /> Image URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="pt-2">
          <div className={`border-2 border-dashed rounded-md p-4 ${isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'} transition-colors`}>
            <div className="text-center mb-3">
              <UploadCloud className={`h-6 w-6 mx-auto mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(content.id, e.target.files[0]);
                }
              }}
              disabled={isUploading || isUpdating}
              className={`${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''} cursor-pointer`}
            />
          </div>
        </TabsContent>
        <TabsContent value="url" className="pt-2">
          <div className="space-y-2">
            <Input
              value={content.image_url || ""}
              onChange={(e) => handleContentChange(content.id, "image_url", e.target.value)}
              disabled={isUpdating}
              placeholder="Enter image URL"
              className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
            />
            <p className="text-xs text-gray-500">
              Enter a full URL to an image (e.g. https://example.com/image.jpg)
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      {content.image_url && (
        <div className="mt-2">
          <div className="relative group">
            <img 
              src={content.image_url} 
              alt={content.title || "Preview"} 
              className="w-full max-h-48 object-cover rounded border" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-white text-black hover:bg-gray-100"
                  onClick={() => window.open(content.image_url, '_blank')}
                >
                  <ImageIcon className="h-4 w-4 mr-1" /> View Full Size
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteImage(content.id)}
                  disabled={isUpdating}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
