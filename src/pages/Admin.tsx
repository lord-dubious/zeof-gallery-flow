
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import AdminAuth from "@/components/admin/AdminAuth";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ImagesManager } from "@/components/admin/ImagesManager";
import { SettingsManager } from "@/components/admin/SettingsManager";
import ContentManager from "@/components/admin/ContentManager";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { NavigationManager } from "@/components/admin/NavigationManager";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const AdminPage = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSessionContext();
  const [activeTab, setActiveTab] = useState("images");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!isLoading && session) {
        setIsCheckingRole(true);
        try {
          const { data: { user } } = await supabase.auth.getUser();
          
          // Check if user has admin role
          if (user?.app_metadata?.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            // If logged in but not admin, wait a moment then redirect
            setTimeout(() => {
              navigate('/');
            }, 3000);
          }
        } catch (error) {
          console.error("Error checking admin role:", error);
          setIsAdmin(false);
        } finally {
          setIsCheckingRole(false);
        }
      } else if (!isLoading && !session) {
        setIsCheckingRole(false);
        setIsAdmin(false);
      }
    };
    
    checkAdminRole();
  }, [session, isLoading, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Show loading while authentication state is being determined
  if (isLoading || isCheckingRole) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show the login form
  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <AdminAuth />
      </div>
    );
  }

  // If logged in but not admin, show access denied
  if (session && isAdmin === false) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            Access denied. You do not have administrator privileges.
            Redirecting to home page...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // If admin, show the admin dashboard
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="mt-6">
          <ImagesManager />
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <ContentManager />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <CategoriesManager />
        </TabsContent>

        <TabsContent value="navigation" className="mt-6">
          <NavigationManager />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <SettingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
