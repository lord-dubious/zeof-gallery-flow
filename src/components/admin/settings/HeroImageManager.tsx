import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Save, Upload, Image as ImageIcon, Info, Crop } from "lucide-react";
import { ImageDragDropUploader } from "./ImageDragDropUploader";
import { ColorOverlayPicker } from "./ColorOverlayPicker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { db } from "@/services/db";
import { SiteContent } from "@/components/admin/types";

interface HeroImageManagerProps {
  theme: string;
}

export const HeroImageManager = ({ theme }: HeroImageManagerProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [overlayColor, setOverlayColor] = useState("#000000");
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const isDark = theme === 'dark';

  const { data: heroContentList, isLoading } = useQuery({
    queryKey: ["site-content", "hero"],
    queryFn: async () => {
      const contents = await db.content.getByPage("home", "hero");
      
      const heroContent = contents && contents.length > 0 ? contents[0] : null;
      
      if (heroContent) {
        if (heroContent.content?.overlayColor) {
          setOverlayColor(heroContent.content.overlayColor);
        }
        if (heroContent.content?.overlayOpacity !== undefined) {
          setOverlayOpacity(heroContent.content.overlayOpacity);
        }
        if (heroContent.content?.imagePosition) {
          setImagePosition(heroContent.content.imagePosition);
        } else {
          setImagePosition({ x: 50, y: 50 });
        }
      }
      
      return heroContent ? [heroContent] : [];
    }
  });

  const heroContent = heroContentList && heroContentList.length > 0 ? heroContentList[0] : null;

  const mutation = useMutation({
    mutationFn: async ({ 
      file, 
      id, 
      overlayColor, 
      overlayOpacity,
      imagePosition 
    }: { 
      file?: File | null;
      id: string;
      overlayColor: string;
      overlayOpacity: number;
      imagePosition: { x: number; y: number };
    }) => {
      let image_url = heroContent?.image_url || "";
      
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `hero-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName);
          
        image_url = data.publicUrl;
      }
      
      const currentContent = heroContent?.content || {};
      const updatedContent = {
        ...currentContent,
        overlayColor,
        overlayOpacity,
        imagePosition
      };
      
      const success = await db.content.update(id, {
        image_url,
        content: updatedContent
      });
      
      if (!success) throw new Error("Failed to update hero image settings");
      
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content", "hero"] });
      setPreviewImage(null);
      setPreviewUrl(null);
      toast({
        title: "Success",
        description: "Hero image settings updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error updating hero:", error);
      toast({
        title: "Error",
        description: "Failed to update hero settings",
        variant: "destructive",
      });
    }
  });
  
  const handleImageUpload = (file: File) => {
    setPreviewImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  
  const handleSave = () => {
    if (!heroContent) return;
    
    mutation.mutate({
      file: previewImage,
      id: heroContent.id,
      overlayColor,
      overlayOpacity,
      imagePosition
    });
  };
  
  const handleColorChange = (color: string) => {
    setOverlayColor(color);
  };
  
  const handleOpacityChange = (opacity: number) => {
    setOverlayOpacity(opacity);
  };
  
  const handleDeleteImage = async () => {
    if (!heroContent || !heroContent.image_url) return;
    
    try {
      const urlParts = heroContent.image_url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (heroContent.image_url.includes('site-images')) {
        await supabase.storage
          .from('site-images')
          .remove([fileName]);
      }
      
      await supabase
        .from("site_content")
        .update({
          image_url: null
        })
        .eq("id", heroContent.id);
        
      queryClient.invalidateQueries({ queryKey: ["site-content", "hero"] });
      setPreviewImage(null);
      setPreviewUrl(null);
      
      toast({
        title: "Success",
        description: "Hero image removed successfully",
      });
    } catch (error) {
      console.error("Error removing hero image:", error);
      toast({
        title: "Error",
        description: "Failed to remove hero image",
        variant: "destructive",
      });
    }
  };

  const handleImagePositionXChange = (values: number[]) => {
    setImagePosition(prev => ({ ...prev, x: values[0] }));
  };

  const handleImagePositionYChange = (values: number[]) => {
    setImagePosition(prev => ({ ...prev, y: values[0] }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const displayImageUrl = previewUrl || heroContent?.image_url;

  return (
    <div className="space-y-6">
      <Card className={`shadow-md ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-medium mb-1">Hero Image Management</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Customize the appearance of your hero section
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className={isDark ? 'bg-gray-700 border-gray-600' : ''}>
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Upload a high-quality image for your hero section, adjust the positioning, and set the overlay to ensure text remains readable.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-3 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" /> Hero Image
                </h4>
                
                {displayImageUrl ? (
                  <div className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <img 
                      src={displayImageUrl} 
                      alt="Hero Preview" 
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleDeleteImage}
                        disabled={mutation.isPending}
                        className="transform hover:scale-105 transition-transform"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-60 bg-gray-100 dark:bg-gray-700 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No image selected</p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Recommended size: 1920×1080px
                    </p>
                  </div>
                )}
              </div>
              
              <ImageDragDropUploader onUpload={handleImageUpload} />

              {displayImageUrl && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium mb-3 flex items-center">
                      <Crop className="h-5 w-5 mr-2" /> Image Position
                    </h4>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Adjust how the image is positioned in the hero section
                    </p>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium">Horizontal Position</label>
                          <span className="text-xs text-gray-500">{imagePosition.x}%</span>
                        </div>
                        <Slider 
                          value={[imagePosition.x]} 
                          min={0} 
                          max={100} 
                          step={1} 
                          onValueChange={handleImagePositionXChange}
                          className={isDark ? 'bg-gray-700' : ''}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Left</span>
                          <span>Center</span>
                          <span>Right</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium">Vertical Position</label>
                          <span className="text-xs text-gray-500">{imagePosition.y}%</span>
                        </div>
                        <Slider 
                          value={[imagePosition.y]} 
                          min={0} 
                          max={100} 
                          step={1} 
                          onValueChange={handleImagePositionYChange}
                          className={isDark ? 'bg-gray-700' : ''}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Top</span>
                          <span>Center</span>
                          <span>Bottom</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Overlay Settings</h4>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Adjust the overlay color and opacity to make your text stand out against the background image
                </p>
                <ColorOverlayPicker 
                  color={overlayColor}
                  opacity={overlayOpacity}
                  onColorChange={handleColorChange}
                  onOpacityChange={handleOpacityChange}
                />
              </div>
              
              <div>
                <h5 className="text-md font-medium mb-3">Live Preview</h5>
                <div className="relative h-60 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  {displayImageUrl ? (
                    <>
                      <div className="absolute inset-0 overflow-hidden">
                        <img 
                          src={displayImageUrl} 
                          alt="Preview" 
                          className="absolute w-auto h-auto min-w-full min-h-full object-cover"
                          style={{ 
                            objectPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                          }}
                        />
                      </div>
                      <div 
                        className="absolute inset-0" 
                        style={{ 
                          backgroundColor: overlayColor,
                          opacity: overlayOpacity
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <span className="text-zeof-gold font-serif tracking-wider mb-2 block text-xs uppercase">
                          Est. 1985
                        </span>
                        <h2 className="text-xl md:text-2xl text-white font-serif mb-2">
                          The Art of Refined Elegance
                        </h2>
                        <p className="text-xs text-white mb-3 max-w-xs">
                          Where timeless craftsmanship meets contemporary sophistication
                        </p>
                        <button className="bg-zeof-gold text-white text-xs px-3 py-1 uppercase">
                          Button Preview
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Upload an image to see preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={mutation.isPending}
              className={`px-6 transition-all ${isDark ? 'bg-primary hover:bg-primary/80' : ''}`}
              size="lg"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
