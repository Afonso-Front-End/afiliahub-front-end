import { useCallback } from "react";
import type { Product } from "@/data/marketplace";
import type { SiteContent } from "@/types/cms";
import { openTrackedAffiliateUrl } from "@/lib/affiliate-link";
import { resolveProductAffiliateUrl } from "@/lib/cms-stores";

export function useMarketplaceOffer(content: SiteContent, notify: (message: string) => void) {
  return useCallback(
    async (product: Product) => {
      await openTrackedAffiliateUrl(
        {
          storeName: product.store,
          productName: product.name,
          productId: product.id,
          url: resolveProductAffiliateUrl(product, content),
        },
        notify,
      );
    },
    [content, notify],
  );
}
