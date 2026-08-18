import { isValidSortOption } from "@/lib/sort-options";
function optionalString(value) {
    return typeof value === "string" ? value : undefined;
}
function pickSearchField(search, key, keep) {
    const value = search[key];
    if (value == null)
        return {};
    return keep(value) ? { [key]: value } : {};
}
function compactProdutosSearch(search) {
    return {
        ...pickSearchField(search, "categoria", Boolean),
        ...pickSearchField(search, "busca", Boolean),
        ...pickSearchField(search, "loja", (loja) => loja !== "Todos"),
        ...pickSearchField(search, "ordenar", (ordenar) => ordenar !== "default"),
    };
}
export function parseProdutosSearch(search) {
    const loja = optionalString(search.loja);
    const ordenar = optionalString(search.ordenar);
    return compactProdutosSearch({
        categoria: optionalString(search.categoria),
        loja,
        busca: optionalString(search.busca),
        ordenar: isValidSortOption(ordenar) ? ordenar : undefined,
    });
}
export function mergeProdutosSearch(prev, next) {
    return compactProdutosSearch({ ...prev, ...next });
}
