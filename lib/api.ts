import type { CatalogFilters, Product } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    let message = `Request failed: ${response.status}`;
    try {
      const json = JSON.parse(text) as { detail?: string | { msg: string }[] };
      if (typeof json.detail === "string") {
        message = json.detail;
      } else if (Array.isArray(json.detail)) {
        message = json.detail.map((e) => e.msg).join("; ");
      }
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function fetchCatalog(filters: CatalogFilters = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.category && filters.category !== "all") params.set("category", filters.category);
  if (filters.scentFamily && filters.scentFamily !== "all") params.set("scent_family", filters.scentFamily);
  if (filters.minPrice) params.set("min_price", filters.minPrice);
  if (filters.maxPrice) params.set("max_price", filters.maxPrice);
  if (filters.concentration && filters.concentration !== "all") params.set("concentration", filters.concentration);

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return request<Product[]>(`/api/v1/products${suffix}`);
}

export async function fetchProductById(productId: string): Promise<Product> {
  return request<Product>(`/api/v1/products/${productId}`);
}

export async function createOrder(payload: {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  items: Array<{ product_id: string; quantity: number; unit_price: number }>;
}): Promise<{ id: string; total_amount: number; status: string }> {
  return request("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
