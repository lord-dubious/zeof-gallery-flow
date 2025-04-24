
import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AdminAuth = () => {
  const [authError, setAuthError] = useState<string | null>(null);

  // Listen for authentication events
  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      // Reset any previous errors when user signs in
      setAuthError(null);
    }
  });

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
        onError={(error) => {
          setAuthError(error.message);
        }}
      />
    </div>
  );
};

export default AdminAuth;
