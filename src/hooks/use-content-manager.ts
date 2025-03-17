
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useImageUpload } from "@/hooks/use-image-upload";

export const useContentManager = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("hero");
  const [isUpdating, setIsUpdating] = useState(false);
  const { uploadImage, isUploading } = useImageUpload();

  const { data: siteContent, refetch } = useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const updateContent = async (id: string, updates: any) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("site_content")
        .update(updates)
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update content",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error updating content:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleContentChange = (id: string, field: string, value: any) => {
    if (field === 'content') {
      try {
        // If it's a string, try to parse it as JSON
        const parsedContent = typeof value === 'string' ? JSON.parse(value) : value;
        updateContent(id, { [field]: parsedContent });
      } catch (error) {
        console.error("Invalid JSON format");
        toast({
          title: "Error",
          description: "Invalid JSON format",
          variant: "destructive",
        });
      }
    } else {
      updateContent(id, { [field]: value });
    }
  };

  const handleImageUpload = async (file: File, contentId: string) => {
    try {
      const { data: imageUrl, error } = await uploadImage(file);
      
      // After successful upload, update the content with the new image URL
      if (imageUrl && !error) {
        await updateContent(contentId, { image_url: imageUrl });
        toast({
          title: "Success",
          description: "Image uploaded and attached to content successfully",
        });
      } else {
        toast({
          title: "Image uploaded",
          description: "The image has been uploaded but couldn't be automatically attached to the content.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  return {
    activeSection,
    setActiveSection,
    isUpdating,
    isUploading,
    siteContent,
    handleContentChange,
    handleImageUpload,
  };
};
