import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CategoryGrid } from "./CategoryGrid";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
export function Categories() {
    const { category, setCategory, scrollTo, notify } = useMarketplace();
    const { content } = useSiteContent();
    const section = content.categories;
    return (_jsxs("section", { id: "categorias", className: "mt-10 scroll-mt-28", children: [_jsxs("div", { className: "flex items-end justify-between mb-5", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl", children: section.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: section.subtitle })] }), _jsxs(Link, { to: "/categorias", className: "inline-flex items-center gap-1.5 text-sm font-semibold bg-surface px-4 py-2 rounded-full shadow-soft hover:shadow-card transition-shadow shrink-0", children: [section.buttonText, " ", _jsx(ArrowRight, { className: "size-3.5" })] })] }), _jsx(CategoryGrid, { items: section.items, activeSlug: category, onSelect: (slug, name) => {
                    setCategory(slug);
                    scrollTo("produtos");
                    notify(`Categoria: ${name}`);
                } })] }));
}
