
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Product } from "@/types/shop";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-16">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/shop/product/${product.id}`} className="block">
        <div className="overflow-hidden rounded-md mb-4 aspect-square bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-serif mb-1">{product.name}</h3>
        <p className="text-zeof-gold font-medium">${product.price.toFixed(2)}</p>
      </Link>
    </motion.div>
  );
};

export default ProductGrid;
