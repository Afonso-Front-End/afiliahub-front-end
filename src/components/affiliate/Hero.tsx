import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
import {
  HeroCashbackCard,
  HeroCouponCard,
  HeroMainCard,
  wrapHeroAdmin,
} from "@/components/affiliate/HeroCards";

export function Hero({ adminEdit }: { adminEdit?: boolean }) {
  const { scrollTo } = useMarketplace();
  const { content } = useSiteContent();
  const main = content["hero-main"];
  const cashback = content["hero-cashback"];
  const coupon = content["hero-coupon"];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {wrapHeroAdmin(
        adminEdit,
        "hero-main",
        "Hero principal",
        <HeroMainCard main={main} onCta={() => scrollTo(main.buttonTarget)} />,
        "lg:col-span-2",
      )}

      <div className="flex flex-col gap-4">
        {wrapHeroAdmin(
          adminEdit,
          "hero-cashback",
          "Card Em Alta",
          <HeroCashbackCard cashback={cashback} />,
        )}
        {wrapHeroAdmin(
          adminEdit,
          "hero-coupon",
          "Card Cupom",
          <HeroCouponCard coupon={coupon} />,
        )}
      </div>
    </section>
  );
}
