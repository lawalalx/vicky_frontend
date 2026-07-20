import type { Product } from "./types";

export const perfumeCategories = [
  { key: "all", label: "All Fragrances" },
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "unisex", label: "Unisex" },
  { key: "gift-sets", label: "Gift Sets" },
  { key: "niche", label: "Niche" }
] as const;

const images = [
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1523292562811-8fa7962a78c2?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1519669556878-63bdad8ac0bb?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1547887538-3f3f2f89c5da?auto=format&fit=crop&w=1400&q=80"
];

export const fallbackProducts: Product[] = [
  {
    id: "vik-001",
    name: "Velvet Oud",
    brand: "Vikky",
    description: "A deep oud composition with smoked saffron, rose petals, and amber woods.",
    scent_family: "woody",
    concentration: "parfum",
    size_ml: 50,
    price: 145000,
    currency: "NGN",
    category: "niche",
    notes: ["oud", "saffron", "rose", "amber"],
    image_url: images[0],
    in_stock: true,
    featured: true
  },
  {
    id: "vik-002",
    name: "Bloom Ritual",
    brand: "Vikky",
    description: "A luminous floral signature with peony, lychee, and soft musk.",
    scent_family: "floral",
    concentration: "eau_de_parfum",
    size_ml: 100,
    price: 98000,
    currency: "NGN",
    category: "women",
    notes: ["peony", "lychee", "musk"],
    image_url: images[1],
    in_stock: true,
    featured: true
  },
  {
    id: "vik-003",
    name: "Citrus Atelier",
    brand: "Vikky",
    description: "Fresh bergamot and neroli balanced with green tea and cedar.",
    scent_family: "fresh",
    concentration: "eau_de_toilette",
    size_ml: 100,
    price: 76000,
    currency: "NGN",
    category: "unisex",
    notes: ["bergamot", "neroli", "green tea", "cedar"],
    image_url: images[2],
    in_stock: true
  },
  {
    id: "vik-004",
    name: "Noir Ember",
    brand: "Vikky",
    description: "Spiced cardamom, tobacco leaf, and rich vanilla for evening wear.",
    scent_family: "spicy",
    concentration: "eau_de_parfum",
    size_ml: 75,
    price: 112000,
    currency: "NGN",
    category: "men",
    notes: ["cardamom", "tobacco", "vanilla"],
    image_url: images[3],
    in_stock: true
  },
  {
    id: "vik-005",
    name: "Honey Silk Gift Set",
    brand: "Vikky",
    description: "A curated duo for gifting with body mist and travel spray.",
    scent_family: "gourmand",
    concentration: "extrait",
    size_ml: 120,
    price: 134000,
    currency: "NGN",
    category: "gift-sets",
    notes: ["honey", "caramel", "tonka bean"],
    image_url: images[4],
    in_stock: false
  },
  {
    id: "vik-006",
    name: "Midnight Garden",
    brand: "Vikky",
    description: "An elegant amber floral with plum, jasmine, and sandalwood.",
    scent_family: "amber",
    concentration: "parfum",
    size_ml: 50,
    price: 156000,
    currency: "NGN",
    category: "niche",
    notes: ["plum", "jasmine", "sandalwood"],
    image_url: images[5],
    in_stock: true,
    featured: true
  }
];

export function formatMoney(value: number, currency: Product["currency"] = "NGN"): string {
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function titleCase(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
