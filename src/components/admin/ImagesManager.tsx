import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Image {
  id: string;
  created_at: string;
  updated_at: string;
  url: string;
  thumbnail_url: string | null;
  title: string | null;
  description: string | null;
  magazine_title: string | null;
  image_role: string | null;
  is_published: boolean | null;
  metadata: any;
  user_id: string | null;
}

const imageRoles = [
  { value: 'suits_collection', label: 'Suits Collection' },
  { value: 'evening_collection', label: 'Evening Collection' },
  { value: 'accessories_collection', label: 'Accessories Collection' },
  { value: 'other', label: 'Other' },
];

export const ImagesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch images
  const { data: images, isLoading } = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Image[];
    }
  });

  // Handle file upload
  const uploadImage = async (file: File, imageRole: string) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async ({ file, imageRole }: { file: File, imageRole: string }) => {
      const imageUrl = await uploadImage(file, imageRole);
      
      const { error } = await supabase
        .from('images')
        .insert([{ 
          url: imageUrl,
          image_role: imageRole,
          is_published: true // Default to published upon upload
        }]);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedImage: Image) => {
      const { error } = await supabase
        .from('images')
        .update(updatedImage)
        .eq('id', updatedImage.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Image updated successfully",
      });
      setIsEditing(false);
      setSelectedImage(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    },
  });

  // Handlers
  const handleImageUpload = (file: File, imageRole: string) => {
    createMutation.mutate({ file, imageRole });
  };

  const handleUpdateImage = (updatedImage: Image) => {
    updateMutation.mutate(updatedImage);
  };

  const handleDeleteImage = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Images Management</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
            </DialogHeader>
            <ImageUploadForm onSubmit={handleImageUpload} isLoading={createMutation.isPending} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images?.map((image) => (
            <ImageItem
              key={image.id}
              image={image}
              onUpdate={handleUpdateImage}
              onDelete={handleDeleteImage}
              onEdit={() => {
                setSelectedImage(image);
                setIsEditing(true);
              }}
              isUpdating={updateMutation.isPending}
              isDeleting={deleteMutation.isPending}
              isEditingThis={isEditing && selectedImage?.id === image.id}
              onCancelEdit={() => {
                setIsEditing(false);
                setSelectedImage(null);
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface ImageUploadFormProps {
  onSubmit: (file: File, imageRole: string) => void;
  isLoading: boolean;
}

const ImageUploadForm = ({ onSubmit, isLoading }: ImageUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageRole, setImageRole] = useState<string>('other');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file, imageRole);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="image">Image File</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="imageRole">Image Role</Label>
        <Select onValueChange={setImageRole} defaultValue="other">
          <SelectTrigger>
            <SelectValue placeholder="Select an image role" />
          </SelectTrigger>
          <SelectContent>
            {imageRoles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={isLoading || !file}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : null}
        Upload Image
      </Button>
    </form>
  );
};

interface ImageItemProps {
  image: Image;
  onUpdate: (updatedImage: Image) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
  isEditingThis: boolean;
  onCancelEdit: () => void;
}

const ImageItem = ({
  image,
  onUpdate,
  onDelete,
  onEdit,
  isUpdating,
  isDeleting,
  isEditingThis,
  onCancelEdit
}: ImageItemProps) => {
  const [isPublished, setIsPublished] = useState(image.is_published ?? true);
  const [title, setTitle] = useState(image.title || '');
  const [description, setDescription] = useState(image.description || '');
  const [imageRole, setImageRole] = useState(image.image_role || 'other');

  const handlePublishToggle = async () => {
    const updatedImage = { ...image, is_published: !isPublished };
    setIsPublished(!isPublished);
    onUpdate(updatedImage);
  };

  const handleSave = () => {
    const updatedImage = {
      ...image,
      title: title,
      description: description,
      image_role: imageRole
    };
    onUpdate(updatedImage);
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="relative w-full h-64">
        <img
          src={image.thumbnail_url || image.url}
          alt={image.title || 'Image'}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      {isEditingThis ? (
        <div className="space-y-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="imageRole">Image Role</Label>
            <Select onValueChange={setImageRole} defaultValue={imageRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select an image role" />
              </SelectTrigger>
              <SelectContent>
                {imageRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={onCancelEdit}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isUpdating}>
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{image.title || 'Untitled'}</h3>
          <p className="text-sm text-gray-500">{image.description}</p>
          <div className="flex items-center justify-between">
            <Label htmlFor={`publish-${image.id}`}>Published</Label>
            <Switch
              id={`publish-${image.id}`}
              checked={isPublished}
              onCheckedChange={handlePublishToggle}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(image.id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
