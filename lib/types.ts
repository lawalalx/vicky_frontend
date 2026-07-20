export type ScentFamily = "floral" | "woody" | "amber" | "fresh" | "spicy" | "gourmand";

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  scent_family: ScentFamily;
  concentration: "eau_de_parfum" | "eau_de_toilette" | "parfum" | "extrait";
  size_ml: number;
  price: number;
  currency: "NGN" | "USD";
  category: string;
  notes: string[];
  image_url: string;
  in_stock: boolean;
  featured?: boolean;
  stock?: number;
  status?: string;
  created_at?: string;
}

export interface CatalogFilters {
  q?: string;
  category?: string;
  scentFamily?: string;
  minPrice?: string;
  maxPrice?: string;
  concentration?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
