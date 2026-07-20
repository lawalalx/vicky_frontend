"use client";

import { useMemo, useState } from "react";
import { CheckCircle, Minus, MessageCircle, Plus, ShoppingBag, X } from "lucide-react";

import { createOrder } from "../lib/api";
import { formatMoney } from "../lib/catalog";
import type { CartItem } from "../lib/types";

const WHATSAPP_NUMBER = "2349038433047";

function buildWhatsAppMessage(
  customerName: string,
  customerEmail: string,
  customerPhone: string,
  items: CartItem[],
  total: number,
  orderId: string
): string {
  const lines: string[] = [
    `🛍️ *New Order — Vikky Perfumes*`,
    ``,
    `👤 *Name:* ${customerName}`,
    `📧 *Email:* ${customerEmail}`,
    customerPhone ? `📱 *Phone:* ${customerPhone}` : ``,
    ``,
    `🧴 *Items Ordered:*`,
    ...items.map(
      (item) =>
        `  • ${item.product.name} × ${item.quantity} — ${formatMoney(item.product.price * item.quantity, item.product.currency)}`
    ),
    ``,
    `💰 *Total: ${formatMoney(total)}*`,
    ``,
    `📦 *Order Ref:* ${orderId}`,
    ``,
    `Please confirm availability and delivery. Thank you! 🙏`,
  ];
  return lines.filter((l) => l !== undefined).join("\n");
}

type Props = {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onSuccess: () => void;
};

export function CartPanel({
  items,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onSuccess,
}: Props): React.JSX.Element {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const orderItems = useMemo(
    () =>
      items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.price,
      })),
    [items]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (items.length === 0) return;
    setCheckoutError("");
    setIsSubmitting(true);
    try {
      const response = await createOrder({
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        customer_phone: customerPhone.trim() || undefined,
        items: orderItems,
      });
      setPlacedOrderId(response.id);
      const message = buildWhatsAppMessage(
        customerName.trim(),
        customerEmail.trim(),
        customerPhone.trim(),
        items,
        total,
        response.id
      );
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      onSuccess();
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "Unable to complete checkout. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col border-l border-slate-100 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-brand-plum to-brand-ink px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/10 p-2">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Your Cart</h2>
            <p className="text-xs text-white/60">
              {items.length === 0
                ? "Empty"
                : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""} · ${formatMoney(total)}`}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
            <ShoppingBag className="h-10 w-10 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">Your cart is empty</p>
            <p className="text-xs text-slate-400">Browse the catalogue and add fragrances to begin.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.product.id}
              className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition hover:border-brand-plum/20 hover:shadow"
            >
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=200&q=60";
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brand-ink">{item.product.name}</p>
                    <p className="text-xs text-slate-400">{item.product.brand}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.product.id)}
                    className="shrink-0 rounded-full p-1 text-slate-300 transition hover:bg-rose-50 hover:text-rose-500"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-1 text-sm font-bold text-brand-rose">
                  {formatMoney(item.product.price * item.quantity, item.product.currency)}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => onDecrease(item.product.id)}
                    className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-200"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="min-w-[1.5rem] text-center text-xs font-semibold text-brand-ink">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onIncrease(item.product.id)}
                    className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-200"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Checkout */}
      <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-4">
        {placedOrderId ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 px-4 py-4 text-sm">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <div>
                <p className="font-semibold text-emerald-800">Order sent to WhatsApp!</p>
                <p className="mt-0.5 text-emerald-700">
                  Reference: <span className="font-mono font-semibold">{placedOrderId}</span>
                </p>
                <p className="mt-1 text-xs text-emerald-600">
                  A WhatsApp window has opened. Complete your order there.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setPlacedOrderId(null); onClose(); }}
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm shadow-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold text-brand-ink">{formatMoney(total)}</span>
            </div>
            <input
              value={customerName}
              onChange={(e) => { setCustomerName(e.target.value); setCheckoutError(""); }}
              placeholder="Full name *"
              required
              minLength={2}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-brand-plum/40 focus:ring-2 focus:ring-brand-plum/10"
            />
            <input
              value={customerEmail}
              onChange={(e) => { setCustomerEmail(e.target.value); setCheckoutError(""); }}
              placeholder="Email address *"
              type="email"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-brand-plum/40 focus:ring-2 focus:ring-brand-plum/10"
            />
            <input
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Phone number (optional)"
              type="tel"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-brand-plum/40 focus:ring-2 focus:ring-brand-plum/10"
            />
            {checkoutError ? (
              <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-600">{checkoutError}</p>
            ) : null}
            <button
              type="submit"
              disabled={items.length === 0 || isSubmitting}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5d] hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              <MessageCircle className="h-4 w-4" />
              {isSubmitting ? "Processing…" : "Send Order via WhatsApp"}
            </button>
            <p className="text-center text-[10px] text-slate-400">
              Your order will be registered and sent to our WhatsApp for confirmation.
            </p>
          </form>
        )}
      </div>
    </aside>
  );
}
