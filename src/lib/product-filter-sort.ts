import type { Product } from "@/data/marketplace";
import { productDiscountPercent } from "@/lib/product-discount";

export type ProductSortOption = "default" | "price-asc" | "price-desc" | "discount-desc";

function productMatchesQuery(product: Product, query: string) {
  const normalized = query.toLowerCase();
  return (
    product.name.toLowerCase().includes(normalized) ||
    product.store.toLowerCase().includes(normalized) ||
    product.category.toLowerCase().includes(normalized)
  );
}

function matchesQueryFilter(product: Product, query?: string) {
  if (!query) return true;
  return productMatchesQuery(product, query);
}

function matchesCategoryFilter(product: Product, category?: string | null) {
  if (!category) return true;
  return product.category === category;
}

function matchesStoreFilter(product: Product, store?: string) {
  if (!store || store === "Todos") return true;
  return product.store === store;
}

function productMatchesFilters(
  product: Product,
  options: { query?: string; category?: string | null; store?: string },
) {
  const query = options.query?.trim();
  return (
    matchesQueryFilter(product, query) &&
    matchesCategoryFilter(product, options.category) &&
    matchesStoreFilter(product, options.store)
  );
}

function filterProducts(
  products: Product[],
  options: { query?: string; category?: string | null; store?: string },
) {
  return products.filter((product) => productMatchesFilters(product, options));
}

const PRODUCT_SORTERS: Record<
  Exclude<ProductSortOption, "default">,
  (a: Product, b: Product) => number
> = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "discount-desc": (a, b) =>
    productDiscountPercent(b.price, b.oldPrice) - productDiscountPercent(a.price, a.oldPrice),
};

function sortProducts(products: Product[], sort: ProductSortOption) {
  if (sort === "default") return products;
  const sorted = [...products];
  sorted.sort(PRODUCT_SORTERS[sort]);
  return sorted;
}

export function filterAndSortProducts(
  products: Product[],
  options: {
    query?: string;
    category?: string | null;
    store?: string;
    sort?: ProductSortOption;
  },
) {
  const filtered = filterProducts(products, options);
  return sortProducts(filtered, options.sort ?? "default");
}
