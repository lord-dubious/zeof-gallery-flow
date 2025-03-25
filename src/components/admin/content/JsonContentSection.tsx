
import { Textarea } from "@/components/ui/textarea";

interface JsonContentSectionProps {
  content: any;
  isUpdating: boolean;
  handleContentChange: (id: string, field: string, value: any) => void;
  theme: string;
}

export const JsonContentSection = ({ 
  content, 
  isUpdating, 
  handleContentChange,
  theme 
}: JsonContentSectionProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Additional Content (JSON)
      </label>
      <Textarea
        value={typeof content.content === 'object' ? JSON.stringify(content.content, null, 2) : content.content}
        onChange={(e) => handleContentChange(content.id, "content", e.target.value)}
        className={`font-mono ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
        rows={10}
        disabled={isUpdating}
      />
    </div>
  );
};
