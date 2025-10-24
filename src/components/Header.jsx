import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const location = useLocation();
  const isHome = location.pathname === '/';
  const solidHeader = isScrolled || !isHome; 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const sections = isHome ? ['home', 'products', 'about', 'countries'] : [];
    const observers = [];
    let io;

    if (isHome) {
      // Intersection observer for scrollspy (only on home page)
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
      );

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && io) {
          io.observe(el);
          observers.push(el);
        }
      });
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (io) {
        observers.forEach((el) => io.unobserve(el));
        io.disconnect();
      }
    };
  }, [isHome]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solidHeader ? 'bg-background/90 backdrop-blur-md shadow-elegant border-b border-border/60' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center gap-2">
              <Globe className={`h-8 w-8 ${solidHeader ? 'text-accent' : 'text-white drop-shadow-lg'}`} />
              <div className="leading-tight">
                <h1 className={`text-xl font-extrabold tracking-tight ${solidHeader ? 'text-primary' : 'text-white drop-shadow-lg'}`}>
                  <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent">Anant</span>
                </h1>
                <p className={`text-[11px] ${solidHeader ? 'text-muted-foreground' : 'text-white/85 drop-shadow-md'}`}>Import & Export</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[ 
              { label: 'Home', id: 'home' },
              { label: 'Our Products', id: 'products' },
              { label: 'About Company', id: 'about' },
              { label: 'Exporting Countries', id: 'countries' },
            ].map((item, index) => (
              item.id === 'home' && !isHome ? (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 + 0.25, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to="/"
                    className={`text-sm font-medium transition-colors relative group ${
                      solidHeader ? 'text-foreground' : 'text-white drop-shadow'
                    }`}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 + 0.25, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors relative group ${
                    solidHeader ? 'text-foreground' : 'text-white drop-shadow'
                  } ${activeId === item.id ? 'text-accent' : ''}`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${activeId === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </motion.button>
              )
            ))}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button asChild size="sm" className={`${location.pathname === '/contact' ? 'bg-amber-500 hover:bg-amber-400' : 'bg-amber-500/90 hover:bg-amber-600'} shadow px-5`}>
                <Link to="/contact">Contact</Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile toggle */}
          <button
            className={`md:hidden inline-flex items-center justify-center rounded-md p-2 ${solidHeader ? 'text-foreground' : 'text-white'} focus:outline-none focus:ring-2 focus:ring-accent`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

   

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden ${solidHeader ? 'bg-background/95' : 'bg-primary/95'} backdrop-blur-sm border-t border-border/50`}
          >
            <div className="container mx-auto px-6 py-4 space-y-2">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Our Products', id: 'products' },
                { label: 'About Company', id: 'about' },
                { label: 'Exporting Countries', id: 'countries' },
              ].map((item) => (
                item.id === 'home' && !isHome ? (
                  <Link
                    key={item.id}
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full text-left px-3 py-2 rounded-md ${solidHeader ? 'text-foreground' : 'text-white'} hover:bg-accent/10 transition-colors`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md ${
                      activeId === item.id ? 'bg-accent/20 text-accent' : (solidHeader ? 'text-foreground' : 'text-white')
                    } hover:bg-accent/10 transition-colors`}
                  >
                    {item.label}
                  </button>
                )
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-left px-3 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-primary font-medium"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
