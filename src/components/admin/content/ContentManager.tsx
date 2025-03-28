
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { ContentTabsGroup } from "./ContentTabsGroup";

const ContentManager = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");

  // Fetch site content
  const { data: siteContent, refetch, isLoading } = useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
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
