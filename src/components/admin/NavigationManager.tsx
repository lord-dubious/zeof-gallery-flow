import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const NavigationManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    title: "",
    path: "",
    display_order: 0
  });

  // Fetch navigation items
  const { data: navigationItems, isLoading } = useQuery({
    queryKey: ['navigation-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (newItem) => {
      const { error } = await supabase
        .from('navigation_items')
        .insert([newItem]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
      toast({
        title: "Success",
        description: "Navigation item created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create navigation item",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (item) => {
      const { error } = await supabase
        .from('navigation_items')
        .update(item)
        .eq('id', item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
      toast({
        title: "Success",
        description: "Navigation item updated successfully",
      });
      setEditingItem(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update navigation item",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('navigation_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation-items'] });
      toast({
        title: "Success",
        description: "Navigation item deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete navigation item",
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
        <CardTitle>Navigation Management</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Navigation Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="path">Path</Label>
                <Input
                  id="path"
                  value={newItem.path}
                  onChange={(e) => setNewItem({ ...newItem, path: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={newItem.display_order}
                  onChange={(e) => setNewItem({ ...newItem, display_order: parseInt(e.target.value) })}
                />
              </div>
              <Button 
                onClick={() => createMutation.mutate(newItem)}
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Create Item'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {navigationItems?.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded">
              {editingItem?.id === item.id ? (
                <div className="flex-1 space-y-4">
                  <Input
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="Title"
                  />
                  <Input
                    value={editingItem.path}
                    onChange={(e) => setEditingItem({ ...editingItem, path: e.target.value })}
                    placeholder="Path"
                  />
                  <Input
                    type="number"
                    value={editingItem.display_order}
                    onChange={(e) => setEditingItem({ ...editingItem, display_order: parseInt(e.target.value) })}
                    placeholder="Display Order"
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => updateMutation.mutate(editingItem)}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Save'
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setEditingItem(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">Path: {item.path}</p>
                    <p className="text-sm text-gray-500">Order: {item.display_order}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingItem(item)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteMutation.mutate(item.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Delete'
                      )}
                    </Button>
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