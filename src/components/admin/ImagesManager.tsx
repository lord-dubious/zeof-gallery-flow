import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageUpload } from "./images/ImageUpload";
import { useImageUpload } from "@/hooks/use-image-upload";
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
              <img
                src={image.url}
                alt={image.magazine_title || 'Gallery image'}
                className="w-full aspect-[3/4] object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex flex-col justify-end p-4">
                <h3 className="text-lg font-serif text-white mb-2">
                  {image.magazine_title || 'Untitled'}
                </h3>
                <Button
                  onClick={() => {
                    setSelectedImage(image);
                    setIsDialogOpen(true);
                  }}
                  variant="secondary"
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
                  <label className="text-sm font-medium">Magazine Title</label>
                  <Input
                    defaultValue={selectedImage.magazine_title || ''}
                    onChange={(e) => {
                      if (selectedImage) {
                        updateMutation.mutate({
                          id: selectedImage.id,
                          data: { magazine_title: e.target.value }
                        });
                      }
                    }}
                    className="text-base sm:text-lg md:text-xl"
                    placeholder="Enter a title for the magazine spread"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    defaultValue={selectedImage.description || ''}
                    onChange={(e) => {
                      if (selectedImage) {
                        updateMutation.mutate({
                          id: selectedImage.id,
                          data: { description: e.target.value }
                        });
                      }
                    }}
                    className="text-base sm:text-lg"
                    placeholder="Enter a description for the image"
                    rows={4}
                  />
                </div>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  className="w-full"
                >
                  Done
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};