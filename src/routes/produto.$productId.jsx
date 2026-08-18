import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { BackToHomeLink } from "@/components/affiliate/BackToHomeLink";
import { ProductCard } from "@/components/affiliate/ProductCard";
import { ProductDetailGallery, ProductDetailInfo, ProductFlashBanner, } from "@/components/affiliate/ProductDetailView";
import { useMarketplace } from "@/context/marketplace-context";
import { fetchSiteContent } from "@/api/cms";
import { loadProductDetail } from "@/lib/product-loader";
import { useSiteContent } from "@/context/site-content-context";
import { productDiscountPercent } from "@/lib/product-discount";
export const Route = createFileRoute("/produto/$productId")({
    validateSearch: (search) => ({
        deal: typeof search.deal === "string" ? search.deal : undefined,
    }),
    loaderDeps: ({ search }) => ({ deal: search.deal }),
    loader: async ({ params, deps }) => {
        const { content } = await fetchSiteContent();
        const result = loadProductDetail(content, params.productId, deps.deal);
        if (!result)
            throw notFound();
        return result;
    },
    head: ({ loaderData }) => ({
        meta: [
            {
                title: loaderData
                    ? `${loaderData.product.name} | AfiliaHub`
                    : "Produto | AfiliaHub",
            },
            {
                name: "description",
                content: loaderData?.product.description ?? "Detalhes do produto no AfiliaHub.",
            },
        ],
    }),
    component: ProductPage,
});
function ProductPage() {
    const { product, related, isFlashPromo } = Route.useLoaderData();
    const { isFavorite, toggleFavorite, openOffer } = useMarketplace();
    const { content } = useSiteContent();
    const fav = isFavorite(product.id);
    const discount = productDiscountPercent(product.price, product.oldPrice);
    return (_jsx(AppLayout, { children: _jsxs("article", { className: "space-y-8", children: [_jsx(BackToHomeLink, {}), isFlashPromo && _jsx(ProductFlashBanner, {}), _jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [_jsx(ProductDetailGallery, { product: product, discount: discount, isFlashPromo: isFlashPromo }), _jsx(ProductDetailInfo, { product: product, content: content, fav: fav, onBuy: () => openOffer(product), onToggleFavorite: () => toggleFavorite(product.id) })] }), related.length > 0 && (_jsxs("section", { children: [_jsx("h2", { className: "font-display font-bold text-xl md:text-2xl mb-4", children: "Produtos relacionados" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: related.map((item) => (_jsx(ProductCard, { product: item }, item.id))) })] }))] }) }));
}
