import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Edit, Trash2, Plus, Move, GripVertical, ExternalLink } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useNavigation } from "@/hooks/useContentService";
import type { NavigationItem } from "@/components/admin/types";

export const NavigationManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Omit<NavigationItem, "id" | "created_at" | "updated_at">>({
    title: "",
    path: "",
    display_order: 0,
    is_external: false,
    is_active: true
  });
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Use our new useNavigation hook
  const { 
    navigationItems, 
    isLoading, 
    createItem, 
    updateItem, 
    deleteItem,
    isPending
  } = useNavigation();

  // Move item handler
  const handleMoveItem = (item: NavigationItem, direction: 'up' | 'down') => {
    if (!navigationItems) return;
    
    const currentIndex = navigationItems.findIndex(navItem => navItem.id === item.id);
    if (direction === 'up' && currentIndex > 0) {
      const swapWithItem = navigationItems[currentIndex - 1];
      updateItem({ 
        id: item.id!, 
        data: { display_order: swapWithItem.display_order }
      });
      updateItem({
        id: swapWithItem.id!,
        data: { display_order: item.display_order }
      });
    } else if (direction === 'down' && currentIndex < navigationItems.length - 1) {
      const swapWithItem = navigationItems[currentIndex + 1];
      updateItem({
        id: item.id!,
        data: { display_order: swapWithItem.display_order }
      });
      updateItem({
        id: swapWithItem.id!,
        data: { display_order: item.display_order }
      });
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
        <CardTitle>Navigation Management</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
            <DialogHeader>
              <DialogTitle>Add Navigation Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={newItem.title} 
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Path</label>
                <Input 
                  value={newItem.path} 
                  onChange={(e) => setNewItem({...newItem, path: e.target.value})}
                  className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is-external"
                  checked={newItem.is_external}
                  onCheckedChange={(checked) => setNewItem({...newItem, is_external: checked as boolean})}
                  className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                />
                <label 
                  htmlFor="is-external"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  External Link
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="is-active"
                  checked={newItem.is_active}
                  onCheckedChange={(checked) => setNewItem({...newItem, is_active: checked as boolean})}
                  className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                />
                <label 
                  htmlFor="is-active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active
                </label>
              </div>
              <div className="pt-4">
                <Button 
                  onClick={() => createItem(newItem)}
                  disabled={!newItem.title || !newItem.path || isPending}
                  className="w-full"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Create Navigation Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className={`rounded-md border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {navigationItems?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No navigation items found. Add your first item.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {navigationItems?.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 flex items-center justify-between transition-colors ${
                    !item.is_active ? 'bg-gray-50 dark:bg-gray-800/50 opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}>
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        {item.title}
                        {item.is_external && (
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        )}
                        {!item.is_active && (
                          <span className={`text-xs px-2 py-0.5 rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            Inactive
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">{item.path}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMoveItem(item, 'up')}
                      disabled={navigationItems.indexOf(item) === 0}
                      className={isDark ? 'border-gray-700 hover:bg-gray-700' : ''}
                    >
                      ↑
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMoveItem(item, 'down')}
                      disabled={navigationItems.indexOf(item) === navigationItems.length - 1}
                      className={isDark ? 'border-gray-700 hover:bg-gray-700' : ''}
                    >
                      ↓
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingItem(item)}
                      className={isDark ? 'border-gray-700 hover:bg-gray-700' : ''}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteItem(item.id!)}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      {/* Edit Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
            <DialogHeader>
              <DialogTitle>Edit Navigation Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={editingItem.title} 
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Path</label>
                <Input 
                  value={editingItem.path} 
                  onChange={(e) => setEditingItem({...editingItem, path: e.target.value})}
                  className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="edit-is-external"
                  checked={editingItem.is_external}
                  onCheckedChange={(checked) => setEditingItem({...editingItem, is_external: checked as boolean})}
                  className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                />
                <label 
                  htmlFor="edit-is-external"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  External Link
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="edit-is-active"
                  checked={editingItem.is_active}
                  onCheckedChange={(checked) => setEditingItem({...editingItem, is_active: checked as boolean})}
                  className={isDark ? 'bg-gray-700 border-gray-600' : ''}
                />
                <label 
                  htmlFor="edit-is-active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active
                </label>
              </div>
              <div className="pt-4">
                <Button 
                  onClick={() => {
                    const { id, ...data } = editingItem;
                    updateItem({ id: id!, data });
                  }}
                  disabled={!editingItem.title || !editingItem.path || isPending}
                  className="w-full"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Edit className="h-4 w-4 mr-2" />
                  )}
                  Update Navigation Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};
