
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { strapi } from "@/integrations/strapi/client";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CategoryForm } from "./CategoryForm";
import { CategoryItem } from "./CategoryItem";
import { fetchCategories } from "@/services/content";
import type { Category, CategoryInsert, CategoryUpdate, CategoryFormData } from "./types";

export const CategoriesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch categories
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Function to upload image to storage
  const uploadImage = async (file: File): Promise<string> => {
    try {
      // Upload to Strapi first
      const formData = new FormData();
      formData.append('files', file);
      const uploadRes = await strapi.axios.post('/upload', formData);
      
      if (uploadRes.data && uploadRes.data[0]) {
        return `${strapi.axios.defaults.baseURL}${uploadRes.data[0].url}`;
      }
      
      throw new Error('Image upload to Strapi failed');
    } catch (strapiError) {
      console.error("Error uploading to Strapi, falling back to Supabase:", strapiError);
      
      // Fallback to Supabase
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `categories/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);
      
      return publicUrl;
    }
  };

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newCategory: CategoryFormData) => {
      let image_url = newCategory.image_url || null;
      
      // If there's an image file, upload it first
      if (newCategory.image) {
        image_url = await uploadImage(newCategory.image);
      }
      
      try {
        // Try to create in Strapi first
        await strapi.create('categories', {
          data: {
            title: newCategory.title,
            slug: newCategory.slug,
            description: newCategory.description,
            display_order: newCategory.display_order,
            image_url,
            is_active: newCategory.is_active
          }
        });
      } catch (strapiError) {
        console.error("Error creating category in Strapi, falling back to Supabase:", strapiError);
        
        // Fallback to Supabase
        const categoryData: CategoryInsert = {
          title: newCategory.title,
          slug: newCategory.slug,
          description: newCategory.description,
          display_order: newCategory.display_order,
          image_url,
          is_active: newCategory.is_active
        };
        
        const { error } = await supabase
          .from('categories')
          .insert([categoryData]);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Success",
        description: "Category created successfully",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error("Create error:", error);
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CategoryFormData }) => {
      let image_url = data.image_url || null;
      
      // If there's an image file, upload it first
      if (data.image) {
        image_url = await uploadImage(data.image);
      }
      
      try {
        // Try to update in Strapi first
        await strapi.update('categories', id, {
          data: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            display_order: data.display_order,
            image_url,
            is_active: data.is_active
          }
        });
      } catch (strapiError) {
        console.error("Error updating category in Strapi, falling back to Supabase:", strapiError);
        
        // Fallback to Supabase
        const categoryData: CategoryUpdate = {
          title: data.title,
          slug: data.slug,
          description: data.description,
          display_order: data.display_order,
          image_url,
          is_active: data.is_active
        };
        
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', id);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        // Try to delete from Strapi first
        await strapi.delete('categories', id);
      } catch (strapiError) {
        console.error("Error deleting category from Strapi, falling back to Supabase:", strapiError);
        
        // Fallback to Supabase
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete category",
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
        <CardTitle>Categories Management</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm
              onSubmit={(data) => createMutation.mutate(data)}
              isLoading={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories?.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onUpdate={(data) => updateMutation.mutate({ id: category.id, data })}
              onDelete={() => deleteMutation.mutate(category.id)}
              isUpdating={updateMutation.isPending}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
