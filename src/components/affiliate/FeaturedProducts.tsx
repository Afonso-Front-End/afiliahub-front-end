import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/marketplace";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";

function featuredSubtitle(hasFilters: boolean, count: number, defaultSubtitle: string) {
  return hasFilters ? `${count} produto(s) encontrado(s)` : defaultSubtitle;
}

function FeaturedProductsHeader({
  title,
  subtitle,
  quickFilters,
  storeFilter,
  onStoreFilter,
}: {
  title: string;
  subtitle: string;
  quickFilters: string[];
  storeFilter: string;
  onStoreFilter: (filter: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div>
        <h2 className="font-display font-bold text-2xl md:text-3xl">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        {quickFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => onStoreFilter(filter)}
            className={cn(
              "hidden md:inline-flex px-4 py-2 rounded-full transition-shadow",
              storeFilter === filter
                ? "bg-foreground text-background"
                : "bg-surface shadow-soft hover:shadow-card",
            )}
          >
            {filter}
          </button>
        ))}
        <Link
          to="/produtos"
          className="inline-flex items-center gap-1.5 bg-surface px-4 py-2 rounded-full shadow-soft hover:shadow-card transition-shadow"
        >
          Ver todos <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

function FeaturedProductsResults({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="bg-surface rounded-3xl p-10 text-center shadow-soft">
        <p className="font-semibold text-lg">Nenhum produto encontrado</p>
        <p className="text-sm text-muted-foreground mt-2">Tente outra busca, categoria ou loja.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function FeaturedProducts() {
  const { filteredProducts, storeFilter, setStoreFilter, storeFilters, category, search } =
    useMarketplace();
  const quickFilters = storeFilters.filter((filter) => filter !== "Todos").slice(0, 4);
  const { content } = useSiteContent();
  const header = content["products-header"];
  const hasFilters = Boolean(category || search.trim() || storeFilter !== "Todos");

  return (
    <section id="produtos" className="mt-10 scroll-mt-28">
      <FeaturedProductsHeader
        title={header.title}
        subtitle={featuredSubtitle(hasFilters, filteredProducts.length, header.subtitle)}
        quickFilters={quickFilters}
        storeFilter={storeFilter}
        onStoreFilter={setStoreFilter}
      />
      <FeaturedProductsResults products={filteredProducts} />
    </section>
  );
}
