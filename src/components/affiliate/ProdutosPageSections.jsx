import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight, LayoutGrid, Package, Search } from "lucide-react";
import { ProductCard } from "@/components/affiliate/ProductCard";
import { FilterPill } from "@/components/affiliate/FilterPill";
import { PRODUCT_SORT_OPTIONS } from "@/lib/sort-options";
export function ProdutosPageHeader({ title, subtitle, }) {
    return (_jsx("section", { className: "rounded-3xl bg-surface border border-border p-6 md:p-8 shadow-soft", children: _jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold bg-muted px-3 py-1.5 rounded-full", children: [_jsx(Package, { className: "size-3.5 text-primary" }), "Cat\u00E1logo completo"] }), _jsx("h1", { className: "mt-3 font-display font-extrabold text-3xl md:text-4xl tracking-tight", children: title }), _jsx("p", { className: "mt-2 text-sm md:text-base text-muted-foreground max-w-2xl", children: subtitle })] }), _jsxs(Link, { to: "/categorias", className: "inline-flex items-center gap-1.5 text-sm font-semibold bg-muted hover:bg-accent rounded-full px-4 py-2 transition-colors", children: [_jsx(LayoutGrid, { className: "size-3.5" }), "Ver categorias", _jsx(ArrowRight, { className: "size-3.5" })] })] }) }));
}
function ProdutosSearchBar({ busca, onBuscaChange, onSearchSubmit, }) {
    return (_jsxs("form", { className: "flex items-center gap-2 bg-surface rounded-2xl border border-border px-4 h-12 shadow-soft", onSubmit: (e) => {
            e.preventDefault();
            onSearchSubmit();
        }, children: [_jsx(Search, { className: "size-4 text-muted-foreground shrink-0" }), _jsx("input", { type: "search", value: busca, onChange: (e) => onBuscaChange(e.target.value), placeholder: "Buscar produtos, lojas ou categorias\u2026", className: "flex-1 bg-transparent text-sm outline-none" })] }));
}
function ProdutosCategoryFilters({ categoryOptions, categoria, onCategoryChange, }) {
    return (_jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(FilterPill, { label: "Todas", active: !categoria, onClick: () => onCategoryChange(undefined) }), categoryOptions.map((cat) => (_jsx(FilterPill, { label: cat.name, active: categoria === cat.slug, onClick: () => onCategoryChange(cat.slug) }, cat.slug)))] }));
}
function ProdutosStoreAndSortFilters({ storeFilters, filtroLoja, onStoreChange, ordenar, onSortChange, resultCount, }) {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: [resultCount, " produto(s) encontrado(s)"] }), _jsx("div", { className: "flex flex-wrap gap-2", children: storeFilters.map((loja) => (_jsx(FilterPill, { label: loja, active: filtroLoja === loja, onClick: () => onStoreChange(loja) }, loja))) })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: PRODUCT_SORT_OPTIONS.map((opt) => (_jsx(FilterPill, { label: opt.label, active: ordenar === opt.value, variant: "primary", onClick: () => onSortChange(opt.value) }, opt.value))) })] }));
}
export function ProdutosFilters(props) {
    return (_jsxs(_Fragment, { children: [_jsx(ProdutosSearchBar, { busca: props.busca, onBuscaChange: props.onBuscaChange, onSearchSubmit: props.onSearchSubmit }), _jsx(ProdutosCategoryFilters, { categoryOptions: props.categoryOptions, categoria: props.categoria, onCategoryChange: props.onCategoryChange }), _jsx(ProdutosStoreAndSortFilters, { storeFilters: props.storeFilters, filtroLoja: props.filtroLoja, onStoreChange: props.onStoreChange, ordenar: props.ordenar, onSortChange: props.onSortChange, resultCount: props.resultCount })] }));
}
export function ProdutosResults({ products }) {
    if (products.length === 0) {
        return (_jsxs("div", { className: "bg-surface rounded-3xl p-10 text-center shadow-soft", children: [_jsx("p", { className: "font-semibold text-lg", children: "Nenhum produto encontrado" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Tente outra busca, categoria ou loja." }), _jsxs(Link, { to: "/categorias", className: "inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:underline", children: ["Explorar categorias", _jsx(ArrowRight, { className: "size-3.5" })] })] }));
    }
    return (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4", children: products.map((product) => (_jsx(ProductCard, { product: product }, product.id))) }));
}
