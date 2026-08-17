import { useMarketplace } from "@/context/marketplace-context";
import type { Product } from "@/data/marketplace";
import { useSiteContent } from "@/context/site-content-context";
import {
  ProductCardActions,
  ProductCardImage,
  ProductCardMeta,
} from "@/components/affiliate/ProductCardSections";
import { productDiscountPercent } from "@/lib/product-discount";

export type { Product };

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite, openOffer } = useMarketplace();
  const { content } = useSiteContent();
  const fav = isFavorite(product.id);
  const discount = productDiscountPercent(product.price, product.oldPrice);

  return (
    <div className="group bg-surface rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-soft hover:shadow-card transition-all hover:-translate-y-1 flex flex-col min-w-0">
      <ProductCardImage
        product={product}
        discount={discount}
        fav={fav}
        onToggleFavorite={() => toggleFavorite(product.id)}
      />
      <ProductCardMeta product={product} content={content} />
      <ProductCardActions product={product} onBuy={() => openOffer(product)} />
    </div>
  );
}
