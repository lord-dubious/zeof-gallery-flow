
import { useQuery } from "@tanstack/react-query";
import { fetchSiteContent } from "@/services/content";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import AtelierSection from "@/components/home/AtelierSection";
import ShopCategories from "@/components/home/ShopCategories";

const Home = () => {
  // Fetch site content for home page
  const { data: homeContent } = useQuery({
    queryKey: ["home-content"],
    queryFn: async () => {
      const content = await fetchSiteContent("home");
      return content;
    },
  });

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
