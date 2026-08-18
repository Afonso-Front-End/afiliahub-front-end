function normalizePriceDecimal(cleaned) {
    return cleaned.includes(",")
        ? cleaned.replace(/\./g, "").replace(",", ".")
        : cleaned.replace(/,/g, "");
}
export function parseBrlPriceInput(input) {
    const cleaned = input.replace(/[^\d,.]/g, "").trim();
    if (!cleaned)
        return 0;
    const parsed = Number.parseFloat(normalizePriceDecimal(cleaned));
    return Number.isFinite(parsed) && parsed >= 0 ? Math.round(parsed * 100) / 100 : 0;
}
