
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { SiteContent, SiteContentUpdate } from "./types";
import { RichTextEditor } from "./editor/RichTextEditor";
import { useImageUpload } from "@/hooks/use-image-upload";
import { ImageUpload } from "./images/ImageUpload";

const ContentManager = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("home");
  const queryClient = useQueryClient();

  const { data: siteContent, isLoading } = useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page", { ascending: true });

      if (error) throw error;
      
      return (data || []) as SiteContent[];
    },
  });

  const updateContent = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: SiteContentUpdate }) => {
      const { error } = await supabase
        .from("site_content")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
    },
    onError: (error) => {
      console.error("Error updating content:", error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    },
  });

  const { uploadImage, isUploading } = useImageUpload();

  const handleImageUpload = async (file: File, contentId: string) => {
    try {
      // Call the uploadImage function and get the result
      const result = await uploadImage(file);
      
      // Since uploadImage might return undefined, we check if we received anything
      // and if it contains a publicUrl property
      if (result && 'publicUrl' in result) {
        handleContentChange(contentId, "image_url", result.publicUrl);
      } else {
        console.error("Invalid response from uploadImage:", result);
        toast({
          title: "Error",
          description: "Failed to get image URL",
          variant: "destructive",
        });
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

  const handleContentChange = (id: string, field: keyof SiteContentUpdate, value: any) => {
    try {
      const parsedContent = typeof value === 'string' && field === 'content' 
        ? JSON.parse(value) 
        : value;

      updateContent.mutate({ 
        id, 
        updates: { [field]: parsedContent } 
      });
    } catch (error) {
      console.error("Invalid JSON format", error);
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  const renderContentEditor = (content: SiteContent) => (
    <Card key={content.id} className="p-6 mb-6">
      <h3 className="text-lg font-medium mb-4">
        {content.section.charAt(0).toUpperCase() + content.section.slice(1)} Section
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            value={content.title || ""}
            onChange={(e) => handleContentChange(content.id, "title", e.target.value)}
            disabled={updateContent.isPending}
          />
        </div>
        {content.subtitle !== null && (
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <Input
              value={content.subtitle || ""}
              onChange={(e) => handleContentChange(content.id, "subtitle", e.target.value)}
              disabled={updateContent.isPending}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <RichTextEditor
            content={content.description || ""}
            onChange={(value) => handleContentChange(content.id, "description", value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <ImageUpload
            onUpload={(file) => handleImageUpload(file, content.id)}
            isUploading={isUploading}
          />
          {content.image_url && (
            <div className="mt-2">
              <img
                src={content.image_url}
                alt="Content image"
                className="max-w-[200px] h-auto rounded-md"
              />
            </div>
          )}
        </div>
        {content.content && (
          <div>
            <label className="block text-sm font-medium mb-1">Additional Content</label>
            <RichTextEditor
              content={typeof content.content === 'object' ? JSON.stringify(content.content, null, 2) : String(content.content)}
              onChange={(value) => handleContentChange(content.id, "content", value)}
            />
          </div>
        )}
      </div>
      {updateContent.isPending && (
        <div className="flex items-center justify-center mt-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
