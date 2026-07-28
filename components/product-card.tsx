import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";

import { formatMoney, titleCase } from "../lib/catalog";
import type { Product } from "../lib/types";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80";

export function ProductCard({ product, onAddToCart }: Props): React.JSX.Element {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-[0_8px_32px_rgba(34,24,45,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(75,29,90,0.15)]">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-mist">
          <img
            src={product.image_url || FALLBACK_IMAGE}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.featured && (
              <span className="rounded-full bg-brand-gold/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                Featured
              </span>
            )}
            {!product.in_stock && (
              <span className="rounded-full bg-slate-800/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                Sold out
              </span>
            )}
            {product.in_stock && product.stock !== undefined && product.stock > 0 && product.stock <= 5 && (
              <span className="rounded-full bg-rose-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                Only {product.stock} left
              </span>
            )}
          </div>
          <div className="absolute right-3 top-3">
            <span className="rounded-full border border-white/30 bg-white/80 px-2.5 py-0.5 text-[10px] font-semibold text-brand-plum backdrop-blur">
              {titleCase(product.concentration)}
            </span>
          </div>
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-rose">{product.brand}</p>
          <h3 className="mt-1 text-lg font-semibold leading-tight text-brand-ink">
            <Link href={`/products/${product.id}`} className="transition hover:text-brand-plum">
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-slate-500">{product.description}</p>
        {product.notes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.notes.slice(0, 4).map((note) => (
              <span key={note} className="rounded-full bg-brand-mist px-2.5 py-0.5 text-[10px] font-medium text-brand-plum">
                {titleCase(note)}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
              {titleCase(product.scent_family)} · {product.size_ml}ml
            </p>
            <p className="mt-0.5 text-xl font-bold text-brand-ink">
              {formatMoney(product.price, product.currency)}
            </p>
            <Link href={`/products/${product.id}`} className="mt-1 inline-block text-xs font-semibold text-brand-plum hover:text-brand-ink">
              View details
            </Link>
          </div>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={!product.in_stock}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-plum px-4 py-2.5 text-xs font-bold text-white shadow-sm transition duration-200 hover:bg-brand-ink hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            {product.in_stock ? (
              <>
                <Plus className="h-3.5 w-3.5" />
                Add
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Out of stock
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
