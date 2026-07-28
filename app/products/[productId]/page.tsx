import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchProductById } from "../../../lib/api";
import { formatMoney, titleCase } from "../../../lib/catalog";

type Props = {
  params: {
    productId: string;
  };
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80";

export default async function ProductDetailPage({ params }: Props): Promise<React.JSX.Element> {
  let product;
  try {
    product = await fetchProductById(params.productId);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f9f6ff] via-white to-[#fff8f4] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Back to catalog
          </Link>
          {product.featured ? (
            <span className="rounded-full bg-brand-gold/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Featured
            </span>
          ) : null}
        </div>

        <div className="grid gap-8 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-glow md:grid-cols-2 md:p-8">
          <div className="overflow-hidden rounded-3xl bg-brand-mist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image_url || FALLBACK_IMAGE}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-rose">{product.brand}</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand-ink">{product.name}</h1>
              <p className="mt-1 text-sm text-slate-500">
                {titleCase(product.category)} · {titleCase(product.concentration)} · {product.size_ml}ml
              </p>
            </div>

            <p className="text-base leading-8 text-slate-600">{product.description}</p>

            {product.notes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="rounded-full bg-brand-mist px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-plum"
                  >
                    {titleCase(note)}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Scent family</p>
                <p className="mt-1 font-semibold text-brand-ink">{titleCase(product.scent_family)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Availability</p>
                <p className="mt-1 font-semibold text-brand-ink">
                  {product.in_stock ? "In stock" : "Out of stock"}
                  {product.stock !== undefined ? ` (${product.stock} left)` : ""}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <p className="text-3xl font-bold text-brand-ink">{formatMoney(product.price, product.currency)}</p>
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-brand-plum px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-ink"
              >
                Go to catalog to add to cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}