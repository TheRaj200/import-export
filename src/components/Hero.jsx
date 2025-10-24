import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import heroBg from '../assets/hero-bg.jpg';

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28 pb-28 md:pb-32">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Global trade and shipping" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, transparent 20%, hsl(var(--accent)) 21%, hsl(var(--accent)) 23%, transparent 24%)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            Welcome to
            <motion.span 
              className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Anant Import & Export
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white font-medium mb-6 max-w-3xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Exporting Premium Quality Handicrafts to the World
          </motion.p>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-white/95 mb-12 max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Discover our exquisite collection of carpets, wooden handicrafts, and brass items
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <Button 
              size="lg"
              onClick={scrollToProducts}
              className="bg-amber-500 text-primary hover:bg-amber-400 shadow-2xl text-lg  px-10 py-7 group font-semibold hover:scale-105 transition-all duration-300"
            >
              Explore Our Products
              <ArrowRight className="ml-2 h-5 w-5  group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.div>

      </div>

      {/* Floating scroll indicator - positioned relative to section, not content, to avoid overlap with CTA */}
      <motion.div
        className="pointer-events-none absolute bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
        }}
      >
        <div className="w-7 h-11 border-2 border-white/70 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/10 shadow-lg">
          <motion.div
            className="w-2 h-2 bg-white rounded-full shadow-lg"
            animate={{ y: [0, 18, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
