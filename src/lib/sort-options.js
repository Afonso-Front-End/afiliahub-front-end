export const PRODUCT_SORT_OPTIONS = [
    { value: "default", label: "Relevância" },
    { value: "discount-desc", label: "Maior desconto" },
    { value: "price-asc", label: "Menor preço" },
    { value: "price-desc", label: "Maior preço" },
];
export function isValidSortOption(value) {
    return PRODUCT_SORT_OPTIONS.some((option) => option.value === value);
}
