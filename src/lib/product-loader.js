import { cmsProductToProduct } from "@/lib/cms-product";
import { applyFlashDealToProduct, findFlashDealById } from "@/lib/flash-deal-resolve";
import { resolveHeroCouponProductId } from "@/lib/hero-coupon";
function findCmsProduct(content, productId) {
    return content.products.items.find((product) => product.id === productId);
}
function resolveProductFromCms(cmsItem, content, dealId) {
    const baseProduct = cmsProductToProduct(cmsItem);
    const flashDeal = findFlashDealById(content["flash-deals"].items, dealId);
    const useFlashDeal = flashDeal?.productId === cmsItem.id;
    if (!useFlashDeal || !flashDeal) {
        const heroCoupon = content["hero-coupon"];
        const heroProductId = resolveHeroCouponProductId(heroCoupon);
        const heroUrl = heroCoupon.affiliateUrl?.trim();
        if (heroUrl && cmsItem.id === heroProductId) {
            return {
                product: { ...baseProduct, affiliateUrl: heroUrl },
                isFlashPromo: false,
            };
        }
        return { product: baseProduct, isFlashPromo: false };
    }
    return {
        product: applyFlashDealToProduct(baseProduct, flashDeal, cmsItem),
        isFlashPromo: true,
    };
}
function loadRelatedProducts(content, productId, category) {
    return content.products.items
        .filter((item) => item.id !== productId && item.category === category && item.active)
        .slice(0, 4)
        .map(cmsProductToProduct);
}
export function loadProductDetail(content, productId, dealId) {
    const cmsItem = findCmsProduct(content, productId);
    if (!cmsItem)
        return null;
    const { product, isFlashPromo } = resolveProductFromCms(cmsItem, content, dealId);
    const related = loadRelatedProducts(content, productId, cmsItem.category);
    return { product, related, isFlashPromo };
}
