import { FLASH_FALLBACK_IMAGES, PRODUCT_FALLBACK_IMAGES } from "@/data/cms-fallback-images";
export function findFlashDealById(deals, dealId) {
    if (!dealId)
        return null;
    return deals.find((d) => d.id === dealId) ?? null;
}
export function resolveFlashDealImage(deal, product) {
    const sources = [
        deal.imageUrl,
        product?.imageUrl,
        FLASH_FALLBACK_IMAGES[deal.id],
        product ? PRODUCT_FALLBACK_IMAGES[product.id] : undefined,
    ];
    return sources.find((src) => typeof src === "string" && src.length > 0) ?? "";
}
export function applyFlashDealToProduct(product, deal, productCms) {
    const img = resolveFlashDealImage(deal, productCms);
    const dealUrl = deal.affiliateUrl?.trim();
    const productUrl = product.affiliateUrl?.trim();
    return {
        ...product,
        name: deal.name,
        img,
        price: deal.price,
        oldPrice: deal.old,
        affiliateUrl: dealUrl || productUrl || product.affiliateUrl,
    };
}
