import carpetImg from '../assets/carpet-product.jpg';
import woodenImg from '../assets/wooden-handicraft.jpg';
import brassImg from '../assets/brass-items.jpg';

export const products = [
  {
    id: 'carpet',
    slug: 'premium-carpets',
    title: 'Premium Carpets',
    subtitle: 'Handwoven elegance for timeless interiors',
    image: carpetImg,
    images: [carpetImg, carpetImg, carpetImg],
    description:
      'Handwoven carpets with intricate traditional patterns, crafted by skilled artisans using time-honored techniques. Every carpet tells a story of heritage and fine craftsmanship.',
    longDescription:
      'Our premium carpet collection blends traditional artistry with contemporary aesthetics. Each carpet is meticulously hand-knotted, using natural fibers that ensure durability, softness, and a luxurious feel. Ideal for living rooms, lounges, and hospitality spaces.',
    features: [
      '100% natural fibers and eco-friendly dyes',
      'Hand-knotted by master artisans',
      'Available in custom sizes and patterns',
      'Durable weave with premium finish',
    ],
    specs: {
      material: 'Wool / Silk blend options',
      origin: 'India',
      weave: 'Hand-knotted / Hand-tufted',
      leadTime: '2-4 weeks for custom orders',
    },
    materialsCare:
      'Vacuum regularly using a brushless suction head. Rotate periodically to ensure even wear. Blot spills immediately with a clean, dry cloth.',
    shipping:
      'Ships rolled and wrapped. Free international shipping on bulk orders. Custom sizes made-to-order.',
  },
  {
    id: 'wood',
    slug: 'wooden-handicraft-items',
    title: 'Wooden Handicraft Items',
    subtitle: 'Exquisite carving with traditional design',
    image: woodenImg,
    images: [woodenImg, woodenImg, woodenImg],
    description:
      'Exquisite wooden artifacts showcasing masterful carving and traditional design, perfect for elegant spaces and thoughtful gifts.',
    longDescription:
      'Crafted from sustainably sourced hardwoods, our wooden handicrafts feature intricate hand-carved patterns and artisanal finishes. Each piece is unique, reflecting natural grain variations and the artisan’s touch.',
    features: [
      'Premium hardwoods with natural finishes',
      'Hand-carved details, each piece unique',
      'Sustainably sourced materials',
      'Ideal for decor and gifting',
    ],
    specs: {
      material: 'Sheesham / Mango / Teak wood',
      origin: 'India',
      finish: 'Matte / Satin / Oil finish',
      leadTime: '1-3 weeks depending on size',
    },
    materialsCare:
      'Wipe with a soft dry cloth. Avoid direct sunlight and moisture. Use natural oil polish occasionally to maintain sheen.',
    shipping:
      'Securely packed with corner protection. Worldwide shipping available. Custom engraving on request.',
  },
  {
    id: 'brass',
    slug: 'brass-items',
    title: 'Brass Items',
    subtitle: 'Ornate engravings with timeless beauty',
    image: brassImg,
    images: [brassImg, brassImg, brassImg],
    description:
      'Ornate brass decorative pieces featuring intricate engravings, combining traditional craftsmanship with enduring elegance.',
    longDescription:
      'Our brass collection highlights hand-engraved detailing finished in polished, antique, or brushed styles. Perfect for centerpieces, pooja decor, and hospitality spaces seeking heritage charm.',
    features: [
      'Hand-engraved patterns',
      'Anti-tarnish finish options',
      'Versatile decor applications',
      'Available in sets and custom sizes',
    ],
    specs: {
      material: 'Solid brass',
      origin: 'India',
      finish: 'Polished / Antique / Brushed',
      leadTime: '1-2 weeks for standard sets',
    },
    materialsCare:
      'Use a soft cloth to remove fingerprints. For deeper cleaning, apply mild brass polish sparingly and buff gently.',
    shipping:
      'Packed with anti-tarnish wrapping. Bulk discounts and custom set curation available.',
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getRecommendations(currentSlug, limit = 3) {
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
