
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useImageUpload } from "@/hooks/use-image-upload";

const ContentManager = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("home");
  const [isUpdating, setIsUpdating] = useState(false);
  const { uploadImage, isUploading } = useImageUpload();

  const { data: siteContent, refetch } = useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page", { ascending: true })
        .order("section", { ascending: true });

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

  const handleImageUpload = async (id: string, file: File) => {
    try {
      const uploadedImage = await uploadImage(file);
      if (uploadedImage?.publicUrl) {
        updateContent(id, { image_url: uploadedImage.publicUrl });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const handleMultipleImageUpload = async (id: string, file: File, contentObj: any) => {
    try {
      const uploadedImage = await uploadImage(file);
      if (uploadedImage?.publicUrl) {
        const currentContent = typeof contentObj === 'object' ? contentObj : {};
        const images = currentContent.images || [];
        const newContent = {
          ...currentContent,
          images: [...images, uploadedImage.publicUrl],
        };
        
        updateContent(id, { content: newContent });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const toggleCarousel = (id: string, contentObj: any, enabled: boolean) => {
    const currentContent = typeof contentObj === 'object' ? contentObj : {};
    const newContent = {
      ...currentContent,
      useCarousel: enabled,
    };
    
    updateContent(id, { content: newContent });
  };

  const removeImageFromCarousel = (id: string, contentObj: any, imageIndex: number) => {
    const currentContent = typeof contentObj === 'object' ? contentObj : {};
    const images = [...(currentContent.images || [])];
    images.splice(imageIndex, 1);
    
    const newContent = {
      ...currentContent,
      images,
    };
    
    updateContent(id, { content: newContent });
  };

  const renderContentEditor = (content: any) => {
    const sectionName = content.section.charAt(0).toUpperCase() + content.section.slice(1);
    const contentObj = content.content || {};
    const hasMultipleImages = contentObj.images && contentObj.images.length > 0;
    
    return (
      <Card key={content.id} className="p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">
          {sectionName} Section
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={content.title || ""}
              onChange={(e) => handleContentChange(content.id, "title", e.target.value)}
              disabled={isUpdating}
            />
          </div>
          {content.subtitle !== null && (
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <Input
                value={content.subtitle || ""}
                onChange={(e) => handleContentChange(content.id, "subtitle", e.target.value)}
                disabled={isUpdating}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              value={content.description || ""}
              onChange={(e) => handleContentChange(content.id, "description", e.target.value)}
              disabled={isUpdating}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Image</label>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList>
                <TabsTrigger value="upload">Upload Image</TabsTrigger>
                <TabsTrigger value="url">Image URL</TabsTrigger>
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
                />
              </TabsContent>
              <TabsContent value="url" className="pt-2">
                <Input
                  value={content.image_url || ""}
                  onChange={(e) => handleContentChange(content.id, "image_url", e.target.value)}
                  disabled={isUpdating}
                  placeholder="Enter image URL"
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

          <div className="space-y-4 border-t pt-4 mt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-medium">Carousel Settings</h4>
              <div className="flex items-center space-x-2">
                <Switch
                  id={`carousel-toggle-${content.id}`}
                  checked={contentObj.useCarousel || false}
                  onCheckedChange={(checked) => toggleCarousel(content.id, contentObj, checked)}
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
                  className="max-w-60"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleMultipleImageUpload(content.id, e.target.files[0], contentObj);
                    }
                  }}
                  disabled={isUploading || isUpdating}
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
                        onClick={() => removeImageFromCarousel(content.id, contentObj, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {content.content && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Additional Content (JSON)
              </label>
              <Textarea
                value={typeof content.content === 'object' ? JSON.stringify(content.content, null, 2) : content.content}
                onChange={(e) => handleContentChange(content.id, "content", e.target.value)}
                className="font-mono"
                rows={10}
                disabled={isUpdating}
              />
            </div>
          )}
        </div>
        {isUpdating && (
          <div className="flex items-center justify-center mt-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList>
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-6">
          {siteContent
            ?.filter((content) => content.page === "home")
            .map(renderContentEditor)}
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          {siteContent
            ?.filter((content) => content.page === "about")
            .map(renderContentEditor)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
