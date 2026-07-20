"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Sparkles } from "lucide-react";

import { SiteHeader } from "./site-header";
import { ProductCard } from "./product-card";
import { CartPanel } from "./cart-panel";
import { SiteFooter } from "./site-footer";
import { perfumeCategories, titleCase } from "../lib/catalog";
import { useCatalog } from "../lib/hooks/useCatalog";
import type { CartItem, CatalogFilters, Product } from "../lib/types";

const initialFilters: CatalogFilters = {
  q: "",
  category: "all",
  scentFamily: "all",
  minPrice: "",
  maxPrice: "",
  concentration: "all"
};

export function HomePage(): React.JSX.Element {
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);
  const [draft, setDraft] = useState<CatalogFilters>(initialFilters);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const { products, isLoading, error } = useCatalog(filters);

  useEffect(() => {
    const raw = window.localStorage.getItem("vikky-cart");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CartItem[];
        setCart(parsed);
      } catch {
        window.localStorage.removeItem("vikky-cart");
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("vikky-cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  function addToCart(product: Product): void {
    setCart((current) => {
      const found = current.find((item) => item.product.id === product.id);
      if (found) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }

  function increase(id: string): void {
    setCart((current) =>
      current.map((item) => (item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }

  function decrease(id: string): void {
    setCart((current) =>
      current.flatMap((item) => {
        if (item.product.id !== id) return [item];
        if (item.quantity <= 1) return [];
        return [{ ...item, quantity: item.quantity - 1 }];
      })
    );
  }

  function remove(id: string): void {
    setCart((current) => current.filter((item) => item.product.id !== id));
  }

  function submitFilters(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setFilters(draft);
  }

  const heroStats = [
    { label: "Luxury scents", value: "50+" },
    { label: "Ready to ship", value: "24h" },
    { label: "Giftable sets", value: "Curated" }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <SiteHeader cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Hero */}
        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-plum/10 bg-white/80 px-4 py-2 text-sm font-medium text-brand-plum">
              <Sparkles className="h-4 w-4" />
              Perfume house built for premium discovery
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-brand-ink sm:text-6xl">
              Fragrances that feel like a signature.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Explore artisan perfumes, bold niche blends, and elegant gifting sets.
            </p>
          </div>

          {/* Why Vikky strip */}
          <div className="hidden lg:flex lg:flex-col lg:justify-center lg:gap-3">
            {[
              { label: "50+", hint: "Luxury scents" },
              { label: "24h", hint: "Ready to ship" },
              { label: "WhatsApp", hint: "Instant checkout" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/70 bg-white/80 px-5 py-3 shadow-glow text-right">
                <p className="text-xl font-bold text-brand-ink">{s.label}</p>
                <p className="text-xs text-slate-400">{s.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row — mobile */}
        <div className="grid grid-cols-3 gap-3 lg:hidden">
          {heroStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-glow text-center">
              <p className="text-xl font-semibold text-brand-ink">{stat.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <form
          onSubmit={submitFilters}
          className="rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-glow backdrop-blur"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <input
              value={draft.q ?? ""}
              onChange={(event) => setDraft((current) => ({ ...current, q: event.target.value }))}
              placeholder="Search perfumes…"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-brand-rose/20 focus:ring-4 lg:col-span-2"
            />
            <select
              value={draft.category ?? "all"}
              onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-brand-rose/20 focus:ring-4"
            >
              {perfumeCategories.map((category) => (
                <option key={category.key} value={category.key}>{category.label}</option>
              ))}
            </select>
            <select
              value={draft.scentFamily ?? "all"}
              onChange={(event) => setDraft((current) => ({ ...current, scentFamily: event.target.value }))}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-brand-rose/20 focus:ring-4"
            >
              <option value="all">All scent families</option>
              <option value="floral">Floral</option>
              <option value="woody">Woody</option>
              <option value="amber">Amber</option>
              <option value="fresh">Fresh</option>
              <option value="spicy">Spicy</option>
              <option value="gourmand">Gourmand</option>
            </select>
            <input
              value={draft.minPrice ?? ""}
              onChange={(event) => setDraft((current) => ({ ...current, minPrice: event.target.value }))}
              placeholder="Min price"
              inputMode="numeric"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-brand-rose/20 focus:ring-4"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-plum px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-ink"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </form>

        {/* Product grid — full width */}
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-brand-ink">Featured selection</h2>
            <p className="text-sm text-slate-500">
              {isLoading ? "Loading catalog…" : error ? "Fallback catalog shown" : `${products.length} fragrances available`}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>

        {/* Scent guide strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { name: "Floral", desc: "Romantic & airy" },
            { name: "Woody", desc: "Warm & elegant" },
            { name: "Amber", desc: "Rich & smooth" },
            { name: "Fresh", desc: "Clean & uplifting" },
          ].map((s) => (
            <div key={s.name} className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-glow">
              <p className="font-semibold text-brand-ink">{s.name}</p>
              <p className="mt-0.5 text-xs text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CartPanel
        items={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increase}
        onDecrease={decrease}
        onRemove={remove}
        onSuccess={() => {
          setCart([]);
          setIsCartOpen(false);
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 text-sm text-slate-500 shadow-glow">
          Browse the catalogue
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
