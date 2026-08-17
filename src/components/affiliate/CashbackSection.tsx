import { Wallet, TicketPercent, TrendingUp, ArrowRight, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
import { openTrackedAffiliateUrl } from "@/lib/affiliate-link";
import { backgroundStyle } from "@/lib/background-style";
import type { FeaturedCouponItem, SiteContent } from "@/types/cms";

const CARD_ICONS = [Wallet, TicketPercent, TrendingUp];

function CashbackCardsGrid({ section }: { section: SiteContent["cashback"] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {section.cards.map((card, i) => {
        const Icon = CARD_ICONS[i] ?? Wallet;
        return (
          <Link
            key={card.id}
            to={card.href}
            className="rounded-3xl p-6 group hover:-translate-y-1 transition-transform block"
            style={backgroundStyle(card.background)}
          >
            <div className="size-12 rounded-2xl bg-surface/80 backdrop-blur grid place-items-center mb-4">
              <Icon className="size-5 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg">{card.title}</h3>
            <p className="text-sm text-foreground/70 mt-1.5">{card.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {card.buttonText || "Explorar"}{" "}
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function CashbackCouponsStrip({
  coupons,
  onCouponClick,
}: {
  coupons: SiteContent["featured-coupons"];
  onCouponClick: (coupon: FeaturedCouponItem) => void;
}) {
  return (
    <div className="bg-surface rounded-3xl p-4 sm:p-5 shadow-soft flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 min-w-0">
      <div className="flex items-center gap-2 shrink-0">
        <div className="size-9 rounded-xl bg-gradient-cta grid place-items-center">
          <Zap className="size-4 text-primary-foreground" fill="currentColor" />
        </div>
        <div>
          <p className="text-xs font-semibold">{coupons.title}</p>
          <p className="text-[10px] text-muted-foreground">{coupons.subtitle}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 flex-1 min-w-0">
        {coupons.items.map((c) => (
          <button
            key={c.id}
            onClick={() => onCouponClick(c)}
            className="inline-flex items-center gap-2 bg-muted hover:bg-accent rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
          >
            <span className="text-primary font-mono">{c.code}</span>
            <span className="text-muted-foreground">· {c.discount}</span>
          </button>
        ))}
      </div>
      <Link
        to={coupons.linkHref}
        className="text-xs font-semibold text-primary hover:underline w-full sm:w-auto text-center sm:text-left shrink-0"
      >
        {coupons.linkText}
      </Link>
    </div>
  );
}

export function CashbackSection() {
  const { notify } = useMarketplace();
  const { content } = useSiteContent();
  const section = content.cashback;
  const coupons = content["featured-coupons"];

  return (
    <section id="cashback" className="mt-10 scroll-mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl">{section.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{section.subtitle}</p>
        </div>
        <Link
          to="/cashback"
          className="inline-flex items-center gap-1.5 text-sm font-semibold bg-surface px-4 py-2 rounded-full shadow-soft hover:shadow-card transition-shadow"
        >
          {section.buttonText}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <CashbackCardsGrid section={section} />
      <CashbackCouponsStrip
        coupons={coupons}
        onCouponClick={(coupon) => {
          const url = coupon.affiliateUrl?.trim();
          if (url) {
            void openTrackedAffiliateUrl(
              {
                storeName: "Marketplace",
                productName: `Cupom ${coupon.code}`,
                url,
              },
              notify,
            );
            return;
          }
          notify(`Cupom ${coupon.code}: acesse a página Cupons para copiar`);
        }}
      />
    </section>
  );
}
