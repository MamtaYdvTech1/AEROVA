export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  heroLine: string;
  description: string;
  accentColor: string;
  themeColor: string;
  glowColor: string;
  bgGradient: string;
  canTextureColors: {
    base: string;
    accent: string;
    text: string;
    metal: string;
    glow: string;
  };
  flavorProfile: string[];
  tastingNotes: {
    top: string;
    heart: string;
    base: string;
  };
  nutrition: {
    calories: number;
    caffeine: string;
    sugars: string;
    lTheanine: string;
    electrolytes: string;
    vitamins: string;
    servingSize: string;
  };
  packOptions: {
    size: number;
    title: string;
    price: number;
    savings?: string;
    isPopular?: boolean;
  }[];
  benefits: string[];
  specs: {
    volume: string;
    carbonation: string;
    temperature: string;
    origin: string;
  };
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique item cart id: `${productId}-${packSize}`
  productId: string;
  product: Product;
  packSize: number;
  packTitle: string;
  price: number;
  quantity: number;
}

export interface Ingredient {
  id: string;
  name: string;
  scientificName: string;
  category: 'Botanical' | 'Adaptogen' | 'Mineral' | 'Flavor';
  role: string;
  benefit: string;
  origin: string;
  color: string;
  glow: string;
  icon: string;
  pos: {
    x: number; // percentage
    y: number; // percentage
    speed: number;
    floatDelay: number;
    size: number; // px
  };
}
