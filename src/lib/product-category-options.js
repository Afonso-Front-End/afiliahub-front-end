export function getProductCategoryOptions(categories, products) {
    const activeCategorySlugs = categories
        .filter((category) => category.active !== false)
        .map((category) => category.slug);
    const productCategorySlugs = products.map((product) => product.category).filter(Boolean);
    const slugs = new Set([...activeCategorySlugs, ...productCategorySlugs]);
    return Array.from(slugs, (slug) => ({ slug, name: slug })).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}
