import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Image } from "./types/images";
import { ImageUpload } from "./images/ImageUpload";
import { ImageGrid } from "./images/ImageGrid";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useSessionContext } from "@supabase/auth-helpers-react";

export const ImagesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { uploadImage, isUploading } = useImageUpload();
  const { session } = useSessionContext();

  // Fetch images for the current user
  const { data: images, isLoading } = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Image[];
    },
    enabled: !!session?.user?.id
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (image: Image) => {
      const { error } = await supabase
        .from('images')
        .update({
          title: image.title,
          description: image.description,
          is_published: image.is_published,
          metadata: image.metadata
        })
        .eq('id', image.id)
        .eq('user_id', session?.user?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Image updated successfully",
      });
    },
    onError: () => {
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
      const image = images?.find(img => img.id === id);
      if (image?.url.includes('storage.googleapis.com')) {
        const filePath = image.url.split('/').pop();
        if (filePath) {
          await supabase.storage
            .from('images')
            .remove([filePath]);
        }
      }
      
      const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', id)
        .eq('user_id', session?.user?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete image",
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Images Management</CardTitle>
        <ImageUpload
          onUpload={uploadImage}
          isUploading={isUploading}
        />
      </CardHeader>
      <CardContent>
        <ImageGrid
          images={images || []}
          onUpdate={updateMutation.mutate}
          onDelete={deleteMutation.mutate}
          isUpdating={updateMutation.isPending}
          isDeleting={deleteMutation.isPending}
        />
      </CardContent>
    </Card>
  );
};