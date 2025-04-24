
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AdminAuth = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  // Listen for authentication events
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        // Reset any previous errors when user signs in
        setAuthError(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Listen for auth errors
  useEffect(() => {
    const handleAuthError = (event: CustomEvent) => {
      if (event.detail?.error) {
        setAuthError(event.detail.error.message || 'Authentication error occurred');
      }
    };

    // Add event listener for Supabase auth errors
    window.addEventListener('supabase.auth.error', handleAuthError as EventListener);

    return () => {
      window.removeEventListener('supabase.auth.error', handleAuthError as EventListener);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-serif mb-6 text-center">Admin Login</h1>
      
      {authError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}
      
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-4">
          Please sign in with your admin credentials. Only authorized admin users can access this area.
        </p>
      </div>
      
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={[]}
      />
    </div>
  );
};

export default AdminAuth;
