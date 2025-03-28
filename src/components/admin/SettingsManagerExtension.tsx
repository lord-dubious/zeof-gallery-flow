
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/use-theme";

export const SettingsManagerExtension = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  useEffect(() => {
    const useLocal = localStorage.getItem('use_local_storage') === 'true';
    setUseLocalStorage(useLocal);
  }, []);

  const handleToggleLocalStorage = (checked: boolean) => {
    localStorage.setItem('use_local_storage', checked ? 'true' : 'false');
    setUseLocalStorage(checked);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Data Storage Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 py-2">
          <Switch 
            id="local-storage-mode"
            checked={useLocalStorage}
            onCheckedChange={handleToggleLocalStorage}
          />
          <Label htmlFor="local-storage-mode">
            Use Local Storage (Development Mode)
          </Label>
        </div>
        <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          When enabled, all content will be stored in your browser's local storage instead of Supabase.
          This is useful for development when you want to test changes without affecting the production database.
          <span className="block mt-1 font-medium text-yellow-500">
            Warning: Content stored locally will not be accessible from other devices or browsers.
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
