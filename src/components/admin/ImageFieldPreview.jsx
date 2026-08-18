import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ImageIcon } from "lucide-react";
import { getProductImageClass } from "@/lib/product-image-class";
import { productImageAreaClass, productImageAreaStyle } from "@/lib/product-image-background";
import { cn } from "@/lib/utils";
function PreviewPlaceholder() {
    return _jsx(ImageIcon, { className: "size-8 text-muted-foreground/40" });
}
function ProductCardImagePreview({ preview, imageBackground, }) {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider", children: "Preview no card" }), _jsx("div", { className: "rounded-2xl bg-surface border border-border p-2 shadow-soft", children: _jsx("div", { className: cn("relative aspect-square rounded-xl overflow-hidden", productImageAreaClass(imageBackground)), style: productImageAreaStyle(imageBackground), children: preview ? (_jsx("img", { src: preview, alt: "", className: getProductImageClass(preview, false) })) : (_jsx("div", { className: "w-full h-full grid place-items-center", children: _jsx(PreviewPlaceholder, {}) })) }) })] }));
}
function DefaultImagePreview({ preview, isPng }) {
    return (_jsx("div", { className: "aspect-square rounded-2xl bg-surface border border-border overflow-hidden grid place-items-center shadow-soft", children: preview ? (_jsx("img", { src: preview, alt: "", className: cn("w-full h-full", isPng ? "object-contain p-2" : "object-cover") })) : (_jsx(PreviewPlaceholder, {})) }));
}
export function ImageFieldPreview({ preview, isPng, variant, imageBackground, }) {
    if (variant === "product-card") {
        return _jsx(ProductCardImagePreview, { preview: preview, imageBackground: imageBackground });
    }
    return _jsx(DefaultImagePreview, { preview: preview, isPng: isPng });
}
