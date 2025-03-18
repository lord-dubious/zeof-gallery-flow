
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentEditorCard } from "./ContentEditorCard";

interface ContentTabsGroupProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  siteContent: any[];
  isUpdating: boolean;
  isUploading: boolean;
  handleContentChange: (id: string, field: string, value: any) => void;
  handleImageUpload: (file: File, contentId: string) => Promise<void>;
}

export const ContentTabsGroup = ({
  activeSection,
  setActiveSection,
  siteContent,
  isUpdating,
  isUploading,
  handleContentChange,
  handleImageUpload,
}: ContentTabsGroupProps) => {
  return (
    <Tabs value={activeSection} onValueChange={setActiveSection}>
      <TabsList>
        <TabsTrigger value="hero">Hero</TabsTrigger>
        <TabsTrigger value="home">Home Content</TabsTrigger>
        <TabsTrigger value="about">About Page</TabsTrigger>
      </TabsList>

      <TabsContent value="hero" className="mt-6">
        {siteContent
          ?.filter((content) => content.section === "hero")
          .map((content) => (
            <ContentEditorCard
              key={content.id}
              content={content}
              activeSection={activeSection}
              isUpdating={isUpdating}
              isUploading={isUploading}
              onContentChange={handleContentChange}
              onImageUpload={handleImageUpload}
            />
          ))}
      </TabsContent>

      <TabsContent value="home" className="mt-6">
        {siteContent
          ?.filter((content) => content.page === "home" && content.section !== "hero")
          .sort((a, b) => {
            // Sort by display_order if available, otherwise by section name
            if (a.display_order !== undefined && b.display_order !== undefined) {
              return a.display_order - b.display_order;
            }
            return a.section.localeCompare(b.section);
          })
          .map((content) => (
            <ContentEditorCard
              key={content.id}
              content={content}
              activeSection={activeSection}
              isUpdating={isUpdating}
              isUploading={isUploading}
              onContentChange={handleContentChange}
              onImageUpload={handleImageUpload}
            />
          ))}
      </TabsContent>

      <TabsContent value="about" className="mt-6">
        {siteContent
          ?.filter((content) => content.page === "about")
          .sort((a, b) => {
            // Sort by display_order if available, otherwise by section name
            if (a.display_order !== undefined && b.display_order !== undefined) {
              return a.display_order - b.display_order;
            }
            return a.section.localeCompare(b.section);
          })
          .map((content) => (
            <ContentEditorCard
              key={content.id}
              content={content}
              activeSection={activeSection}
              isUpdating={isUpdating}
              isUploading={isUploading}
              onContentChange={handleContentChange}
              onImageUpload={handleImageUpload}
            />
          ))}
      </TabsContent>
    </Tabs>
  );
};
