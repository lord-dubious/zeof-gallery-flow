
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "../images/ImageUpload";

interface ContentEditorCardProps {
  content: any;
  activeSection: string;
  isUpdating: boolean;
  isUploading: boolean;
  onContentChange: (id: string, field: string, value: any) => void;
  onImageUpload: (file: File, contentId: string) => Promise<void>;
}

export const ContentEditorCard = ({
  content,
  activeSection,
  isUpdating,
  isUploading,
  onContentChange,
  onImageUpload,
}: ContentEditorCardProps) => {
  return (
    <Card key={content.id} className="p-6 mb-6">
      <h3 className="text-lg font-medium mb-4">
        {content.section.charAt(0).toUpperCase() + content.section.slice(1)} Section
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            value={content.title || ""}
            onChange={(e) => onContentChange(content.id, "title", e.target.value)}
            disabled={isUpdating}
          />
        </div>
        {content.subtitle !== null && (
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <Input
              value={content.subtitle || ""}
              onChange={(e) => onContentChange(content.id, "subtitle", e.target.value)}
              disabled={isUpdating}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={content.description || ""}
            onChange={(e) => onContentChange(content.id, "description", e.target.value)}
            disabled={isUpdating}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <div className="space-y-2">
            {content.image_url && (
              <div className="w-full max-w-md">
                <img 
                  src={content.image_url} 
                  alt={content.title || "Content image"} 
                  className="w-full h-40 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Upload New Image</label>
              <ImageUpload 
                onUpload={(file) => onImageUpload(file, content.id)} 
                isUploading={isUploading} 
              />
            </div>
            {/* Make the URL input field always available as a fallback */}
            <div>
              <label className="block text-sm font-medium mb-1">Or Enter Image URL</label>
              <Input
                value={content.image_url || ""}
                onChange={(e) => onContentChange(content.id, "image_url", e.target.value)}
                disabled={isUpdating}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>
        {content.content && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Content (JSON)
            </label>
            <Textarea
              value={typeof content.content === 'object' ? JSON.stringify(content.content, null, 2) : content.content}
              onChange={(e) => onContentChange(content.id, "content", e.target.value)}
              className="font-mono"
              rows={10}
              disabled={isUpdating}
            />
          </div>
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
