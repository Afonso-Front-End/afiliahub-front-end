function cmsItemSortKey(id: string) {
  return Number.parseInt(id.replace(/\D/g, ""), 10) || 0;
}

export function sortCmsItemsNewestFirst<T extends { id: string }>(items: T[]) {
  return [...items].sort((a, b) => cmsItemSortKey(b.id) - cmsItemSortKey(a.id));
}
