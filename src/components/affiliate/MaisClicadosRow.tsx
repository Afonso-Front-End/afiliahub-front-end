import { ArrowRight, Star } from "lucide-react";
import type { Product } from "@/data/marketplace";
import type { SiteContent } from "@/types/cms";
import { getStoreBadgeClass } from "@/lib/cms-stores";
import { getProductImageClass } from "@/lib/product-image-class";
import { productImageAreaClass, productImageAreaStyle } from "@/lib/product-image-background";
import { productDiscountPercent } from "@/lib/product-discount";
import { cn } from "@/lib/utils";

function MaisClicadosRowMeta({
  product,
  content,
  clicks,
}: {
  product: Product;
  content: SiteContent;
  clicks: number;
}) {
  const discount = productDiscountPercent(product.price, product.oldPrice);

  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
            getStoreBadgeClass(product.store, content),
          )}
        >
          {product.store}
        </span>
        <span className="text-[10px] font-bold text-primary">{discount}% OFF</span>
      </div>
      <p className="font-semibold text-sm md:text-base truncate">{product.name}</p>
      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Star className="size-3 fill-primary text-primary" />
          {product.rating}
        </span>
        <span className="text-primary font-semibold">
          {clicks.toLocaleString("pt-BR")} {clicks === 1 ? "clique" : "cliques"}
        </span>
      </div>
    </div>
  );
}

export function MaisClicadosRow({
  item,
  content,
  onClick,
  onBuy,
}: {
  item: {
    id: string;
    productId: string;
    clicks: number;
    rank: number;
    product: Product;
  };
  content: SiteContent;
  onClick: () => void;
  onBuy: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="w-full bg-surface rounded-3xl p-4 md:p-5 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all flex items-center gap-4 text-left cursor-pointer"
    >
      <span
        className={cn(
          "shrink-0 size-10 md:size-12 rounded-2xl grid place-items-center font-display font-extrabold text-lg",
          item.rank <= 3 ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {item.rank}
      </span>
      <div
        className={cn(
          "size-16 md:size-20 rounded-2xl shrink-0 overflow-hidden",
          productImageAreaClass(item.product.background),
        )}
        style={productImageAreaStyle(item.product.background)}
      >
        <img
          src={item.product.img}
          alt={item.product.name}
          className={getProductImageClass(item.product.img, true)}
        />
      </div>
      <MaisClicadosRowMeta
        product={item.product}
        content={content}
        clicks={item.clicks}
      />
      <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
        <div className="text-right">
          <p className="font-display font-extrabold text-lg text-primary">
            R$ {item.product.price.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-xs text-muted-foreground line-through">
            R$ {item.product.oldPrice.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBuy();
          }}
          className="rounded-xl bg-gradient-cta text-primary-foreground px-3 py-1.5 text-[10px] font-semibold shadow-glow hover:scale-[1.02] transition-transform"
        >
          Comprar
        </button>
      </div>
      <ArrowRight className="size-4 text-muted-foreground shrink-0 hidden md:block" />
    </div>
  );
}
