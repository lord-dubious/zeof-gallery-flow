
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";

// Home Components
import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import ShopCategories from "@/components/home/ShopCategories";

// Nav and Footer
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Home Page
const HomePage = () => (
  <>
    <Navigation />
    <main>
      <HeroSection />
      <FeaturedCollections />
      <ShopCategories />
    </main>
    <Footer />
  </>
);

// Simple About Page
const AboutPage = () => (
  <>
    <Navigation />
    <div className="pt-32 pb-16 bg-zeof-cream">
      <div className="container mx-auto px-8">
        <h1 className="text-5xl font-serif mb-8 text-center">About Us</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            Founded in 1985, our atelier brings together the finest craftsmen dedicated to the art of bespoke tailoring. 
            With meticulous attention to detail and a passion for excellence, we create timeless pieces that reflect individual style and sophistication.
          </p>
          <p className="text-lg mb-6">
            Each garment is crafted using traditional techniques handed down through generations, combined with contemporary design sensibilities to create truly unique pieces.
          </p>
          <p className="text-lg mb-6">
            Our commitment to quality extends beyond our craftsmanship to the materials we source, working with only the finest fabrics from the most prestigious mills around the world.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

// Simple Gallery Page
const GalleryPage = () => (
  <>
    <Navigation />
    <div className="pt-32 pb-16 bg-zeof-black">
      <div className="container mx-auto px-8">
        <h1 className="text-5xl font-serif mb-8 text-center text-white">Our Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="overflow-hidden group">
              <img 
                src={`https://images.unsplash.com/photo-159493832887${item}-9623159c8c99?q=80&w=2680`} 
                alt={`Gallery item ${item}`}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </>
);

// Simple Contact Page
const ContactPage = () => (
  <>
    <Navigation />
    <div className="pt-32 pb-16 bg-zeof-cream">
      <div className="container mx-auto px-8">
        <h1 className="text-5xl font-serif mb-8 text-center">Contact Us</h1>
        <div className="max-w-md mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea rows={5} className="w-full p-2 border border-gray-300 rounded"></textarea>
            </div>
            <button type="submit" className="bg-zeof-gold hover:bg-zeof-brown text-white px-6 py-3 rounded transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
