
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const collections = [
  {
    title: "Bespoke Suits",
    description: "Tailored perfection for the distinguished gentleman",
    imageRole: "suits_collection",
    link: "/gallery/suits"
  },
  {
    title: "Evening Wear",
    description: "Sophistication for memorable occasions",
    imageRole: "evening_collection",
    link: "/gallery/evening-wear"
  },
  {
    title: "Footwears",
    description: "Finishing touches of refinement",
    imageRole: "accessories_collection",
    link: "/gallery/accessories"
  }
];

const FeaturedCollections = () => {
  const { data: images, isLoading } = useQuery({
    queryKey: ['featured-collection-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .in('image_role', ['suits_collection', 'evening_collection', 'accessories_collection'])
        .eq('is_published', true);
      
      if (error) throw error;
      return data;
    }
  });

  const getImageUrl = (imageRole: string) => {
    const image = images?.find(img => img.image_role === imageRole);
    return image?.url || 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?q=80&w=2680';
  };

  return (
    <section className="py-24 bg-zeof-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-zeof-gold font-serif italic mb-4 block">Collections</span>
          <h2 className="text-4xl font-serif mb-4 text-white">Masterpieces of Craftsmanship</h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-light">
            Discover our curated collections, where each piece embodies the pinnacle of sartorial excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Link to={collection.link} key={collection.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-4">
                  {isLoading ? (
                    <Skeleton className="w-full h-[500px]" />
                  ) : (
                    <img
                      src={getImageUrl(collection.imageRole)}
                      alt={collection.title}
                      className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
                </div>
                <h3 className="text-2xl font-serif mb-2 text-white">{collection.title}</h3>
                <p className="text-gray-300 font-light">{collection.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
