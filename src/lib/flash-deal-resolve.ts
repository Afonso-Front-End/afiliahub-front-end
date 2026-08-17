import type { CmsProduct, FlashDealItem } from "@/types/cms";
import { FLASH_FALLBACK_IMAGES, PRODUCT_FALLBACK_IMAGES } from "@/data/cms-fallback-images";
import type { Product } from "@/data/marketplace";

export function findFlashDealById(deals: FlashDealItem[], dealId?: string) {
  if (!dealId) return null;
  return deals.find((d) => d.id === dealId) ?? null;
}

export function resolveFlashDealImage(deal: FlashDealItem, product?: CmsProduct) {
  const sources = [
    deal.imageUrl,
    product?.imageUrl,
    FLASH_FALLBACK_IMAGES[deal.id],
    product ? PRODUCT_FALLBACK_IMAGES[product.id] : undefined,
  ];

  return sources.find((src) => typeof src === "string" && src.length > 0) ?? "";
}

export function applyFlashDealToProduct(product: Product, deal: FlashDealItem, productCms?: CmsProduct) {
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
