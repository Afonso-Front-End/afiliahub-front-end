function cmsItemSortKey(id) {
    return Number.parseInt(id.replace(/\D/g, ""), 10) || 0;
}
export function sortCmsItemsNewestFirst(items) {
    return [...items].sort((a, b) => cmsItemSortKey(b.id) - cmsItemSortKey(a.id));
}
