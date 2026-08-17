import type { StoreFilter } from "@/data/marketplace";
import type { SortOption } from "@/context/marketplace-context";
import { isValidSortOption } from "@/lib/sort-options";

export type ProdutosSearch = {
  categoria?: string;
  loja?: StoreFilter;
  busca?: string;
  ordenar?: SortOption;
};

function optionalString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function pickSearchField<K extends keyof ProdutosSearch>(
  search: ProdutosSearch,
  key: K,
  keep: (value: NonNullable<ProdutosSearch[K]>) => boolean,
): ProdutosSearch {
  const value = search[key];
  if (value == null) return {};
  return keep(value) ? { [key]: value } : {};
}

function compactProdutosSearch(search: ProdutosSearch): ProdutosSearch {
  return {
    ...pickSearchField(search, "categoria", Boolean),
    ...pickSearchField(search, "busca", Boolean),
    ...pickSearchField(search, "loja", (loja) => loja !== "Todos"),
    ...pickSearchField(search, "ordenar", (ordenar) => ordenar !== "default"),
  };
}

export function parseProdutosSearch(search: Record<string, unknown>): ProdutosSearch {
  const loja = optionalString(search.loja);
  const ordenar = optionalString(search.ordenar);

  return compactProdutosSearch({
    categoria: optionalString(search.categoria),
    loja,
    busca: optionalString(search.busca),
    ordenar: isValidSortOption(ordenar) ? ordenar : undefined,
  });
}

export function mergeProdutosSearch(prev: ProdutosSearch, next: Partial<ProdutosSearch>): ProdutosSearch {
  return compactProdutosSearch({ ...prev, ...next });
}
