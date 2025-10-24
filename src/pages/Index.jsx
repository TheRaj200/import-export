import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Products from '../components/Products';
import About from '../components/About';
import ExportingCountries from '../components/ExportingCountries';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

const Index = () => {
 const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);




  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <ExportingCountries />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
