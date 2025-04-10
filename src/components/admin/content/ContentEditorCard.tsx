import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QueryObserverResult } from "@tanstack/react-query";
import { ImageUploadSection } from "./ImageUploadSection";
import { CarouselSection } from "./CarouselSection";
import { HeroTextSection } from "./HeroTextSection";
import { JsonContentSection } from "./JsonContentSection";
import { db } from "@/services/db";

interface ContentEditorCardProps {
  content: any;
  refetch: () => Promise<QueryObserverResult>;
  theme: string;
}

export const ContentEditorCard = ({ 
  content, 
  refetch,
  theme 
}: ContentEditorCardProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const contentObj = content.content || {};
  
  const sectionName = content.section.charAt(0).toUpperCase() + content.section.slice(1);

  const updateContent = async (id: string, updates: any) => {
    setIsUpdating(true);
    try {
      const success = await db.content.update(id, updates);

      if (!success) {
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

  return (
    <Card key={content.id} className={`p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
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
            className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </div>
        {content.subtitle !== null && (
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <Input
              value={content.subtitle || ""}
              onChange={(e) => handleContentChange(content.id, "subtitle", e.target.value)}
              disabled={isUpdating}
              className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={content.description || ""}
            onChange={(e) => handleContentChange(content.id, "description", e.target.value)}
            disabled={isUpdating}
            className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </div>
        
        <ImageUploadSection 
          content={content}
          isUpdating={isUpdating}
          handleContentChange={handleContentChange}
          theme={theme}
        />

        {content.section === 'hero' && (
          <HeroTextSection 
            content={content}
            contentObj={contentObj}
            updateContent={updateContent}
            theme={theme}
          />
        )}

        <CarouselSection 
          content={content} 
          contentObj={contentObj}
          updateContent={updateContent}
          theme={theme}
        />

        {content.content && (
          <JsonContentSection 
            content={content}
            isUpdating={isUpdating}
            handleContentChange={handleContentChange}
            theme={theme}
          />
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
