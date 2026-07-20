"use client";

import { useEffect, useState } from "react";

import { fetchCatalog } from "../api";
import type { CatalogFilters, Product } from "../types";

export function useCatalog(filters: CatalogFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);

    fetchCatalog(filters)
      .then((items) => {
        if (!active) return;
        setProducts(items);
                setError("");
      })
      .catch((err) => {
        if (!active) return;
        setProducts([]);
                setError(err instanceof Error ? err.message : "Unable to load catalog");
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [filters.category, filters.concentration, filters.maxPrice, filters.minPrice, filters.q, filters.scentFamily]);

  return {
    products,
    isLoading,
    error,
    isEmpty: !isLoading && products.length === 0
  };
}
