import { Link } from "@tanstack/react-router";
import { ArrowRight, LayoutGrid, Package, Search } from "lucide-react";
import { ProductCard } from "@/components/affiliate/ProductCard";
import { FilterPill } from "@/components/affiliate/FilterPill";
import { PRODUCT_SORT_OPTIONS } from "@/lib/sort-options";
import type { Product } from "@/data/marketplace";
import type { StoreFilter } from "@/data/marketplace";
import type { SortOption } from "@/context/marketplace-context";

export function ProdutosPageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="rounded-3xl bg-surface border border-border p-6 md:p-8 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-muted px-3 py-1.5 rounded-full">
            <Package className="size-3.5 text-primary" />
            Catálogo completo
          </span>
          <h1 className="mt-3 font-display font-extrabold text-3xl md:text-4xl tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">{subtitle}</p>
        </div>
        <Link
          to="/categorias"
          className="inline-flex items-center gap-1.5 text-sm font-semibold bg-muted hover:bg-accent rounded-full px-4 py-2 transition-colors"
        >
          <LayoutGrid className="size-3.5" />
          Ver categorias
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}

function ProdutosSearchBar({
  busca,
  onBuscaChange,
  onSearchSubmit,
}: {
  busca: string;
  onBuscaChange: (value: string) => void;
  onSearchSubmit: () => void;
}) {
  return (
    <form
      className="flex items-center gap-2 bg-surface rounded-2xl border border-border px-4 h-12 shadow-soft"
      onSubmit={(e) => {
        e.preventDefault();
        onSearchSubmit();
      }}
    >
      <Search className="size-4 text-muted-foreground shrink-0" />
      <input
        type="search"
        value={busca}
        onChange={(e) => onBuscaChange(e.target.value)}
        placeholder="Buscar produtos, lojas ou categorias…"
        className="flex-1 bg-transparent text-sm outline-none"
      />
    </form>
  );
}

function ProdutosCategoryFilters({
  categoryOptions,
  categoria,
  onCategoryChange,
}: {
  categoryOptions: Array<{ slug: string; name: string }>;
  categoria?: string;
  onCategoryChange: (slug?: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <FilterPill label="Todas" active={!categoria} onClick={() => onCategoryChange(undefined)} />
      {categoryOptions.map((cat) => (
        <FilterPill
          key={cat.slug}
          label={cat.name}
          active={categoria === cat.slug}
          onClick={() => onCategoryChange(cat.slug)}
        />
      ))}
    </div>
  );
}

function ProdutosStoreAndSortFilters({
  storeFilters,
  filtroLoja,
  onStoreChange,
  ordenar,
  onSortChange,
  resultCount,
}: {
  storeFilters: string[];
  filtroLoja: StoreFilter;
  onStoreChange: (store: StoreFilter) => void;
  ordenar: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{resultCount} produto(s) encontrado(s)</p>
        <div className="flex flex-wrap gap-2">
          {storeFilters.map((loja) => (
            <FilterPill
              key={loja}
              label={loja}
              active={filtroLoja === loja}
              onClick={() => onStoreChange(loja)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRODUCT_SORT_OPTIONS.map((opt) => (
          <FilterPill
            key={opt.value}
            label={opt.label}
            active={ordenar === opt.value}
            variant="primary"
            onClick={() => onSortChange(opt.value)}
          />
        ))}
      </div>
    </>
  );
}

export function ProdutosFilters(props: {
  busca: string;
  onBuscaChange: (value: string) => void;
  onSearchSubmit: () => void;
  categoryOptions: Array<{ slug: string; name: string }>;
  categoria?: string;
  onCategoryChange: (slug?: string) => void;
  storeFilters: string[];
  filtroLoja: StoreFilter;
  onStoreChange: (store: StoreFilter) => void;
  ordenar: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}) {
  return (
    <>
      <ProdutosSearchBar
        busca={props.busca}
        onBuscaChange={props.onBuscaChange}
        onSearchSubmit={props.onSearchSubmit}
      />
      <ProdutosCategoryFilters
        categoryOptions={props.categoryOptions}
        categoria={props.categoria}
        onCategoryChange={props.onCategoryChange}
      />
      <ProdutosStoreAndSortFilters
        storeFilters={props.storeFilters}
        filtroLoja={props.filtroLoja}
        onStoreChange={props.onStoreChange}
        ordenar={props.ordenar}
        onSortChange={props.onSortChange}
        resultCount={props.resultCount}
      />
    </>
  );
}

export function ProdutosResults({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="bg-surface rounded-3xl p-10 text-center shadow-soft">
        <p className="font-semibold text-lg">Nenhum produto encontrado</p>
        <p className="text-sm text-muted-foreground mt-2">Tente outra busca, categoria ou loja.</p>
        <Link
          to="/categorias"
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:underline"
        >
          Explorar categorias
          <ArrowRight className="size-3.5" />
        </Link>
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
