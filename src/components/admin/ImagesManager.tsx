
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Image as ImageIcon, Search, Filter, Trash2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ImageUpload } from "./images/ImageUpload";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useTheme } from "@/hooks/use-theme";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Image } from "./types/images";

export const ImagesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { uploadImage, isUploading } = useImageUpload();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

  // Filter images based on search term and category
  const filteredImages = images?.filter(image => {
    const matchesSearch = searchTerm === "" || 
      (image.magazine_title && image.magazine_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (image.description && image.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories from images
  const categories = images ? 
    ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))] : 
    ['all'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Images Management</CardTitle>
        <Button onClick={() => window.scrollTo(0, 0)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload New
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={`p-6 rounded-lg border border-dashed transition-all ${
          isDark ? 'bg-gray-800 border-gray-600 hover:border-gray-500' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
        }`}>
          <div className="text-center mb-4">
            <ImageIcon className="h-10 w-10 mx-auto mb-2 text-gray-400" />
            <h3 className="text-lg font-medium">Upload Images</h3>
            <p className="text-sm text-gray-500">Drag and drop files or click to browse</p>
          </div>
          <ImageUpload onUpload={uploadImage} isUploading={isUploading} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search images..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-gray-400" />
            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className={`overflow-auto max-w-[300px] ${isDark ? 'bg-gray-700' : ''}`}>
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className={`text-xs capitalize whitespace-nowrap ${
                      isDark ? 'data-[state=active]:bg-gray-600' : ''
                    }`}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredImages?.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No images found</h3>
            <p className="text-sm text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'all' ? 
                'Try adjusting your search or filter criteria' : 
                'Upload your first image to get started'}
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages?.map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md">
                <img
                  src={image.url}
                  alt={image.magazine_title || 'Gallery image'}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-lg font-serif text-white mb-2 line-clamp-2">
                    {image.magazine_title || 'Untitled'}
                  </h3>
                  {image.description && (
                    <p className="text-sm text-gray-200 line-clamp-2 mb-4">{image.description}</p>
                  )}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => {
                        setSelectedImage(image);
                        setIsDialogOpen(true);
                      }}
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                    >
                      Edit Details
                    </Button>
                    <Button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this image?')) {
                          deleteMutation.mutate(image.id);
                        }
                      }}
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {image.category && (
                  <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs capitalize">
                    {image.category}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className={`sm:max-w-[500px] ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
            <DialogHeader>
              <DialogTitle>Edit Image Details</DialogTitle>
            </DialogHeader>
            {selectedImage && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <img 
                      src={selectedImage.url} 
                      alt={selectedImage.magazine_title || 'Image preview'} 
                      className="w-full aspect-[3/4] object-cover rounded-md"
                    />
                  </div>
                  <div className="w-2/3 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Magazine Title</label>
                      <Input
                        defaultValue={selectedImage.magazine_title || ''}
                        onChange={(e) => {
                          setSelectedImage({...selectedImage, magazine_title: e.target.value});
                        }}
                        className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                        placeholder="Enter a title for the magazine spread"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Input
                        defaultValue={selectedImage.category || ''}
                        onChange={(e) => {
                          setSelectedImage({...selectedImage, category: e.target.value});
                        }}
                        className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                        placeholder="E.g., portrait, landscape, editorial"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    defaultValue={selectedImage.description || ''}
                    onChange={(e) => {
                      setSelectedImage({...selectedImage, description: e.target.value});
                    }}
                    className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                    placeholder="Enter a description for the image"
                    rows={4}
                  />
                </div>

                <div className="pt-4 space-x-2 flex">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className={isDark ? 'border-gray-600 hover:bg-gray-700' : ''}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const { id, ...data } = selectedImage;
                      updateMutation.mutate({ id, data });
                    }}
                    className="flex-1"
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Save Changes
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
