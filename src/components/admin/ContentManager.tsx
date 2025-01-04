import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const ContentManager = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("home");
  const [isUpdating, setIsUpdating] = useState(false);

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

  const renderContentEditor = (content: any) => (
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
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            value={content.image_url || ""}
            onChange={(e) => handleContentChange(content.id, "image_url", e.target.value)}
            disabled={isUpdating}
          />
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