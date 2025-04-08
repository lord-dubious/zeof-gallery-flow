
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent } from "@/services/content";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { ContentTabsGroup } from "./ContentTabsGroup";
import { SettingsManagerExtension } from "../SettingsManagerExtension";

const ContentManager = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  
  // Fetch site content
  const { data: siteContent, refetch, isLoading } = useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      try {
        // Fetch all site content from Strapi
        const content = await fetchSiteContent("");
        return content;
      } catch (error) {
        console.error("Error fetching site content:", error);
        return [];
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SettingsManagerExtension />
      <ContentTabsGroup 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        siteContent={siteContent}
        refetch={refetch}
        theme={theme}
      />
    </div>
  );
};

export default ContentManager;
