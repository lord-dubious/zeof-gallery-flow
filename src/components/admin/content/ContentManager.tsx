
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { ContentTabsGroup } from "./ContentTabsGroup";
import { SettingsManagerExtension } from "../SettingsManagerExtension";

const ContentManager = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const useLocalStorage = localStorage.getItem('use_local_storage') === 'true';

  // Fetch site content
  const { data: siteContent, refetch, isLoading } = useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      if (useLocalStorage) {
        const storedContent = localStorage.getItem('local_site_content');
        return storedContent ? JSON.parse(storedContent) : [];
      }

      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page", { ascending: true })
        .order("section", { ascending: true });

      if (error) throw error;
      return data;
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
