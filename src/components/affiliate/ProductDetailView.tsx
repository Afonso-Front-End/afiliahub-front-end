import type { Product } from "@/data/marketplace";
import type { SiteContent } from "@/types/cms";
import { getFlashDealImageClass } from "@/lib/flash-deal-image-class";
import { getProductImageClass } from "@/lib/product-image-class";
import { productImageAreaClass, productImageAreaStyle } from "@/lib/product-image-background";
import { cn } from "@/lib/utils";
import {
  ProductAffiliateNote,
  ProductDetailActions,
  ProductDetailMeta,
} from "@/components/affiliate/ProductDetailSections";
import { Zap } from "lucide-react";

export function ProductFlashBanner() {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 bg-gradient-cta text-primary-foreground rounded-2xl sm:rounded-full px-4 py-2 text-xs font-semibold shadow-glow max-w-full">
      <Zap className="size-3.5 shrink-0" fill="currentColor" />
      <span>Oferta Relâmpago · tempo limitado</span>
    </div>
  );
}

export function ProductDetailGallery({
  product,
  discount,
  isFlashPromo,
}: {
  product: Product;
  discount: number;
  isFlashPromo: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square rounded-3xl overflow-hidden shadow-soft flex items-center justify-center",
        productImageAreaClass(product.background),
      )}
      style={productImageAreaStyle(product.background)}
    >
      <span className="absolute top-4 left-4 z-10 text-xs font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-full">
        {discount}% OFF
      </span>
      <img
        src={product.img}
        alt={product.name}
        className={
          isFlashPromo ? getFlashDealImageClass(product.img) : getProductImageClass(product.img, false)
        }
      />
    </div>
  );
}

export function ProductDetailInfo({
  product,
  content,
  fav,
  onBuy,
  onToggleFavorite,
}: {
  product: Product;
  content: SiteContent;
  fav: boolean;
  onBuy: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="flex flex-col">
      <ProductDetailMeta product={product} content={content} />
      <ProductDetailActions
        product={product}
        fav={fav}
        onBuy={onBuy}
        onToggleFavorite={onToggleFavorite}
      />
      <ProductAffiliateNote storeName={product.store} />
    </div>
  );
}
