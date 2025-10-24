import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
   <Route path="/" element={<Index />} />
  <Route path="/products/:slug" element={<ProductDetail />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
