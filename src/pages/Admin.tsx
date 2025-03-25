
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
import ContentManager from "@/components/admin/content/ContentManager";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const AdminPage = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSessionContext();
  const [activeTab, setActiveTab] = useState("navigation");
  const { theme, toggleTheme } = useTheme();

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

  // Hide the site navigation in admin panel
  useEffect(() => {
    const mainNav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    if (mainNav) mainNav.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    return () => {
      if (mainNav) mainNav.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);

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

  const isDark = theme === 'dark';

  return (
    <div id="admin-container" className={`min-h-screen py-6 px-4 md:px-6 ${isDark ? 'bg-gray-900 text-white' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-serif">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleTheme}
            className={isDark ? 'bg-gray-800 border-gray-700' : ''}
          >
            {isDark ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className={isDark ? 'bg-gray-800 border-gray-700' : ''}
          >
            Sign Out
          </Button>
        </div>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className={`w-full ${isDark ? 'text-white' : ''}`}
      >
        <TabsList className={`grid w-full grid-cols-5 lg:w-auto ${isDark ? 'bg-gray-800' : ''}`}>
          <TabsTrigger 
            value="navigation" 
            className={isDark ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white' : ''}
          >
            Navigation
          </TabsTrigger>
          <TabsTrigger 
            value="categories" 
            className={isDark ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white' : ''}
          >
            Categories
          </TabsTrigger>
          <TabsTrigger 
            value="images" 
            className={isDark ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white' : ''}
          >
            Images
          </TabsTrigger>
          <TabsTrigger 
            value="content" 
            className={isDark ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white' : ''}
          >
            Content
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className={isDark ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white' : ''}
          >
            Settings
          </TabsTrigger>
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

        <TabsContent value="content" className="mt-6">
          <ContentManager />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <SettingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
