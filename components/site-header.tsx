import { MessageCircle, ShoppingBag, Sparkles } from "lucide-react";

type Props = {
  cartCount: number;
  onCartClick: () => void;
};

export function SiteHeader({ cartCount, onCartClick }: Props): React.JSX.Element {
  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-plum shadow-sm">
            <Sparkles className="h-4 w-4 text-brand-gold" />
          </div>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.35em] text-brand-plum">Vikky</p>
            <p className="hidden text-[10px] text-slate-400 sm:block">Luxury Perfumes</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://wa.me/2349038433047"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-[#25D366]/30 bg-[#dcfce7] px-3 py-2 text-xs font-semibold text-[#166534] transition hover:bg-[#bbf7d0] sm:inline-flex"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Chat with us
          </a>

          <button
            type="button"
            onClick={onCartClick}
            className="relative inline-flex items-center gap-2 rounded-full bg-brand-plum px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-brand-ink hover:shadow-md active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-rose px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
