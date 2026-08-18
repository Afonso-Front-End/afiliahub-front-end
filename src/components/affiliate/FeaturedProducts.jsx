import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
function featuredSubtitle(hasFilters, count, defaultSubtitle) {
    return hasFilters ? `${count} produto(s) encontrado(s)` : defaultSubtitle;
}
function FeaturedProductsHeader({ title, subtitle, quickFilters, storeFilter, onStoreFilter, }) {
    return (_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3 mb-5", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl", children: title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs font-semibold", children: [quickFilters.map((filter) => (_jsx("button", { onClick: () => onStoreFilter(filter), className: cn("hidden md:inline-flex px-4 py-2 rounded-full transition-shadow", storeFilter === filter
                            ? "bg-foreground text-background"
                            : "bg-surface shadow-soft hover:shadow-card"), children: filter }, filter))), _jsxs(Link, { to: "/produtos", className: "inline-flex items-center gap-1.5 bg-surface px-4 py-2 rounded-full shadow-soft hover:shadow-card transition-shadow", children: ["Ver todos ", _jsx(ArrowRight, { className: "size-3.5" })] })] })] }));
}
function FeaturedProductsResults({ products }) {
    if (products.length === 0) {
        return (_jsxs("div", { className: "bg-surface rounded-3xl p-10 text-center shadow-soft", children: [_jsx("p", { className: "font-semibold text-lg", children: "Nenhum produto encontrado" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Tente outra busca, categoria ou loja." })] }));
    }
    return (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4", children: products.map((product) => (_jsx(ProductCard, { product: product }, product.id))) }));
}
export function FeaturedProducts() {
    const { filteredProducts, storeFilter, setStoreFilter, storeFilters, category, search } = useMarketplace();
    const quickFilters = storeFilters.filter((filter) => filter !== "Todos").slice(0, 4);
    const { content } = useSiteContent();
    const header = content["products-header"];
    const hasFilters = Boolean(category || search.trim() || storeFilter !== "Todos");
    return (_jsxs("section", { id: "produtos", className: "mt-10 scroll-mt-28", children: [_jsx(FeaturedProductsHeader, { title: header.title, subtitle: featuredSubtitle(hasFilters, filteredProducts.length, header.subtitle), quickFilters: quickFilters, storeFilter: storeFilter, onStoreFilter: setStoreFilter }), _jsx(FeaturedProductsResults, { products: filteredProducts })] }));
}
