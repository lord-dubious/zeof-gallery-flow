import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save } from "lucide-react";
import type { Image } from "../types/images";

interface ImageMetadataProps {
  image: Image;
  onUpdate: (image: Image) => void;
  isUpdating: boolean;
}

export const ImageMetadata = ({ image, onUpdate, isUpdating }: ImageMetadataProps) => {
  const [metadata, setMetadata] = useState({
    title: image.title || '',
    description: image.description || '',
    is_published: image.is_published || false,
    metadata: image.metadata || {}
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...image,
      ...metadata
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={metadata.title}
          onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
          placeholder="Image title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={metadata.description}
          onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
          placeholder="Image description"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={metadata.is_published}
          onCheckedChange={(checked) => setMetadata({ ...metadata, is_published: checked })}
        />
        <Label htmlFor="published">Published</Label>
      </div>

      <Button type="submit" disabled={isUpdating} className="w-full">
        {isUpdating ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        Save Changes
      </Button>
    </form>
  );
};