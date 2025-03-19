import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { compressImage } from "@/utils/imageCompression";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createThumbnail = async (file: File): Promise<File> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Set thumbnail dimensions (max 200px width/height while maintaining aspect ratio)
        const maxDimension = 200;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress the image
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const thumbnailFile = new File([blob], `thumb_${file.name}`, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(thumbnailFile);
            } else {
              reject(new Error('Failed to create thumbnail'));
            }
          },
          'image/jpeg',
          0.7
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const uploadImage = async (file: File) => {
    if (isUploading) return;
    
    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User must be logged in to upload images');

      // Compress the main image
      const compressedFile = await compressImage(file);
      
      // Create thumbnail
      const thumbnailFile = await createThumbnail(compressedFile);
      
      const fileExt = compressedFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const thumbnailName = `thumbnails/${fileName}`;
      
      // Upload main image
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('gallery')
        .upload(fileName, compressedFile);

      if (uploadError) throw uploadError;

      // Upload thumbnail
      const { error: thumbnailError } = await supabase.storage
        .from('gallery')
        .upload(thumbnailName, thumbnailFile);

      if (thumbnailError) {
        // If thumbnail upload fails, delete the main image
        await supabase.storage.from('gallery').remove([fileName]);
        throw thumbnailError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      const { data: { publicUrl: thumbnailUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(thumbnailName);

      const { error: dbError } = await supabase
        .from('images')
        .insert([{
          title: file.name,
          url: publicUrl,
          thumbnail_url: thumbnailUrl,
          is_published: true,
          user_id: user.id
        }]);

      if (dbError) throw dbError;

      queryClient.invalidateQueries({ queryKey: ['images'] });
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
};