
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    metadata: image.metadata || {},
    image_role: image.image_role || '',
    magazine_title: image.magazine_title || ''
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

      <div className="space-y-2">
        <Label htmlFor="image-role">Image Role</Label>
        <Select
          value={metadata.image_role}
          onValueChange={(value) => setMetadata({ ...metadata, image_role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select image role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            <SelectItem value="suits_collection">Suits Collection</SelectItem>
            <SelectItem value="evening_collection">Evening Collection</SelectItem>
            <SelectItem value="accessories_collection">Accessories Collection</SelectItem>
            <SelectItem value="logo">Magazine Logo</SelectItem>
            <SelectItem value="front_cover">Magazine Front Cover</SelectItem>
            <SelectItem value="back_cover">Magazine Back Cover</SelectItem>
            <SelectItem value="content">Magazine Content</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {metadata.image_role?.includes('cover') && (
        <div className="space-y-2">
          <Label htmlFor="magazine-title">Magazine Title</Label>
          <Input
            id="magazine-title"
            value={metadata.magazine_title}
            onChange={(e) => setMetadata({ ...metadata, magazine_title: e.target.value })}
            placeholder="Enter magazine title"
          />
        </div>
      )}

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
