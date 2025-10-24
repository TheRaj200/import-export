import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const countries = [
  { name: 'United States', flag: '🇺🇸', code: 'US' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
  { name: 'Germany', flag: '🇩🇪', code: 'DE' },
  { name: 'France', flag: '🇫🇷', code: 'FR' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA' },
  { name: 'Australia', flag: '🇦🇺', code: 'AU' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE' },
  { name: 'Singapore', flag: '🇸🇬', code: 'SG' },
  { name: 'Japan', flag: '🇯🇵', code: 'JP' },
  { name: 'Netherlands', flag: '🇳🇱', code: 'NL' },
  { name: 'Switzerland', flag: '🇨🇭', code: 'CH' },
  { name: 'Italy', flag: '🇮🇹', code: 'IT' },
];

const ExportingCountries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="countries" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background world map effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Exporting Countries
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We proudly serve customers across the globe, delivering premium quality handicrafts to these countries and beyond.
          </p>
        </motion.div>

        {/** Modern, smooth staggered grid animation */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
        >
          {countries.map((country) => (
            <motion.div
              key={country.code}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 140, damping: 18, mass: 0.6 },
                },
              }}
              whileHover={{ y: -8, scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform' }}
              className="gradient-card shadow-elegant rounded-xl p-6 text-center group cursor-pointer hover:shadow-gold transition-all duration-300 border-2 border-transparent hover:border-accent/30 bg-white"
            >
              <motion.div
                className="text-6xl mb-3"
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                {country.flag}
              </motion.div>
              <h3 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                {country.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            ...and many more countries worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExportingCountries;
