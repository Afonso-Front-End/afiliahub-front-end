import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Heart, Star, ArrowRight, Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { getStoreBadgeClass } from "@/lib/cms-stores";
import { getProductImageClass } from "@/lib/product-image-class";
import { productImageAreaClass, productImageAreaStyle } from "@/lib/product-image-background";
export function ProductCardImage({ product, discount, fav, onToggleFavorite, }) {
    return (_jsxs(Link, { to: "/produto/$productId", params: { productId: product.id }, className: cn("relative aspect-square rounded-2xl overflow-hidden mb-3 block", productImageAreaClass(product.background)), style: productImageAreaStyle(product.background), children: [_jsxs("span", { className: "absolute top-2.5 left-2.5 z-10 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-1 rounded-full", children: [discount, "% OFF"] }), _jsx("button", { type: "button", onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite();
                }, className: "absolute top-2.5 right-2.5 z-10 size-8 grid place-items-center rounded-full bg-surface/90 backdrop-blur hover:bg-surface transition-colors", "aria-label": "Favoritar", children: _jsx(Heart, { className: cn("size-3.5", fav ? "fill-primary text-primary" : "text-foreground/60") }) }), _jsx("img", { src: product.img, alt: product.name, loading: "lazy", width: 512, height: 512, className: getProductImageClass(product.img) })] }));
}
export function ProductCardMeta({ product, content, }) {
    return (_jsxs(_Fragment, { children: [_jsx("span", { className: cn("self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", getStoreBadgeClass(product.store, content)), children: product.store }), _jsx(Link, { to: "/produto/$productId", params: { productId: product.id }, className: "font-semibold text-sm mt-2 line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors", children: product.name }), _jsxs("div", { className: "flex items-center gap-1 mt-1 text-xs text-muted-foreground", children: [_jsx(Star, { className: "size-3 fill-primary text-primary" }), _jsx("span", { className: "font-semibold text-foreground", children: product.rating.toFixed(1) }), _jsx("span", { children: "\u00B7 4.2k vendidos" })] }), _jsxs("div", { className: "mt-2 min-w-0", children: [_jsxs("p", { className: "font-display font-extrabold text-base sm:text-xl text-foreground whitespace-nowrap tabular-nums leading-tight", children: ["R$\u00A0", product.price.toFixed(2).replace(".", ",")] }), _jsxs("p", { className: "text-[11px] sm:text-xs text-muted-foreground line-through whitespace-nowrap tabular-nums mt-0.5", children: ["R$\u00A0", product.oldPrice.toFixed(2).replace(".", ",")] })] })] }));
}
export function ProductCardActions({ product, onBuy, }) {
    return (_jsxs("div", { className: "mt-3 flex flex-col gap-2", children: [_jsxs(Link, { to: "/produto/$productId", params: { productId: product.id }, className: "inline-flex items-center justify-center gap-1.5 bg-muted hover:bg-accent text-foreground rounded-2xl py-2.5 text-xs font-semibold transition-colors", children: [_jsx(Eye, { className: "size-3.5" }), "Ver produto"] }), _jsxs("button", { type: "button", onClick: onBuy, className: "inline-flex items-center justify-center gap-1.5 bg-foreground text-background rounded-2xl py-2.5 text-xs font-semibold hover:bg-primary transition-colors", children: ["Comprar na loja", _jsx(ArrowRight, { className: "size-3.5" })] })] }));
}
