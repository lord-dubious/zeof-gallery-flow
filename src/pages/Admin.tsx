import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import AdminAuth from "@/components/admin/AdminAuth";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const AdminPage = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSessionContext();
  const [activeTab, setActiveTab] = useState("navigation");

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!isLoading && session) {
        const { data: { user } } = await supabase.auth.getUser();
        // Check if user has admin role in their metadata
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
          <h2 className="text-2xl font-serif mb-4">Navigation Management</h2>
          <div className="space-y-4">
            <p>Manage website navigation items here.</p>
            {/* Navigation management implementation */}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <h2 className="text-2xl font-serif mb-4">Categories Management</h2>
          <div className="space-y-4">
            <p>Manage product categories and subcategories here.</p>
            {/* Categories management implementation */}
          </div>
        </TabsContent>

        <TabsContent value="images" className="mt-6">
          <h2 className="text-2xl font-serif mb-4">Images Management</h2>
          <div className="space-y-4">
            <p>Upload and manage website images here.</p>
            {/* Images management implementation */}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <h2 className="text-2xl font-serif mb-4">Settings</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Supabase Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project URL</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded" 
                    value={`${window.location.origin}`} 
                    readOnly 
                  />
                  <p className="text-sm text-gray-500 mt-1">Set this as your Site URL in Supabase Authentication settings</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Redirect URLs</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded" 
                    value={`${window.location.origin}/*`} 
                    readOnly 
                  />
                  <p className="text-sm text-gray-500 mt-1">Add this to your Redirect URLs in Supabase Authentication settings</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Storage Settings</h3>
              <div className="space-y-4">
                <p>Current storage buckets:</p>
                <ul className="list-disc list-inside">
                  <li>images (Public)</li>
                  <li>site-images (Public)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => window.open('https://supabase.com/dashboard/project/vbkgqcdvbijtlcooiuga/auth/providers', '_blank')}
                >
                  Authentication Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => window.open('https://supabase.com/dashboard/project/vbkgqcdvbijtlcooiuga/storage/buckets', '_blank')}
                >
                  Storage Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => window.open('https://supabase.com/dashboard/project/vbkgqcdvbijtlcooiuga/auth/users', '_blank')}
                >
                  User Management
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;