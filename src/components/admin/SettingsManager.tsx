
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroImageManager } from "./settings/HeroImageManager";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Database, LayoutGrid, Link2, Paintbrush, Server, Settings2, ShieldCheck } from "lucide-react";

export const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState("site");
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const tabs = [
    { id: "site", label: "Site Configuration", icon: <Server className="h-4 w-4 mr-2" /> },
    { id: "hero", label: "Hero Images", icon: <Paintbrush className="h-4 w-4 mr-2" /> },
    { id: "layout", label: "Layout", icon: <LayoutGrid className="h-4 w-4 mr-2" /> },
    { id: "integrations", label: "Integrations", icon: <Link2 className="h-4 w-4 mr-2" /> },
    { id: "permissions", label: "Permissions", icon: <ShieldCheck className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif">Settings</h2>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4 mr-2" />
          Reset Defaults
        </Button>
      </div>

      <div className={`flex flex-wrap gap-2 p-1 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        {tabs.map((tab) => (
          <Button 
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"} 
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center transition-all ${
              activeTab === tab.id 
                ? "shadow-sm" 
                : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
            size="sm"
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === "site" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className={`p-6 transition-all hover:shadow-md ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
            <div className="flex items-center mb-4">
              <Database className="h-5 w-5 mr-2 text-primary" />
              <h3 className="text-xl font-medium">Supabase Configuration</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project URL</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className={`w-full p-2 pr-10 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    value={`${window.location.origin}`} 
                    readOnly 
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin);
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Set this as your Site URL in Supabase Authentication settings</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Redirect URLs</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className={`w-full p-2 pr-10 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    value={`${window.location.origin}/*`} 
                    readOnly 
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/*`);
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Add this to your Redirect URLs in Supabase Authentication settings</p>
              </div>
            </div>
          </Card>

          <Card className={`p-6 transition-all hover:shadow-md ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
            <div className="flex items-center mb-4">
              <Server className="h-5 w-5 mr-2 text-primary" />
              <h3 className="text-xl font-medium">Storage Settings</h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm">Current storage buckets:</p>
              <div className="space-y-2">
                {['images', 'site-images'].map(bucket => (
                  <div key={bucket} className={`flex items-center p-3 rounded-md ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <span className="flex-1 font-medium">{bucket}</span>
                    <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                      Public
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className={`p-6 transition-all hover:shadow-md md:col-span-2 ${isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
            <div className="flex items-center mb-4">
              <Link2 className="h-5 w-5 mr-2 text-primary" />
              <h3 className="text-xl font-medium">Quick Links</h3>
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              <Button 
                variant="outline" 
                className={`justify-start ${isDark ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                onClick={() => window.open('https://supabase.com/dashboard/project/vbkgqcdvbijtlcooiuga/auth/providers', '_blank')}
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                Authentication Settings
              </Button>
              <Button 
                variant="outline" 
                className={`justify-start ${isDark ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                onClick={() => window.open('https://supabase.com/dashboard/project/vbkgqcdvbijtlcooiuga/storage/buckets', '_blank')}
              >
                <Database className="h-4 w-4 mr-2" />
                Storage Settings
              </Button>
              <Button 
                variant="outline" 
                className={`justify-start ${isDark ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                onClick={() => window.open('https://supabase.com/dashboard/project/vbkgqcdvbijtlcooiuga/auth/users', '_blank')}
              >
                <Settings2 className="h-4 w-4 mr-2" />
                User Management
              </Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "hero" && (
        <HeroImageManager />
      )}

      {(activeTab === "layout" || activeTab === "integrations" || activeTab === "permissions") && (
        <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
          <div className="text-center py-8">
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-gray-500">This feature is currently under development.</p>
          </div>
        </Card>
      )}
    </div>
  );
};
