import { sortCmsItemsNewestFirst } from "@/lib/cms-item-sort";

function cmsItemNumericId(id: string) {
  return Number.parseInt(id.replace(/\D/g, ""), 10) || 0;
}

export function prependCmsItem<T extends { id: string }>(items: T[], item: T) {
  return sortCmsItemsNewestFirst([item, ...items]);
}

export function nextCmsItemId(prefix: string, items: Array<{ id: string }>) {
  const nums = items.map((item) => cmsItemNumericId(item.id));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `${prefix}${next}`;
}
