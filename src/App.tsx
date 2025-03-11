
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PWAContext, ConfigProvider as RSFConfigProvider } from 'react-storefront';
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import CategoryGallery from "./pages/CategoryGallery";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import { supabase } from "./integrations/supabase/client";

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// React Storefront configuration
const rsfConfig = {
  imageService: {
    provider: 'simple',
    parameters: {}
  }
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <RSFConfigProvider config={rsfConfig}>
          <PWAContext.Provider value={{ 
            hydrated: true, 
            revalidate: async () => {}, 
            prefetch: async () => {} 
          }}>
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
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/product/:id" element={<ProductDetail />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </PWAContext.Provider>
        </RSFConfigProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default App;
