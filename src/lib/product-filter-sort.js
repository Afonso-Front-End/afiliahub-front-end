import { productDiscountPercent } from "@/lib/product-discount";
function productMatchesQuery(product, query) {
    const normalized = query.toLowerCase();
    return (product.name.toLowerCase().includes(normalized) ||
        product.store.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized));
}
function matchesQueryFilter(product, query) {
    if (!query)
        return true;
    return productMatchesQuery(product, query);
}
function matchesCategoryFilter(product, category) {
    if (!category)
        return true;
    return product.category === category;
}
function matchesStoreFilter(product, store) {
    if (!store || store === "Todos")
        return true;
    return product.store === store;
}
function productMatchesFilters(product, options) {
    const query = options.query?.trim();
    return (matchesQueryFilter(product, query) &&
        matchesCategoryFilter(product, options.category) &&
        matchesStoreFilter(product, options.store));
}
function filterProducts(products, options) {
    return products.filter((product) => productMatchesFilters(product, options));
}
const PRODUCT_SORTERS = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    "discount-desc": (a, b) => productDiscountPercent(b.price, b.oldPrice) - productDiscountPercent(a.price, a.oldPrice),
};
function sortProducts(products, sort) {
    if (sort === "default")
        return products;
    const sorted = [...products];
    sorted.sort(PRODUCT_SORTERS[sort]);
    return sorted;
}
export function filterAndSortProducts(products, options) {
    const filtered = filterProducts(products, options);
    return sortProducts(filtered, options.sort ?? "default");
}
