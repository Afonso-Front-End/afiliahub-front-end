import { ArrowRight, Check, Copy, Zap } from "lucide-react";
import type { PageCouponItem } from "@/types/cms";

export function CouponCard({
  cupom,
  copied,
  onCopy,
  onUseInStore,
}: {
  cupom: PageCouponItem;
  copied: boolean;
  onCopy: () => void;
  onUseInStore?: () => void;
}) {
  const hasStoreLink = Boolean(cupom.affiliateUrl?.trim());
  return (
    <div className="bg-surface rounded-3xl p-5 shadow-soft hover:shadow-card transition-shadow relative overflow-hidden">
      {cupom.hot && (
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase bg-primary text-primary-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
          <Zap className="size-2.5" fill="currentColor" /> Hot
        </span>
      )}
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {cupom.store}
      </p>
      <p className="font-display font-extrabold text-xl mt-1">{cupom.discount}</p>
      <p className="text-sm text-muted-foreground mt-1">{cupom.desc}</p>
      <div className="mt-4 flex items-center gap-2">
        <code className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm font-mono font-bold tracking-wider">
          {cupom.code}
        </code>
        <button
          type="button"
          onClick={onCopy}
          className="size-10 grid place-items-center rounded-xl bg-muted hover:bg-accent transition-colors"
          aria-label={`Copiar cupom ${cupom.code}`}
        >
          {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground mt-3">Válido até {cupom.expires}</p>
      {hasStoreLink && onUseInStore && (
        <button
          type="button"
          onClick={onUseInStore}
          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-cta text-primary-foreground px-3 py-2 text-xs font-semibold shadow-glow hover:scale-[1.01] transition-transform"
        >
          Usar na {cupom.store}
          <ArrowRight className="size-3.5" />
        </button>
      )}
    </div>
  );
}
