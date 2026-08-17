import { Heart, Star, ArrowRight, Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/marketplace";
import type { SiteContent } from "@/types/cms";
import { getStoreBadgeClass } from "@/lib/cms-stores";
import { getProductImageClass } from "@/lib/product-image-class";
import { productImageAreaClass, productImageAreaStyle } from "@/lib/product-image-background";

export function ProductCardImage({
  product,
  discount,
  fav,
  onToggleFavorite,
}: {
  product: Product;
  discount: number;
  fav: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <Link
      to="/produto/$productId"
      params={{ productId: product.id }}
      className={cn(
        "relative aspect-square rounded-2xl overflow-hidden mb-3 block",
        productImageAreaClass(product.background),
      )}
      style={productImageAreaStyle(product.background)}
    >
      <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-1 rounded-full">
        {discount}% OFF
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-2.5 right-2.5 z-10 size-8 grid place-items-center rounded-full bg-surface/90 backdrop-blur hover:bg-surface transition-colors"
        aria-label="Favoritar"
      >
        <Heart className={cn("size-3.5", fav ? "fill-primary text-primary" : "text-foreground/60")} />
      </button>
      <img
        src={product.img}
        alt={product.name}
        loading="lazy"
        width={512}
        height={512}
        className={getProductImageClass(product.img)}
      />
    </Link>
  );
}

export function ProductCardMeta({
  product,
  content,
}: {
  product: Product;
  content: SiteContent;
}) {
  return (
    <>
      <span
        className={cn(
          "self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
          getStoreBadgeClass(product.store, content),
        )}
      >
        {product.store}
      </span>

      <Link
        to="/produto/$productId"
        params={{ productId: product.id }}
        className="font-semibold text-sm mt-2 line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors"
      >
        {product.name}
      </Link>

      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
        <Star className="size-3 fill-primary text-primary" />
        <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
        <span>· 4.2k vendidos</span>
      </div>

      <div className="mt-2 min-w-0">
        <p className="font-display font-extrabold text-base sm:text-xl text-foreground whitespace-nowrap tabular-nums leading-tight">
          R$&nbsp;{product.price.toFixed(2).replace(".", ",")}
        </p>
        <p className="text-[11px] sm:text-xs text-muted-foreground line-through whitespace-nowrap tabular-nums mt-0.5">
          R$&nbsp;{product.oldPrice.toFixed(2).replace(".", ",")}
        </p>
      </div>
    </>
  );
}

export function ProductCardActions({
  product,
  onBuy,
}: {
  product: Product;
  onBuy: () => void;
}) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <Link
        to="/produto/$productId"
        params={{ productId: product.id }}
        className="inline-flex items-center justify-center gap-1.5 bg-muted hover:bg-accent text-foreground rounded-2xl py-2.5 text-xs font-semibold transition-colors"
      >
        <Eye className="size-3.5" />
        Ver produto
      </Link>
      <button
        type="button"
        onClick={onBuy}
        className="inline-flex items-center justify-center gap-1.5 bg-foreground text-background rounded-2xl py-2.5 text-xs font-semibold hover:bg-primary transition-colors"
      >
        Comprar na loja
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}
