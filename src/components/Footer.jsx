import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-primary via-primary to-primary/95 text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--accent)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Globe className="h-8 w-8 text-accent drop-shadow-lg" />
              <div>
                <h3 className="text-2xl font-bold">Anant</h3>
                <p className="text-sm text-primary-foreground/80">Import & Export</p>
              </div>
            </motion.div>
            <p className="text-primary-foreground/90 leading-relaxed">
              Connecting global markets with India's finest handicrafts. Quality, tradition, and excellence in every piece.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="h-5 w-5 text-accent" />
                <a href="mailto:info@anantimportexport.com" className="hover:text-accent transition-smooth">
                  info@anantimportexport.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="h-5 w-5 text-accent" />
                <a href="tel:+911234567890" className="hover:text-accent transition-smooth">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-5 w-5 text-accent mt-1" />
                <span>Export Hub, Trade Center<br />Mumbai, India</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Anant Import & Export. All rights reserved.
          </p>
          
          <Button
            onClick={scrollToTop}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 group"
          >
            Back to Top
            <ArrowUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
