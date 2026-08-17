import type { HeroSideCardContent } from "@/types/cms";

export function resolveHeroCouponProductId(coupon: HeroSideCardContent) {
  const explicit = coupon.productId?.trim();
  if (explicit) return explicit;

  const match = coupon.buttonLink.match(/\/produto\/([^/?#]+)/);
  return match?.[1] ?? "6";
}
