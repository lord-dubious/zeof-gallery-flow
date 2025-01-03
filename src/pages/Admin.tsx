import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import AdminAuth from "@/components/admin/AdminAuth";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { NavigationManager } from "@/components/admin/NavigationManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { ImagesManager } from "@/components/admin/ImagesManager";
import { SettingsManager } from "@/components/admin/SettingsManager";

const AdminPage = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSessionContext();
  const [activeTab, setActiveTab] = useState("navigation");

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!isLoading && session) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.app_metadata?.role !== 'admin') {
          navigate('/');
        }
      }
    };
    checkAdminRole();
  }, [session, isLoading, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <AdminAuth />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="navigation" className="mt-6">
          <NavigationManager />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <CategoriesManager />
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <ImagesManager />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <SettingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;