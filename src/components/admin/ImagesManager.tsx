
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageUpload } from "./images/ImageUpload";
import { useImageUpload } from "@/hooks/use-image-upload";
import { ImagePreview } from "./images/ImagePreview";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Image } from "./types/images";

export const ImagesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { uploadImage, isUploading } = useImageUpload();

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

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Image> }) => {
      const { error } = await supabase
        .from('images')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Image updated successfully",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update image",
        variant: "destructive",
      });
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
    <Card>
      <CardHeader>
        <CardTitle>Images Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="mb-6">
          <ImageUpload onUpload={uploadImage} isUploading={isUploading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images?.map((image) => (
            <div key={image.id} className="relative group">
              <ImagePreview image={image} />
              <div className="space-y-2">
                <h3 className="text-lg font-serif truncate">
                  {image.magazine_title || image.title || 'Untitled'}
                </h3>
                <Button
                  onClick={() => {
                    setSelectedImage(image);
                    setIsDialogOpen(true);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Edit Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Image Details</DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    defaultValue={selectedImage.title || ''}
                    onChange={(e) => {
                      if (selectedImage) {
                        setSelectedImage({
                          ...selectedImage,
                          title: e.target.value
                        });
                      }
                    }}
                    className="text-base"
                    placeholder="Enter a title for the image"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Magazine Title</label>
                  <Input
                    defaultValue={selectedImage.magazine_title || ''}
                    onChange={(e) => {
                      if (selectedImage) {
                        setSelectedImage({
                          ...selectedImage,
                          magazine_title: e.target.value
                        });
                      }
                    }}
                    className="text-base"
                    placeholder="Enter a title for the magazine spread"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    defaultValue={selectedImage.description || ''}
                    onChange={(e) => {
                      if (selectedImage) {
                        setSelectedImage({
                          ...selectedImage,
                          description: e.target.value
                        });
                      }
                    }}
                    className="text-base"
                    placeholder="Enter a description for the image"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image Role</label>
                  <Select
                    defaultValue={selectedImage.image_role || ''}
                    onValueChange={(value) => {
                      if (selectedImage) {
                        setSelectedImage({
                          ...selectedImage,
                          image_role: value
                        });
                      }
                    }}
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
                <div className="flex justify-between gap-4">
                  <Button
                    onClick={() => {
                      updateMutation.mutate({
                        id: selectedImage.id,
                        data: {
                          title: selectedImage.title,
                          magazine_title: selectedImage.magazine_title,
                          description: selectedImage.description,
                          image_role: selectedImage.image_role
                        }
                      });
                    }}
                    className="flex-1"
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                  
                  <Button
                    onClick={() => {
                      updateMutation.mutate({
                        id: selectedImage.id,
                        data: {
                          is_published: !selectedImage.is_published
                        }
                      });
                    }}
                    variant="outline"
                    className="flex-1"
                    disabled={updateMutation.isPending}
                  >
                    {selectedImage.is_published ? 'Hide Image' : 'Publish Image'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
