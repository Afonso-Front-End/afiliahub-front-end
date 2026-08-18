import { useCallback } from "react";
import { openTrackedAffiliateUrl } from "@/lib/affiliate-link";
import { resolveProductAffiliateUrl } from "@/lib/cms-stores";
export function useMarketplaceOffer(content, notify) {
    return useCallback(async (product) => {
        await openTrackedAffiliateUrl({
            storeName: product.store,
            productName: product.name,
            productId: product.id,
            url: resolveProductAffiliateUrl(product, content),
        }, notify);
    }, [content, notify]);
}
