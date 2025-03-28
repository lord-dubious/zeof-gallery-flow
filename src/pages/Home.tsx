
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import AtelierSection from "@/components/home/AtelierSection";
import ShopCategories from "@/components/home/ShopCategories";
import { useContent } from "@/hooks/useContentService";

const Home = () => {
  // Using our new Ghost-backed content service
  const { content: homeContent } = useContent("home");

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCollections />
      <AtelierSection />
      <ShopCategories />
    </div>
  );
};

export default Home;
