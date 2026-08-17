import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getActiveCmsProducts } from "@/lib/cms-product";
import { getStoreFilterOptions } from "@/lib/cms-stores";
import { filterAndSortProducts } from "@/lib/product-filter-sort";
import { getProductCategoryOptions } from "@/lib/product-category-options";
import { mergeProdutosSearch, type ProdutosSearch } from "@/lib/produtos-search";
import { useProdutosFilters } from "@/hooks/use-produtos-filters";
import { useSiteContent } from "@/context/site-content-context";

export function useProdutosPage(urlSearch: ProdutosSearch) {
  const navigate = useNavigate({ from: "/produtos" });
  const { content } = useSiteContent();
  const header = content["products-header"];
  const storeFilters = useMemo(() => getStoreFilterOptions(content), [content.stores.items]);
  const filters = useProdutosFilters(urlSearch);

  const products = useMemo(() => getActiveCmsProducts(content), [content]);
  const categoryOptions = useMemo(
    () => getProductCategoryOptions(content.categories.items, products),
    [content.categories.items, products],
  );

  const updateSearch = (next: Partial<ProdutosSearch>) => {
    navigate({
      search: (prev) => mergeProdutosSearch(prev, next),
    });
  };

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        query: filters.busca,
        category: filters.categoria,
        store: filters.filtroLoja,
        sort: filters.ordenar,
      }),
    [products, filters.busca, filters.categoria, filters.filtroLoja, filters.ordenar],
  );

  const activeCategoryName =
    categoryOptions.find((entry) => entry.slug === filters.categoria)?.name ?? filters.categoria;

  return {
    header,
    storeFilters,
    ...filters,
    categoryOptions,
    filteredProducts,
    activeCategoryName,
    updateSearch,
  };
}
