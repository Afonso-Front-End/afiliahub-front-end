import { useEffect, useState } from "react";
export function useProdutosFilters(urlSearch) {
    const [busca, setBusca] = useState(urlSearch.busca ?? "");
    const [filtroLoja, setFiltroLoja] = useState(urlSearch.loja ?? "Todos");
    const [categoria, setCategoria] = useState(urlSearch.categoria);
    const [ordenar, setOrdenar] = useState(urlSearch.ordenar ?? "default");
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
