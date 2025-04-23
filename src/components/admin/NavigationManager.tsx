
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NavigationItem, NavigationItemInsert, NavigationItemUpdate } from "./types";

export const NavigationManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newNavigationItem, setNewNavigationItem] = useState<NavigationItemInsert>({
    title: "",
    path: "",
    display_order: 0,
    is_active: true
  });

  // Fetch navigation items
  const { data: navigationItems, isLoading } = useQuery<NavigationItem[]>({
    queryKey: ['navigation_items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Create mutation for navigation items
  const createMutation = useMutation({
    mutationFn: async (newItem: NavigationItemInsert) => {
      const { data, error } = await supabase
        .from('navigation_items')
        .insert([newItem])
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation_items'] });
      toast({
        title: "Success",
        description: "Navigation item created successfully",
      });
      setIsDialogOpen(false);
      // Reset form
      setNewNavigationItem({
        title: "",
        path: "",
        display_order: 0,
        is_active: true
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

  // Update mutation for navigation items
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: NavigationItemUpdate }) => {
      const { error } = await supabase
        .from('navigation_items')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation_items'] });
      toast({
        title: "Success",
        description: "Navigation item updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update navigation item",
        variant: "destructive",
      });
    },
  });

  // Delete mutation for navigation items
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('navigation_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation_items'] });
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

  const renderNavigationItemForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Title</label>
        <Input
          value={newNavigationItem.title}
          onChange={(e) => setNewNavigationItem(prev => ({
            ...prev, 
            title: e.target.value
          }))}
          placeholder="Navigation Item Title"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Path</label>
        <Input
          value={newNavigationItem.path}
          onChange={(e) => setNewNavigationItem(prev => ({
            ...prev, 
            path: e.target.value
          }))}
          placeholder="/path/to/page"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Display Order</label>
        <Input
          type="number"
          value={newNavigationItem.display_order}
          onChange={(e) => setNewNavigationItem(prev => ({
            ...prev, 
            display_order: parseInt(e.target.value)
          }))}
          placeholder="0"
        />
      </div>
      <Button 
        onClick={() => createMutation.mutate(newNavigationItem)}
        disabled={!newNavigationItem.title || !newNavigationItem.path}
      >
        {createMutation.isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Add Navigation Item
      </Button>
    </div>
  );

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Navigation Item</DialogTitle>
            </DialogHeader>
            {renderNavigationItemForm()}
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {navigationItems?.map((item) => (
            <div 
              key={item.id} 
              className="flex justify-between items-center p-4 border rounded"
            >
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.path}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const updatedItem = { ...item, is_active: !item.is_active };
                    updateMutation.mutate({ 
                      id: item.id, 
                      data: { is_active: !item.is_active } 
                    });
                  }}
                >
                  {item.is_active ? 'Disable' : 'Enable'}
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(item.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
