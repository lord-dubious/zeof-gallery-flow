
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
import { 
  BookOpen, 
  Grid, 
  Home, 
  Image, 
  Layers, 
  LogOut, 
  Menu, 
  Moon, 
  Settings, 
  Sun, 
  User, 
  X
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Separator } from "@/components/ui/separator";

const AdminPage = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSessionContext();
  const [activeTab, setActiveTab] = useState("navigation");
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!isLoading && session) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.app_metadata?.role !== 'admin') {
          navigate('/');
        }
        setUsername(user?.email || user?.user_metadata?.full_name || null);
      }
    };
    checkAdminRole();
  }, [session, isLoading, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <AdminAuth />
      </div>
    );
  }

  const isDark = theme === 'dark';
  
  const tabItems = [
    { id: "navigation", label: "Navigation", icon: <Layers className="h-5 w-5" /> },
    { id: "categories", label: "Categories", icon: <Grid className="h-5 w-5" /> },
    { id: "images", label: "Images", icon: <Image className="h-5 w-5" /> },
    { id: "content", label: "Content", icon: <BookOpen className="h-5 w-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div id="admin-container" className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 border-r p-4 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center space-x-2 mb-8">
          <div className={`w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold`}>
            A
          </div>
          <h1 className="text-xl font-serif">Admin Panel</h1>
        </div>
        
        <div className="space-y-1">
          {tabItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === item.id ? "" : isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-auto space-y-4">
          <Separator className={isDark ? 'bg-gray-700' : 'bg-gray-200'} />
          
          <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary mr-2 flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{username || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleTheme}
                className={isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                className={isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Site
          </Button>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div className={`md:hidden flex items-center justify-between p-4 border-b ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <h1 className="text-xl font-serif">Admin Panel</h1>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className={`h-full w-[280px] p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif">Menu</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="space-y-1">
              {tabItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === item.id ? "" : isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              ))}
            </div>
            
            <div className="mt-8">
              <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary mr-2 flex items-center justify-center text-white">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{username || 'Admin User'}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full justify-start mb-2"
                onClick={() => navigate('/')}
              >
                <Home className="h-4 w-4 mr-2" />
                Return to Site
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="md:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden">
            <TabsList>
              {tabItems.map(item => (
                <TabsTrigger key={item.id} value={item.id}>{item.label}</TabsTrigger>
              ))}
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
          
          {/* Visible Content based on activeTab */}
          <div>
            <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
              {tabItems.find(item => item.id === activeTab)?.icon}
              {tabItems.find(item => item.id === activeTab)?.label}
            </h2>
            
            {activeTab === "navigation" && <NavigationManager />}
            {activeTab === "categories" && <CategoriesManager />}
            {activeTab === "images" && <ImagesManager />}
            {activeTab === "content" && <ContentManager />}
            {activeTab === "settings" && <SettingsManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
