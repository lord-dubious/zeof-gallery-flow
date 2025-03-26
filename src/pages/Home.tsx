
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import AtelierSection from "@/components/home/AtelierSection";
import ShopCategories from "@/components/home/ShopCategories";

const Home = () => {
  // Fetch site content for home page
  const { data: homeContent } = useQuery({
    queryKey: ["home-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", "home")
        .order("section", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <HeroSection content={homeContent?.find(content => content.section === "hero")} />
      <FeaturedCollections content={homeContent?.find(content => content.section === "featured")} />
      <AtelierSection content={homeContent?.find(content => content.section === "atelier")} />
      <ShopCategories content={homeContent?.find(content => content.section === "shop")} />
    </div>
  );
};

export default Home;
