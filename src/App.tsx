
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider, useSessionContext } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import CategoryGallery from "./pages/CategoryGallery";
import Admin from "./pages/Admin";
import { supabase } from "./integrations/supabase/client";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Protected route component
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useSessionContext();
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
  const [isCheckingRole, setIsCheckingRole] = React.useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!isLoading && session) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          setIsAdmin(user?.app_metadata?.role === 'admin');
        } catch (error) {
          console.error("Error checking admin role:", error);
          setIsAdmin(false);
        } finally {
          setIsCheckingRole(false);
        }
      } else if (!isLoading) {
        setIsCheckingRole(false);
        setIsAdmin(false);
      }
    };
    
    checkAdminRole();
  }, [session, isLoading]);

  if (isLoading || isCheckingRole) {
    return <div className="container mx-auto py-8">Checking permissions...</div>;
  }

  // For the admin page, we handle the auth redirect within the page component
  // This allows us to show a login form within the admin route
  return <>{children}</>;
};

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabase}>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/gallery/:category" element={<CategoryGallery />} />
                  <Route path="/admin" element={
                    <AdminProtectedRoute>
                      <Admin />
                    </AdminProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </SessionContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
