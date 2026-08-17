import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HERO_COUPON_IMAGE, HERO_MAIN_IMAGE } from "@/data/cms-fallback-images";
import { backgroundStyle } from "@/lib/background-style";
import { resolveHeroCouponProductId } from "@/lib/hero-coupon";
import { AdminSectionOverlay } from "@/components/admin/AdminSectionOverlay";
import type { HeroMainContent, HeroSideCardContent } from "@/types/cms";

export function HeroMainCard({
  main,
  onCta,
}: {
  main: HeroMainContent;
  onCta: () => void;
}) {
  const mainImage = main.imageUrl || HERO_MAIN_IMAGE;

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col gap-4 lg:gap-0 lg:min-h-[340px] lg:col-span-2"
      style={backgroundStyle(main.background)}
    >
      <div className="relative z-10 w-full lg:max-w-[55%] flex flex-col justify-center">
        <span className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold bg-surface/70 backdrop-blur px-3 py-1.5 rounded-full text-primary">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          {main.badge}
        </span>
        <h1 className="mt-3 sm:mt-4 font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-foreground">
          {main.title}
        </h1>
        <p className="mt-3 text-sm md:text-base text-foreground/70 max-w-sm">
          {main.description.replace("{highlight}", main.highlight).split(main.highlight).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="font-bold text-primary">{main.highlight}</span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </p>
        <button
          onClick={onCta}
          className="mt-6 inline-flex w-fit items-center gap-2 bg-gradient-cta text-primary-foreground rounded-full px-6 py-3 text-sm font-semibold shadow-glow hover:scale-[1.02] transition-transform"
        >
          {main.buttonText}
          <ArrowRight className="size-4" />
        </button>
      </div>
      <img
        src={mainImage}
        alt={main.title}
        width={1024}
        height={768}
        className="relative z-0 w-full max-w-[280px] sm:max-w-[320px] mx-auto object-contain drop-shadow-2xl lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[55%] lg:max-w-[480px] lg:mx-0"
      />
    </div>
  );
}

export function HeroCashbackCard({ cashback }: { cashback: HeroSideCardContent }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 flex-1 min-h-[160px]"
      style={backgroundStyle(cashback.background)}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
        {cashback.label}
      </p>
      <h3 className="mt-1 font-display font-bold text-xl md:text-2xl leading-tight">
        {cashback.title}
      </h3>
      {cashback.subtitle && (
        <p className="text-xs text-foreground/60 mt-1">{cashback.subtitle}</p>
      )}
      <Link
        to={cashback.buttonLink as "/cashback"}
        className="mt-3 text-xs font-semibold inline-flex items-center gap-1 text-primary hover:underline"
      >
        {cashback.buttonText} <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}

export function HeroCouponCard({ coupon }: { coupon: HeroSideCardContent }) {
  const couponImage = coupon.imageUrl || HERO_COUPON_IMAGE;

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 flex-1 min-h-[160px] flex items-center"
      style={backgroundStyle(coupon.background)}
    >
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
          {coupon.label}
        </p>
        <h3 className="mt-1 font-display font-bold text-lg leading-tight">{coupon.title}</h3>
        <Link
          to="/produto/$productId"
          params={{ productId: resolveHeroCouponProductId(coupon) }}
          className="mt-3 inline-flex items-center gap-1.5 bg-foreground text-background rounded-full px-4 py-2 text-xs font-semibold hover:bg-primary transition-colors"
        >
          {coupon.buttonText}
        </Link>
      </div>
      <img
        src={couponImage}
        alt={coupon.title}
        loading="lazy"
        width={512}
        height={512}
        className="w-24 h-24 object-contain"
      />
    </div>
  );
}

export function wrapHeroAdmin(
  adminEdit: boolean | undefined,
  sectionId: "hero-main" | "hero-cashback" | "hero-coupon",
  label: string,
  children: React.ReactNode,
  className?: string,
) {
  if (!adminEdit) return children;
  return (
    <AdminSectionOverlay sectionId={sectionId} label={label} className={className}>
      {children}
    </AdminSectionOverlay>
  );
}
