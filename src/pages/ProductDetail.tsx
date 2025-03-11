
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Loader2, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { getProduct } from '../api/shopApi';
import { Button } from '../components/ui/button';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (newQty) => {
    if (newQty > 0 && newQty <= 10) {
      setQuantity(newQty);
    }
  };

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
              <div className="flex items-center">
                <span className="text-sm text-gray-600 uppercase tracking-wider mr-2">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">In Stock</span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Out of Stock</span>
                )}
              </div>
              <h1 className="text-3xl font-serif mt-2 mb-2">{product.name}</h1>
              <p className="text-xl text-zeof-gold font-medium">${product.price.toFixed(2)}</p>
            </div>
            
            <div className="prose prose-sm">
              <p>{product.description}</p>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center mb-6">
                <span className="mr-4 font-medium">Quantity</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-zeof-gold hover:bg-zeof-gold/90 w-full sm:w-auto flex items-center justify-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-medium mb-2">Product Details</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>SKU: {product.id}</li>
                <li>Category: {product.category}</li>
                <li>Handcrafted in Italy</li>
                <li>Free shipping on orders over $200</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
