import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
import { ProductCardActions, ProductCardImage, ProductCardMeta, } from "@/components/affiliate/ProductCardSections";
import { productDiscountPercent } from "@/lib/product-discount";
export function ProductCard({ product }) {
    const { isFavorite, toggleFavorite, openOffer } = useMarketplace();
    const { content } = useSiteContent();
    const fav = isFavorite(product.id);
    const discount = productDiscountPercent(product.price, product.oldPrice);
    return (_jsxs("div", { className: "group bg-surface rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-soft hover:shadow-card transition-all hover:-translate-y-1 flex flex-col min-w-0", children: [_jsx(ProductCardImage, { product: product, discount: discount, fav: fav, onToggleFavorite: () => toggleFavorite(product.id) }), _jsx(ProductCardMeta, { product: product, content: content }), _jsx(ProductCardActions, { product: product, onBuy: () => openOffer(product) })] }));
}
