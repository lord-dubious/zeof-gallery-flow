
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { SiteContent, SiteContentUpdate } from "./types";

const ContentManager = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("home");
  const queryClient = useQueryClient();

  const { data: siteContent, isLoading } = useQuery<SiteContent[]>({
    queryKey: ["site-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page", { ascending: true });

      if (error) throw error;
      return data || [];
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
          <Textarea
            value={content.description || ""}
            onChange={(e) => handleContentChange(content.id, "description", e.target.value)}
            disabled={updateContent.isPending}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            value={content.image_url || ""}
            onChange={(e) => handleContentChange(content.id, "image_url", e.target.value)}
            disabled={updateContent.isPending}
          />
        </div>
        {content.content && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Content (JSON)
            </label>
            <Textarea
              value={typeof content.content === 'object' ? JSON.stringify(content.content, null, 2) : (content.content as string)}
              onChange={(e) => handleContentChange(content.id, "content", e.target.value)}
              className="font-mono"
              rows={10}
              disabled={updateContent.isPending}
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
