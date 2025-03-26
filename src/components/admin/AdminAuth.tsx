
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/hooks/use-theme";

const AdminAuth = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`max-w-md mx-auto p-8 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h1 className="text-2xl font-serif mb-6 text-center">Admin Login</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme={isDark ? 'dark' : 'light'}
        providers={[]}
      />
    </div>
  );
};

export default AdminAuth;
