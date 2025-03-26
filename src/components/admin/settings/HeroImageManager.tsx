
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Save } from "lucide-react";
import { ImageDragDropUploader } from "./ImageDragDropUploader";
import { ColorOverlayPicker } from "./ColorOverlayPicker";
import { useTheme } from "@/hooks/use-theme";

interface HeroImage {
  id: string;
  title: string;
  image_url: string;
  overlay_color: string;
  overlay_opacity: number;
}

// Define a type for the hero content structure
interface HeroContent {
  content?: {
    overlayColor?: string;
    overlayOpacity?: number;
    [key: string]: any;
  };
  image_url?: string;
  id: string;
  [key: string]: any;
}

export const HeroImageManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [overlayColor, setOverlayColor] = useState("#000000");
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const isDark = theme === 'dark';

  // Fetch hero section information
  const { data: heroContent, isLoading } = useQuery({
    queryKey: ["site-content", "hero"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "home")
        .eq("section", "hero")
        .single();

      if (error) throw error;
      
      // Type assertion to ensure we're working with the correct structure
      const typedData = data as HeroContent;
      
      // Set initial overlay values if they exist
      if (typedData.content?.overlayColor) {
        setOverlayColor(typedData.content.overlayColor);
      }
      if (typedData.content?.overlayOpacity !== undefined) {
        setOverlayOpacity(typedData.content.overlayOpacity);
      }
      
      return typedData;
    },
  });

  // Update hero settings
  const mutation = useMutation({
    mutationFn: async ({ 
      file, 
      id, 
      overlayColor, 
      overlayOpacity 
    }: { 
      file?: File | null;
      id: string;
      overlayColor: string;
      overlayOpacity: number;
    }) => {
      let image_url = heroContent?.image_url || "";
      
      // Upload new image if provided
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `hero-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('site-images')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('site-images')
          .getPublicUrl(fileName);
          
        image_url = publicUrl;
      }
      
      // Update content with new values
      const currentContent = heroContent?.content || {};
      const updatedContent = {
        ...currentContent,
        overlayColor,
        overlayOpacity
      };
      
      // Update in database
      const { error } = await supabase
        .from("site_content")
        .update({
          image_url,
          content: updatedContent
        })
        .eq("id", id);
        
      if (error) throw error;
      
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content", "hero"] });
      setPreviewImage(null);
      setPreviewUrl(null);
      toast({
        title: "Success",
        description: "Hero image settings updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error updating hero:", error);
      toast({
        title: "Error",
        description: "Failed to update hero settings",
        variant: "destructive",
      });
    }
  });
  
  const handleImageUpload = (file: File) => {
    setPreviewImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  
  const handleSave = () => {
    if (!heroContent) return;
    
    mutation.mutate({
      file: previewImage,
      id: heroContent.id,
      overlayColor,
      overlayOpacity
    });
  };
  
  const handleColorChange = (color: string) => {
    setOverlayColor(color);
  };
  
  const handleOpacityChange = (opacity: number) => {
    setOverlayOpacity(opacity);
  };
  
  const handleDeleteImage = async () => {
    if (!heroContent || !heroContent.image_url) return;
    
    try {
      // Optional: Delete the file from storage if needed
      // For this implementation, we'll just remove the reference
      
      // Update in database - set image_url to null
      await supabase
        .from("site_content")
        .update({
          image_url: null
        })
        .eq("id", heroContent.id);
        
      queryClient.invalidateQueries({ queryKey: ["site-content", "hero"] });
      setPreviewImage(null);
      setPreviewUrl(null);
      
      toast({
        title: "Success",
        description: "Hero image removed successfully",
      });
    } catch (error) {
      console.error("Error removing hero image:", error);
      toast({
        title: "Error",
        description: "Failed to remove hero image",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const displayImageUrl = previewUrl || heroContent?.image_url;

  return (
    <div className="space-y-6">
      <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-4">Hero Image Management</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Current Hero Image</h4>
              
              {displayImageUrl ? (
                <div className="relative group">
                  <img 
                    src={displayImageUrl} 
                    alt="Hero Preview" 
                    className="w-full h-48 object-cover rounded-md border"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDeleteImage}
                      disabled={mutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md border border-dashed">
                  <p className="text-gray-500">No image selected</p>
                </div>
              )}
              
              <ImageDragDropUploader onUpload={handleImageUpload} />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Overlay Settings</h4>
              <ColorOverlayPicker 
                color={overlayColor}
                opacity={overlayOpacity}
                onColorChange={handleColorChange}
                onOpacityChange={handleOpacityChange}
              />
              
              <div className="mt-4">
                <h5 className="text-md font-medium mb-2">Preview</h5>
                <div className="relative h-48 bg-gray-100 rounded-md overflow-hidden">
                  {displayImageUrl && (
                    <>
                      <img 
                        src={displayImageUrl} 
                        alt="Preview" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div 
                        className="absolute inset-0" 
                        style={{ 
                          backgroundColor: overlayColor,
                          opacity: overlayOpacity
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <h2 className="text-2xl text-white font-serif">Hero Section Preview</h2>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={mutation.isPending}
              className={isDark ? 'bg-primary hover:bg-primary/80' : ''}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
