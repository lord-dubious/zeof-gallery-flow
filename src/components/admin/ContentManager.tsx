import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentManager = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("home");

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
            onChange={(e) =>
              updateContent(content.id, { title: e.target.value })
            }
          />
        </div>
        {content.subtitle !== null && (
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <Input
              value={content.subtitle || ""}
              onChange={(e) =>
                updateContent(content.id, { subtitle: e.target.value })
              }
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={content.description || ""}
            onChange={(e) =>
              updateContent(content.id, { description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            value={content.image_url || ""}
            onChange={(e) =>
              updateContent(content.id, { image_url: e.target.value })
            }
          />
        </div>
        {content.content && Object.keys(content.content).length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Content
            </label>
            <Textarea
              value={JSON.stringify(content.content, null, 2)}
              onChange={(e) => {
                try {
                  const parsedContent = JSON.parse(e.target.value);
                  updateContent(content.id, { content: parsedContent });
                } catch (error) {
                  console.error("Invalid JSON");
                }
              }}
              className="font-mono"
              rows={10}
            />
          </div>
        )}
      </div>
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