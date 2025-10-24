import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// fit: 'contain' to show full image without cropping, 'cover' to fill
// height: tailwind classes controlling the slide height
export default function ImageCarousel({ images = [], alt = '', autoplay = true, fit = 'contain', height = 'h-[50vh] md:h-[60vh]' }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false }, autoplay ? [Autoplay({ delay: 4000 })] : []);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((idx) => emblaApi && emblaApi.scrollTo(idx), [emblaApi]);

  if (!images?.length) return null;

  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain';

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg shadow-elegant bg-white" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div className={`min-w-0 flex-[0_0_100%] ${height} bg-white flex items-center justify-center`} key={i}>
              <img src={src} alt={`${alt || 'Product'} ${i + 1}`} className={`w-full ${height} ${fitClass}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button onClick={scrollPrev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 shadow-md">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={scrollNext} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 shadow-md">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
        {images.map((src, i) => (
          <button key={i} onClick={() => scrollTo(i)} className={`relative rounded-md overflow-hidden border-2 ${selectedIndex === i ? 'border-accent' : 'border-transparent'}`} aria-label={`Go to slide ${i + 1}`}>
            <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-16 object-cover bg-white" />
          </button>
        ))}
      </div>
    </div>
  );
}
