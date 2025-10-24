import { useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import ImageCarousel from '../components/ui/ImageCarousel';
import { getProductBySlug, getRecommendations } from '../data/products';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};


export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

   const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!product) {
    navigate('/not-found');
    return null;
  }

  const recs = getRecommendations(product.slug);
  const images = product.images && product.images.length ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={product.image} alt={product.title} className="w-full h-[50vh] md:h-[60vh] object-cover object-bottom" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-28 md:pt-36 pb-10 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <Button variant="secondary" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-3">{product.title}</h1>
            <p className="text-white/90 md:text-lg max-w-3xl">{product.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Product content */}
      <section className="container mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: gallery + details */}
          <motion.div variants={fadeIn} initial="hidden" animate="show" className="lg:col-span-2 space-y-8">
            {/* Image slider */}
            <ImageCarousel images={images} alt={product.title} />

            {/* Details */}
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-primary mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                {product.longDescription && (
                  <p className="text-foreground/90 leading-relaxed mt-4">{product.longDescription}</p>
                )}

                <h3 className="text-xl font-semibold mt-8 mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {product.materialsCare && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Materials & Care</h3>
                    <p className="text-muted-foreground leading-relaxed">{product.materialsCare}</p>
                  </div>
                )}

                {product.shipping && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Shipping & Customization</h3>
                    <p className="text-muted-foreground leading-relaxed">{product.shipping}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: specs + CTA */}
          <motion.aside variants={fadeIn} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
            <Card className="sticky top-24">
              <CardContent className="p-6 md:p-8 space-y-4">
                <h3 className="text-xl font-bold">Specifications</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b pb-2">
                      <span className="text-muted-foreground capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium text-right">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-amber-500 hover:bg-amber-400" asChild>
                    <Link to={`/contact?product=${product.slug}`}>
                      Enquire Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </section>

      {/* Recommendations */}
      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">You may also like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recs.map((p, idx) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="group"
              >
                <Link to={`/products/${p.slug}`} className="block">
                  <Card className="overflow-hidden shadow-elegant hover:shadow-gold transition-all duration-500">
                    <div className="relative h-52 overflow-hidden">
                      <motion.img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <CardContent className="p-5">
                      <h4 className="text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300">{p.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.subtitle}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
