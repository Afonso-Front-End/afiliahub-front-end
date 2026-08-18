import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { CATEGORY_FALLBACK_IMAGES } from "@/data/cms-fallback-images";
import { backgroundStyle } from "@/lib/background-style";
import { sortCmsItemsNewestFirst } from "@/lib/cms-item-sort";
function CategoryGridCardContent({ category }) {
    return (_jsxs(_Fragment, { children: [category.badge && (_jsx("span", { className: "absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-foreground/85 text-background px-2.5 py-1 rounded-full backdrop-blur", children: category.badge })), _jsx("div", { className: "aspect-square rounded-2xl overflow-hidden grid place-items-center", style: backgroundStyle(category.background), children: _jsx("img", { src: category.imageUrl || CATEGORY_FALLBACK_IMAGES[category.id], alt: category.name, loading: "lazy", width: 512, height: 512, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" }) }), _jsx("p", { className: "text-center font-semibold text-sm mt-3", children: category.name })] }));
}
function CategoryGridCard({ category, activeSlug, variant, onSelect, }) {
    const cardClass = cn("group relative rounded-3xl p-4 bg-surface shadow-soft hover:shadow-card transition-all hover:-translate-y-1 text-left", activeSlug === category.slug && "ring-2 ring-primary");
    if (variant === "page") {
        return (_jsx(Link, { to: "/produtos", search: { categoria: category.slug }, className: cardClass, children: _jsx(CategoryGridCardContent, { category: category }) }));
    }
    return (_jsx("button", { type: "button", onClick: () => onSelect?.(category.slug, category.name), className: cardClass, children: _jsx(CategoryGridCardContent, { category: category }) }));
}
export function CategoryGrid({ items, activeSlug, variant = "home", onSelect, }) {
    const visible = sortCmsItemsNewestFirst(items.filter((cat) => cat.active !== false));
    return (_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: visible.map((category) => (_jsx(CategoryGridCard, { category: category, activeSlug: activeSlug, variant: variant, onSelect: onSelect }, category.id))) }));
}
