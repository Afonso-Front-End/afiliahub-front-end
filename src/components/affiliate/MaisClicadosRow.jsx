import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, Star } from "lucide-react";
import { getStoreBadgeClass } from "@/lib/cms-stores";
import { getProductImageClass } from "@/lib/product-image-class";
import { productImageAreaClass, productImageAreaStyle } from "@/lib/product-image-background";
import { productDiscountPercent } from "@/lib/product-discount";
import { cn } from "@/lib/utils";
function MaisClicadosRowMeta({ product, content, clicks, }) {
    const discount = productDiscountPercent(product.price, product.oldPrice);
    return (_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [_jsx("span", { className: cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", getStoreBadgeClass(product.store, content)), children: product.store }), _jsxs("span", { className: "text-[10px] font-bold text-primary", children: [discount, "% OFF"] })] }), _jsx("p", { className: "font-semibold text-sm md:text-base truncate", children: product.name }), _jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground", children: [_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Star, { className: "size-3 fill-primary text-primary" }), product.rating] }), _jsxs("span", { className: "text-primary font-semibold", children: [clicks.toLocaleString("pt-BR"), " ", clicks === 1 ? "clique" : "cliques"] })] })] }));
}
export function MaisClicadosRow({ item, content, onClick, onBuy, }) {
    return (_jsxs("div", { role: "button", tabIndex: 0, onClick: onClick, onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
            }
        }, className: "w-full bg-surface rounded-3xl p-4 md:p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all flex items-center gap-4 text-left cursor-pointer", children: [_jsx("span", { className: cn("shrink-0 size-10 md:size-12 rounded-2xl grid place-items-center font-display font-extrabold text-lg", item.rank <= 3 ? "bg-primary text-primary-foreground" : "bg-muted"), children: item.rank }), _jsx("div", { className: cn("size-16 md:size-20 rounded-2xl shrink-0 overflow-hidden", productImageAreaClass(item.product.background)), style: productImageAreaStyle(item.product.background), children: _jsx("img", { src: item.product.img, alt: item.product.name, className: getProductImageClass(item.product.img, true) }) }), _jsx(MaisClicadosRowMeta, { product: item.product, content: content, clicks: item.clicks }), _jsxs("div", { className: "hidden sm:flex flex-col items-end gap-2 shrink-0", children: [_jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-display font-extrabold text-lg text-primary", children: ["R$ ", item.product.price.toFixed(2).replace(".", ",")] }), _jsxs("p", { className: "text-xs text-muted-foreground line-through", children: ["R$ ", item.product.oldPrice.toFixed(2).replace(".", ",")] })] }), _jsx("button", { type: "button", onClick: (e) => {
                            e.stopPropagation();
                            onBuy();
                        }, className: "rounded-xl bg-gradient-cta text-primary-foreground px-3 py-1.5 text-[10px] font-semibold shadow-glow hover:scale-[1.02] transition-transform", children: "Comprar" })] }), _jsx(ArrowRight, { className: "size-4 text-muted-foreground shrink-0 hidden md:block" })] }));
}
