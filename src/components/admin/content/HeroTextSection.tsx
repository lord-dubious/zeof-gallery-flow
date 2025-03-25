
import { Input } from "@/components/ui/input";

interface HeroTextSectionProps {
  content: any;
  contentObj: any;
  updateContent: (id: string, updates: any) => Promise<void>;
  theme: string;
}

export const HeroTextSection = ({ 
  content, 
  contentObj,
  updateContent,
  theme 
}: HeroTextSectionProps) => {
  const heroText = contentObj.heroText || {};
  
  const updateHeroText = (key: string, value: string) => {
    const currentContent = typeof contentObj === 'object' ? contentObj : {};
    const newContent = {
      ...currentContent,
      heroText: {
        ...(currentContent.heroText || {}),
        [key]: value
      }
    };
    
    updateContent(content.id, { content: newContent });
  };

  return (
    <div className="space-y-4 border-t pt-4 mt-4">
      <h4 className="text-md font-medium">Hero Text Customization</h4>
      <div>
        <label className="block text-sm font-medium mb-1">Heading</label>
        <Input
          value={heroText.heading || ""}
          onChange={(e) => updateHeroText("heading", e.target.value)}
          placeholder="Main heading text"
          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Subheading</label>
        <Input
          value={heroText.subheading || ""}
          onChange={(e) => updateHeroText("subheading", e.target.value)}
          placeholder="Subheading text"
          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Button Text</label>
        <Input
          value={heroText.buttonText || ""}
          onChange={(e) => updateHeroText("buttonText", e.target.value)}
          placeholder="Call to action button text"
          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Button URL</label>
        <Input
          value={heroText.buttonUrl || ""}
          onChange={(e) => updateHeroText("buttonUrl", e.target.value)}
          placeholder="/page-url"
          className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}
        />
      </div>
    </div>
  );
};
