import { sortCmsItemsNewestFirst } from "@/lib/cms-item-sort";
function cmsItemNumericId(id) {
    return Number.parseInt(id.replace(/\D/g, ""), 10) || 0;
}
export function prependCmsItem(items, item) {
    return sortCmsItemsNewestFirst([item, ...items]);
}
export function nextCmsItemId(prefix, items) {
    const nums = items.map((item) => cmsItemNumericId(item.id));
    const next = nums.length ? Math.max(...nums) + 1 : 1;
    return `${prefix}${next}`;
}
