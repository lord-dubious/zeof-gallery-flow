import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import AtelierSection from "@/components/home/AtelierSection";
import ShopCategories from "@/components/home/ShopCategories";

const Home = () => {
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