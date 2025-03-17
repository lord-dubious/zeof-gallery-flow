
import { ContentTabsGroup } from "./content/ContentTabsGroup";
import { useContentManager } from "@/hooks/use-content-manager";

const ContentManager = () => {
  const {
    activeSection,
    setActiveSection,
    isUpdating,
    isUploading,
    siteContent,
    handleContentChange,
    handleImageUpload,
  } = useContentManager();

  return (
    <div className="space-y-6">
      <ContentTabsGroup
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        siteContent={siteContent || []}
        isUpdating={isUpdating}
        isUploading={isUploading}
        handleContentChange={handleContentChange}
        handleImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default ContentManager;
