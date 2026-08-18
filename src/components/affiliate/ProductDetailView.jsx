import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getFlashDealImageClass } from "@/lib/flash-deal-image-class";
import { getProductImageClass } from "@/lib/product-image-class";
import { productImageAreaClass, productImageAreaStyle } from "@/lib/product-image-background";
import { cn } from "@/lib/utils";
import { ProductAffiliateNote, ProductDetailActions, ProductDetailMeta, } from "@/components/affiliate/ProductDetailSections";
import { Zap } from "lucide-react";
export function ProductFlashBanner() {
    return (_jsxs("div", { className: "inline-flex flex-wrap items-center gap-2 bg-gradient-cta text-primary-foreground rounded-2xl sm:rounded-full px-4 py-2 text-xs font-semibold shadow-glow max-w-full", children: [_jsx(Zap, { className: "size-3.5 shrink-0", fill: "currentColor" }), _jsx("span", { children: "Oferta Rel\u00E2mpago \u00B7 tempo limitado" })] }));
}
export function ProductDetailGallery({ product, discount, isFlashPromo, }) {
    return (_jsxs("div", { className: cn("relative aspect-square rounded-3xl overflow-hidden shadow-soft flex items-center justify-center", productImageAreaClass(product.background)), style: productImageAreaStyle(product.background), children: [_jsxs("span", { className: "absolute top-4 left-4 z-10 text-xs font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-full", children: [discount, "% OFF"] }), _jsx("img", { src: product.img, alt: product.name, className: isFlashPromo ? getFlashDealImageClass(product.img) : getProductImageClass(product.img, false) })] }));
}
export function ProductDetailInfo({ product, content, fav, onBuy, onToggleFavorite, }) {
    return (_jsxs("div", { className: "flex flex-col", children: [_jsx(ProductDetailMeta, { product: product, content: content }), _jsx(ProductDetailActions, { product: product, fav: fav, onBuy: onBuy, onToggleFavorite: onToggleFavorite }), _jsx(ProductAffiliateNote, { storeName: product.store })] }));
}
