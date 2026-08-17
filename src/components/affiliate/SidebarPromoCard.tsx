import { Link } from "@tanstack/react-router";
import type { SidebarPromoContent } from "@/types/cms";
import { backgroundStyle } from "@/lib/background-style";
import { cn } from "@/lib/utils";

export function SidebarPromoCard({
  promo,
  className,
}: {
  promo: SidebarPromoContent;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl p-4", className)} style={backgroundStyle(promo.background)}>
      <p className="text-xs font-semibold text-accent-foreground/80">{promo.label}</p>
      <p className="text-sm font-bold mt-1 text-foreground">{promo.title}</p>
      <Link
        to={promo.linkHref}
        className="mt-3 text-xs font-semibold text-primary hover:underline inline-block"
      >
        {promo.linkText}
      </Link>
    </div>
  );
}
