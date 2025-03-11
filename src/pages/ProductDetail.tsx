
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import { getProduct } from '../api/shopApi';
import { Button } from '../components/ui/button';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setProduct(data.product);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-zeof-gold" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <a href="/shop">Return to Shop</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <Helmet>
        <title>{product.name} - ZEOF Shop</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-gray-100 rounded-md">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage].src}
                alt={product.images[activeImage].alt}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                      activeImage === index ? 'ring-2 ring-zeof-gold' : ''
                    }`}
                  >
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              <p className="text-xl text-zeof-gold font-medium">${product.price.toFixed(2)}</p>
            </div>
            
            <div className="prose prose-sm">
              <p>{product.description}</p>
            </div>
            
            <div className="pt-6">
              <Button size="lg" className="w-full md:w-auto bg-zeof-gold hover:bg-zeof-gold/90">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
