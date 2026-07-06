export const OCCASIONS = [
  { id: 'wedding',   label: 'Wedding',       emoji: '💍', desc: 'Lehenga, saree or gown looks' },
  { id: 'party',     label: 'Party / Night', emoji: '🪩', desc: 'Bold, glam, statement pieces' },
  { id: 'casual',    label: 'Casual',        emoji: '☀️', desc: 'Relaxed everyday fits' },
  { id: 'festive',   label: 'Festive',       emoji: '🪔', desc: 'Diwali, Eid, traditional events' },
  { id: 'office',    label: 'Office / Formal', emoji: '💼', desc: 'Clean, professional, polished' },
  { id: 'date',      label: 'Date Night',    emoji: '🌹', desc: 'Romantic, elegant, effortless' },
];

export const BUDGET_RANGES = [
  { id: 'budget',   label: 'Under ₹2,000',  max: 2000 },
  { id: 'mid',      label: '₹2,000 – ₹5,000', max: 5000 },
  { id: 'premium',  label: '₹5,000 – ₹10,000', max: 10000 },
  { id: 'luxury',   label: 'No limit',      max: Infinity },
];

export const COLOR_VIBES = [
  { id: 'pastels',  label: 'Pastels',   swatch: ['#FFD6E0', '#C9B8FF', '#B8E4FF'] },
  { id: 'neutrals', label: 'Neutrals',  swatch: ['#F5F0E8', '#D4C5B0', '#A89F8E'] },
  { id: 'bold',     label: 'Bold',      swatch: ['#FF2E9A', '#FF6B00', '#9AC400'] },
  { id: 'darks',    label: 'Dark tones',swatch: ['#1A1A2E', '#2D1B69', '#1A0A00'] },
  { id: 'earthy',   label: 'Earthy',    swatch: ['#8B6914', '#5C6B4F', '#B5562C'] },
];

// Maps occasion → style tags to match against product.styleTags
export const OCCASION_STYLE_TAGS = {
  wedding:  ['Elegant', 'Ethnic', 'Traditional', 'Bridal', 'Festive'],
  party:    ['Glam', 'Bold', 'Party', 'Statement', 'Trendy'],
  casual:   ['Casual', 'Boho Chic', 'Soft Girl', 'Everyday', 'Minimal'],
  festive:  ['Festive', 'Ethnic', 'Traditional', 'Boho Chic', 'Vibrant'],
  office:   ['Formal', 'Minimal', 'Professional', 'Clean', 'Elegant'],
  date:     ['Romantic', 'Elegant', 'Soft Girl', 'Date Night', 'Chic'],
};

// Categories we need to assemble a complete look
export const LOOK_CATEGORIES = [
  { key: 'outfit',    category: 'Dresses',     label: 'Outfit',     emoji: '👗' },
  { key: 'shoes',     category: 'Shoes',       label: 'Shoes',      emoji: '👠' },
  { key: 'bag',       category: 'Bags',        label: 'Bag',        emoji: '👜' },
  { key: 'accessory', category: 'Accessories', label: 'Accessory',  emoji: '💎' },
  { key: 'makeup',    category: 'Makeup',      label: 'Makeup',     emoji: '💄' },
];