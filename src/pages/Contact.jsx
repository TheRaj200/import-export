import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { products } from '../data/products';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';

export default function Contact() {
  const [params] = useSearchParams();
  const preselect = params.get('product');

  const productOptions = useMemo(() => products.map(p => ({ label: p.title, value: p.slug })), []);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    product: preselect && productOptions.find(o => o.value === preselect) ? preselect : productOptions[0]?.value || '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselect) setForm(f => ({ ...f, product: preselect }));
  }, [preselect]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!/^\+?[0-9\-\s]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.message.trim()) e.message = 'Please add a short message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
        <Header />
      <section className="bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-6 pt-24 pb-12 text-center">
          <motion.h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-2" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>Contact Us</motion.h1>
          <motion.p className="text-muted-foreground max-w-2xl mx-auto" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
            Tell us about your requirement and we’ll get back to you within 24–48 hours.
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardContent className="p-6 md:p-8">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input required name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={`w-full h-12 px-4 rounded-lg border ${errors.name ? 'border-red-500' : 'border-input'} bg-white/90 shadow-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`} />
                      {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input required name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={`w-full h-12 px-4 rounded-lg border ${errors.email ? 'border-red-500' : 'border-input'} bg-white/90 shadow-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`} />
                      {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input required name="phone" inputMode="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={`w-full h-12 px-4 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-input'} bg-white/90 shadow-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`} />
                      {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium mb-1">Product</label>
                      <select name="product" value={form.product} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-input bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent">
                        {productOptions.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Message</label>
                      <textarea required name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Briefly describe your requirements (sizes, quantity, finish, destination, etc.)" className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-input'} bg-white/90 shadow-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent`} />
                      {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between gap-4">
                      <p className="text-xs text-muted-foreground">By submitting, you agree to be contacted regarding your enquiry.</p>
                      <Button type="submit" className="bg-amber-500 hover:bg-amber-400 px-6 shadow">Send Enquiry</Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center text-center py-6">
                    <CheckCircle2 className="h-12 w-12 text-accent mb-2" />
                    <h3 className="text-2xl font-bold mb-1">Thank you!</h3>
                    <p className="text-muted-foreground max-w-md">Your enquiry has been recorded. Our team will reach out on your email/phone shortly.</p>
                    <div className="mt-6 flex gap-3">
                      <Button asChild variant="secondary"><Link to="/">Go Home</Link></Button>
                      <Button asChild className="bg-amber-500 hover:bg-amber-400"><Link to={`/products/${form.product}`}>View Product</Link></Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Company info */}
          <motion.aside initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.05}}>
            <Card className="shadow-elegant">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h3 className="text-xl font-bold">Reach Us</h3>
                <div className="space-y-3 text-foreground/90">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-accent mt-0.5" />
                    <a href="mailto:info@anantimportexport.com" className="hover:text-accent">info@anantimportexport.com</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-accent mt-0.5" />
                    <a href="tel:+911234567890" className="hover:text-accent">+91 123 456 7890</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent mt-0.5" />
                    <p>Export Hub, Trade Center, Mumbai, India</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-semibold mb-2">Business Hours</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Mon–Fri: 9:00 AM – 6:00 PM IST</li>
                    <li>Sat: 9:00 AM – 2:00 PM IST</li>
                    <li>Sun: Closed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}
