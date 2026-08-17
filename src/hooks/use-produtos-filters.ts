import { useEffect, useState } from "react";
import type { StoreFilter } from "@/data/marketplace";
import type { SortOption } from "@/context/marketplace-context";
import type { ProdutosSearch } from "@/lib/produtos-search";

export function useProdutosFilters(urlSearch: ProdutosSearch) {
  const [busca, setBusca] = useState(urlSearch.busca ?? "");
  const [filtroLoja, setFiltroLoja] = useState<StoreFilter>(urlSearch.loja ?? "Todos");
  const [categoria, setCategoria] = useState<string | undefined>(urlSearch.categoria);
  const [ordenar, setOrdenar] = useState<SortOption>(urlSearch.ordenar ?? "default");

  useEffect(() => {
    setBusca(urlSearch.busca ?? "");
    setFiltroLoja(urlSearch.loja ?? "Todos");
    setCategoria(urlSearch.categoria);
    setOrdenar(urlSearch.ordenar ?? "default");
  }, [urlSearch.busca, urlSearch.loja, urlSearch.categoria, urlSearch.ordenar]);

  return {
    busca,
    setBusca,
    filtroLoja,
    setFiltroLoja,
    categoria,
    setCategoria,
    ordenar,
    setOrdenar,
  };
}
