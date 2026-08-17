import type { CmsProduct, SiteContent } from "@/types/cms";
import type { Product } from "@/data/marketplace";
import { PRODUCT_FALLBACK_IMAGES } from "@/data/cms-fallback-images";
import { sortCmsItemsNewestFirst } from "@/lib/cms-item-sort";

export function cmsProductToProduct(item: CmsProduct): Product {
  return {
    id: item.id,
    name: item.name,
    img: item.imageUrl || PRODUCT_FALLBACK_IMAGES[item.id] || "",
    price: item.price,
    oldPrice: item.oldPrice,
    rating: item.rating,
    store: item.store,
    category: item.category,
    description: item.description,
    affiliateUrl: item.affiliateUrl ?? "",
    background: item.background,
  };
}

export function getActiveCmsProducts(content: SiteContent) {
  return sortCmsItemsNewestFirst(content.products.items.filter((p) => p.active)).map(
    cmsProductToProduct,
  );
}
