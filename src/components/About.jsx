import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Globe2, Heart, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Every product meets international quality standards',
  },
  {
    icon: Globe2,
    title: 'Global Reach',
    description: 'Exporting to multiple countries worldwide',
  },
  {
    icon: Heart,
    title: 'Craftsmanship',
    description: 'Supporting traditional artisans and their heritage',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description: 'Continuously expanding our product range',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            About Our Company
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground text-center leading-relaxed mb-6"
          >
            Anant Import & Export is a distinguished name in the international trade of premium handicrafts. 
            With years of expertise in the industry, we have built strong relationships with master artisans 
            and suppliers across India, enabling us to source and deliver the finest quality products.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground text-center leading-relaxed"
          >
            Our mission is to showcase India's rich cultural heritage through exquisite carpets, wooden handicrafts, 
            and brass items, connecting global markets with authentic craftsmanship while supporting traditional artisan communities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 shadow-elegant group-hover:shadow-gold"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="h-10 w-10" />
                </motion.div>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
