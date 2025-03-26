
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/use-theme";
import { LockKeyhole, ShieldCheck } from "lucide-react";

const AdminAuth = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`max-w-md mx-auto p-8 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="flex flex-col items-center mb-8">
        <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-serif mb-1 text-center">Admin Login</h1>
        <p className="text-sm text-gray-500 text-center">
          Enter your credentials to access the admin panel
        </p>
      </div>
      
      <div className={`border-t border-b py-6 my-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            extend: true,
            className: {
              button: `${isDark ? 'bg-primary hover:bg-primary/90' : ''}`,
              input: `${isDark ? 'bg-gray-700 border-gray-600' : ''}`,
              label: `${isDark ? 'text-gray-300' : ''}`,
            }
          }}
          theme={isDark ? 'dark' : 'light'}
          providers={[]}
        />
      </div>
      
      <div className="text-sm text-center text-gray-500">
        <div className="flex items-center justify-center mb-2">
          <LockKeyhole className="h-4 w-4 mr-1" />
          <span>Secure Login</span>
        </div>
        <p>
          This area is restricted to authorized administrators only.
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;
