import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import AtelierSection from "@/components/home/AtelierSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCollections />
      <AtelierSection />
    </div>
  );
};

export default Home;