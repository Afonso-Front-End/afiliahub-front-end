export function productDiscountPercent(price: number, oldPrice: number) {
  if (!Number.isFinite(price) || !Number.isFinite(oldPrice) || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
