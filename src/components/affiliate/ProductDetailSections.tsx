import { ArrowRight, Heart, Star, Tag } from "lucide-react";
import type { Product } from "@/data/marketplace";
import type { SiteContent } from "@/types/cms";
import { getStoreBadgeClass } from "@/lib/cms-stores";
import { cn } from "@/lib/utils";

export function ProductDetailMeta({
  product,
  content,
}: {
  product: Product;
  content: SiteContent;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
            getStoreBadgeClass(product.store, content),
          )}
        >
          {product.store}
        </span>
        <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <h1 className="mt-4 font-display font-extrabold text-2xl md:text-3xl leading-tight">
        {product.name}
      </h1>

      <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
        <Star className="size-4 fill-primary text-primary" />
        <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
        <span>· 4.2k vendidos</span>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-2 sm:gap-3">
        <span className="font-display font-extrabold text-2xl sm:text-4xl text-primary">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </span>
        <span className="text-base sm:text-lg text-muted-foreground line-through">
          R$ {product.oldPrice.toFixed(2).replace(".", ",")}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-primary">
        Economize R$ {(product.oldPrice - product.price).toFixed(2).replace(".", ",")}
      </p>

      <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{product.description}</p>
    </>
  );
}

export function ProductDetailActions({
  product,
  fav,
  onBuy,
  onToggleFavorite,
}: {
  product: Product;
  fav: boolean;
  onBuy: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      <button
        type="button"
        onClick={onBuy}
        className="inline-flex flex-1 items-center justify-center gap-2 bg-gradient-cta text-primary-foreground rounded-2xl px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold shadow-glow hover:scale-[1.01] transition-transform text-center"
      >
        <span className="sm:hidden">Comprar · {product.store}</span>
        <span className="hidden sm:inline">Comprar na {product.store}</span>
        <ArrowRight className="size-4" />
      </button>
      <button
        type="button"
        onClick={onToggleFavorite}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-colors",
          fav ? "bg-primary/10 text-primary" : "bg-muted hover:bg-accent text-foreground",
        )}
      >
        <Heart className={cn("size-4", fav && "fill-primary")} />
        {fav ? "Favoritado" : "Favoritar"}
      </button>
    </div>
  );
}

export function ProductAffiliateNote({ storeName }: { storeName: string }) {
  return (
    <div className="mt-6 flex items-start gap-3 bg-surface rounded-2xl p-4 shadow-soft">
      <div className="size-9 rounded-xl bg-muted grid place-items-center shrink-0">
        <Tag className="size-4 text-primary" />
      </div>
      <div>
        <p className="text-xs font-semibold">Link de afiliado seguro</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Ao comprar, você será redirecionado para {storeName} pelo link curado do AfiliaHub.
        </p>
      </div>
    </div>
  );
}
