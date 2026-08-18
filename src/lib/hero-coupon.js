export function resolveHeroCouponProductId(coupon) {
    const explicit = coupon.productId?.trim();
    if (explicit)
        return explicit;
    const match = coupon.buttonLink.match(/\/produto\/([^/?#]+)/);
    return match?.[1] ?? "6";
}
