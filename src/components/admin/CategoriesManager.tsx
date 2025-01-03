import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Move } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const CategoriesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    title: "",
    slug: "",
    description: "",
    display_order: 0
  });

  // Fetch categories
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*, category_items(*)')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newCategory) => {
      const { error } = await supabase
        .from('categories')
        .insert([newCategory]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Success",
        description: "Category created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (category) => {
      const { error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', category.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
      setEditingCategory(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    },
    onError: (error) => {
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={newCategory.display_order}
                  onChange={(e) => setNewCategory({ ...newCategory, display_order: parseInt(e.target.value) })}
                />
              </div>
              <Button 
                onClick={() => createMutation.mutate(newCategory)}
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Create Category'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories?.map((category) => (
            <div key={category.id} className="border rounded-lg p-4">
              {editingCategory?.id === category.id ? (
                <div className="space-y-4">
                  <Input
                    value={editingCategory.title}
                    onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                    placeholder="Title"
                  />
                  <Input
                    value={editingCategory.slug}
                    onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                    placeholder="Slug"
                  />
                  <Textarea
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    placeholder="Description"
                  />
                  <Input
                    type="number"
                    value={editingCategory.display_order}
                    onChange={(e) => setEditingCategory({ ...editingCategory, display_order: parseInt(e.target.value) })}
                    placeholder="Display Order"
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => updateMutation.mutate(editingCategory)}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Save'
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setEditingCategory(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{category.title}</h3>
                      <p className="text-sm text-gray-500">Slug: {category.slug}</p>
                      <p className="text-sm text-gray-500">Order: {category.display_order}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingCategory(category)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteMutation.mutate(category.id)}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Delete'
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.category_items?.map((item) => (
                      <div key={item.id} className="border rounded p-3">
                        <img 
                          src={item.image_path} 
                          alt={item.title}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};