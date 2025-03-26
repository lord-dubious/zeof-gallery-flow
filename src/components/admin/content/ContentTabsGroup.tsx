
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentEditorCard } from "./ContentEditorCard";
import { QueryObserverResult } from "@tanstack/react-query";
import { HeroImageManager } from "../settings/HeroImageManager";

interface ContentTabsGroupProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  siteContent: any[] | undefined;
  refetch: () => Promise<QueryObserverResult>;
  theme: string;
}

export const ContentTabsGroup = ({ 
  activeSection, 
  setActiveSection, 
  siteContent,
  refetch,
  theme 
}: ContentTabsGroupProps) => {
  return (
    <Tabs 
      value={activeSection} 
      onValueChange={setActiveSection} 
      className={theme === 'dark' ? 'text-white' : ''}
    >
      <TabsList className={`${theme === 'dark' ? 'bg-gray-700' : ''} flex flex-wrap`}>
        <TabsTrigger 
          value="home" 
          className={theme === 'dark' ? 'data-[state=active]:bg-gray-600 data-[state=active]:text-white' : ''}
        >
          Home Page
        </TabsTrigger>
        <TabsTrigger 
          value="about" 
          className={theme === 'dark' ? 'data-[state=active]:bg-gray-600 data-[state=active]:text-white' : ''}
        >
          About Page
        </TabsTrigger>
        <TabsTrigger 
          value="services" 
          className={theme === 'dark' ? 'data-[state=active]:bg-gray-600 data-[state=active]:text-white' : ''}
        >
          Services
        </TabsTrigger>
        <TabsTrigger 
          value="hero" 
          className={theme === 'dark' ? 'data-[state=active]:bg-gray-600 data-[state=active]:text-white' : ''}
        >
          Hero Images
        </TabsTrigger>
      </TabsList>

      <TabsContent value="home" className="mt-6">
        {siteContent
          ?.filter((content) => content.page === "home")
          .sort((a, b) => {
            const sectionOrder = { "hero": 1, "featured": 2, "atelier": 3, "shop": 4 };
            return (sectionOrder[a.section] || 99) - (sectionOrder[b.section] || 99);
          })
          .map((content) => (
            <ContentEditorCard 
              key={content.id} 
              content={content} 
              refetch={refetch}
              theme={theme}
            />
          ))}
      </TabsContent>

      <TabsContent value="about" className="mt-6">
        {siteContent
          ?.filter((content) => content.page === "about")
          .sort((a, b) => {
            const sectionOrder = { "hero": 1, "profile": 2, "content": 3, "shop": 4 };
            return (sectionOrder[a.section] || 99) - (sectionOrder[b.section] || 99);
          })
          .map((content) => (
            <ContentEditorCard 
              key={content.id} 
              content={content} 
              refetch={refetch}
              theme={theme}
            />
          ))}
      </TabsContent>

      <TabsContent value="services" className="mt-6">
        {siteContent
          ?.filter((content) => content.page === "services")
          .sort((a, b) => {
            const sectionOrder = { "hero": 1, "services": 2, "testimonials": 3 };
            return (sectionOrder[a.section] || 99) - (sectionOrder[b.section] || 99);
          })
          .map((content) => (
            <ContentEditorCard 
              key={content.id} 
              content={content} 
              refetch={refetch}
              theme={theme}
            />
          ))}
        {(siteContent?.filter(content => content.page === "services")?.length || 0) === 0 && (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-gray-500">No services content found. Add some content to get started.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="hero" className="mt-6">
        <HeroImageManager theme={theme} />
      </TabsContent>
    </Tabs>
  );
};
