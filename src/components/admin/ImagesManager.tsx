import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Image } from "./types/images";
import { ImageCard } from "./images/ImageCard";
import { ImageUpload } from "./images/ImageUpload";

export const ImagesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [migratingImages, setMigratingImages] = useState(false);

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

  // Function to download an image from URL and convert to File
  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  // Migrate existing images to storage
  const migrateImages = async () => {
    if (!images) return;
    setMigratingImages(true);
    
    try {
      for (const image of images) {
        if (!image.url.includes('storage.googleapis.com')) {
          const filename = image.url.split('/').pop() || 'image.jpg';
          const file = await urlToFile(image.url, filename);
          const filePath = `${crypto.randomUUID()}.${filename.split('.').pop()}`;
          
          const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

          const { error: updateError } = await supabase
            .from('images')
            .update({ url: publicUrl, thumbnail_url: publicUrl })
            .eq('id', image.id);

          if (updateError) throw updateError;
        }
      }
      
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Images migrated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to migrate images",
        variant: "destructive",
      });
    } finally {
      setMigratingImages(false);
    }
  };

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
        .eq('id', image.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Image updated successfully",
      });
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
      const image = images?.find(img => img.id === id);
      if (image) {
        if (image.url.includes('storage.googleapis.com')) {
          const filePath = image.url.split('/').pop();
          if (filePath) {
            await supabase.storage
              .from('images')
              .remove([filePath]);
          }
        }
      }
      
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

  const handleFileUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('images')
        .insert([{
          title: file.name,
          url: publicUrl,
          thumbnail_url: publicUrl,
          is_published: true
        }]);

      if (dbError) throw dbError;

      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
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
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={migrateImages}
            disabled={migratingImages}
          >
            {migratingImages ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Migrating...
              </>
            ) : (
              'Migrate External Images'
            )}
          </Button>
          <ImageUpload
            onUpload={handleFileUpload}
            isUploading={uploadingImage}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onUpdate={updateMutation.mutate}
              onDelete={deleteMutation.mutate}
              isUpdating={updateMutation.isPending}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};