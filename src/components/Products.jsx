import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { products } from '../data/products';

const productCards = products.map((p) => ({
  title: p.title,
  description: p.description,
  image: p.image,
  slug: p.slug,
}));

const ProductCard = ({ product, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
    >
      <Card className="overflow-hidden gradient-card shadow-elegant hover:shadow-gold transition-all duration-500 group cursor-pointer h-full border-2 border-transparent hover:border-accent/20">
        <div className="relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover"
            whileHover={{ scale: 1.15, rotate: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-500" />
        
        </div>
        <CardContent className="p-6">
          <motion.h3 
            className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300 flex justify-between items-center"
          >
            {product.title}
            <span className="text-gray-900 w-[50%] scale-90  h-[50px] text-sm flex justify-end items-center font-bold md:text-lg hover:text-gray-600 rounded-full  z-[999]">View Details</span>
          </motion.h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Products
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Discover our carefully curated collection of premium handicrafts, each piece representing the finest craftsmanship and cultural heritage.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCards.map((product, index) => (
            <Link key={product.slug} to={`/products/${product.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-accent rounded-lg">
              <ProductCard product={product} index={index} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
