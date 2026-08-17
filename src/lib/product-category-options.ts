import type { SiteContent } from "@/types/cms";
import type { Product } from "@/data/marketplace";

export function getProductCategoryOptions(
  categories: SiteContent["categories"]["items"],
  products: Product[],
) {
  const activeCategorySlugs = categories
    .filter((category) => category.active !== false)
    .map((category) => category.slug);
  const productCategorySlugs = products.map((product) => product.category).filter(Boolean) as string[];
  const slugs = new Set([...activeCategorySlugs, ...productCategorySlugs]);

  return Array.from(slugs, (slug) => ({ slug, name: slug })).sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR"),
  );
}
