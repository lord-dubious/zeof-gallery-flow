
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentEditorCard } from "./ContentEditorCard";
import { QueryObserverResult } from "@tanstack/react-query";

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
      <TabsList className={theme === 'dark' ? 'bg-gray-700' : ''}>
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
    </Tabs>
  );
};
