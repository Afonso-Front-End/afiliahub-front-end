export function productDiscountPercent(price, oldPrice) {
    if (!Number.isFinite(price) || !Number.isFinite(oldPrice) || oldPrice <= price)
        return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
}
