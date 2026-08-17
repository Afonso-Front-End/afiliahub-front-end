import { Zap, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSiteContent } from "@/context/site-content-context";
import { backgroundStyle } from "@/lib/background-style";
import { getFlashDealImageClass } from "@/lib/flash-deal-image-class";
import { resolveFlashDealImage } from "@/lib/flash-deal-resolve";
import type { CmsProduct, SiteContent } from "@/types/cms";

function formatCountdown(secs: number) {
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function useCountdown(secs: number) {
  const [t, setT] = useState<number | null>(null);

  useEffect(() => {
    setT(secs);
    const i = setInterval(() => setT((v) => (v != null && v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, [secs]);

  return t == null ? formatCountdown(secs) : formatCountdown(t);
}

function FlashDealsHeader({
  section,
  time,
}: {
  section: SiteContent["flash-deals"];
  time: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
      <div className="flex items-center gap-3">
        <div className="size-11 rounded-2xl bg-primary-foreground/20 backdrop-blur grid place-items-center">
          <Zap className="size-5 text-primary-foreground" fill="currentColor" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl md:text-2xl text-primary-foreground">
            {section.title}
          </h2>
          <p className="text-xs text-primary-foreground/80">{section.subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-primary-foreground/15 backdrop-blur px-4 py-2 rounded-full text-primary-foreground">
        <Clock className="size-4" />
        <span className="font-mono font-bold tabular-nums">{time}</span>
      </div>
    </div>
  );
}

function FlashDealCard({
  deal,
  products,
}: {
  deal: SiteContent["flash-deals"]["items"][number];
  products: CmsProduct[];
}) {
  const linkedProduct = products.find((p) => p.id === deal.productId);
  const image = resolveFlashDealImage(deal, linkedProduct);

  return (
    <Link
      to="/produto/$productId"
      params={{ productId: deal.productId }}
      search={{ deal: deal.id }}
      className="rounded-2xl p-3 hover:-translate-y-1 transition-transform text-left block"
      style={backgroundStyle(deal.background)}
    >
      <div className="relative aspect-square rounded-xl bg-surface-soft overflow-hidden flex items-center justify-center">
        <span className="absolute top-2 left-2 z-10 text-[10px] font-bold bg-foreground text-background px-2 py-0.5 rounded-full">
          {deal.discount}% OFF
        </span>
        <img
          src={image}
          alt={deal.name}
          loading="lazy"
          width={512}
          height={512}
          className={getFlashDealImageClass(image)}
        />
      </div>
      <p className="font-semibold text-xs mt-2 line-clamp-1">{deal.name}</p>
      <div className="mt-1 min-w-0">
        <p className="font-bold text-sm text-primary whitespace-nowrap tabular-nums leading-tight">
          R$&nbsp;{deal.price.toFixed(2).replace(".", ",")}
        </p>
        <p className="text-[10px] text-muted-foreground line-through whitespace-nowrap tabular-nums">
          R$&nbsp;{deal.old.toFixed(2).replace(".", ",")}
        </p>
      </div>
    </Link>
  );
}

export function FlashDeals() {
  const { content } = useSiteContent();
  const section = content["flash-deals"];
  const products = content.products.items;
  const time = useCountdown(section.countdownSeconds);

  return (
    <section id="promocoes" className="mt-10 scroll-mt-28">
      <div
        className="rounded-3xl p-6 md:p-8 shadow-glow"
        style={backgroundStyle(section.background)}
      >
        <FlashDealsHeader section={section} time={time} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {section.items.map((d) => (
            <FlashDealCard key={d.id} deal={d} products={products} />
          ))}
        </div>
      </div>
    </section>
  );
}
