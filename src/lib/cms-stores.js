import { sortCmsItemsNewestFirst } from "@/lib/cms-item-sort";
export const STORE_BADGE_PRESETS = [
    { value: "bg-[oklch(0.7_0.2_30)] text-white", label: "Laranja" },
    { value: "bg-[oklch(0.25_0.04_260)] text-white", label: "Escuro" },
    { value: "bg-[oklch(0.85_0.16_90)] text-[oklch(0.25_0.05_260)]", label: "Amarelo" },
    { value: "bg-[oklch(0.65_0.22_25)] text-white", label: "Vermelho" },
    { value: "bg-[oklch(0.55_0.22_25)] text-white", label: "Vinho" },
    { value: "bg-muted text-foreground", label: "Neutro" },
];
const STORE_LINK_STYLE_OPTIONS = [
    { value: "query", label: "Padrão (?keyword=produto)" },
    { value: "hyphen", label: "Com hífen (Mercado Livre / Magalu)" },
];
export const STORE_LINK_STYLE_SELECT_OPTIONS = STORE_LINK_STYLE_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
}));
export const STORE_BADGE_SELECT_OPTIONS = STORE_BADGE_PRESETS.map((option) => ({
    value: option.value,
    label: option.label,
}));
const FALLBACK_BADGE_CLASS = "bg-muted text-foreground";
function getActiveStores(content) {
    return sortCmsItemsNewestFirst(content.stores.items.filter((store) => store.active !== false));
}
export function getStoreFilterOptions(content) {
    return ["Todos", ...getActiveStores(content).map((store) => store.name)];
}
export function getStoreBadgeClass(storeName, content) {
    const store = content.stores.items.find((entry) => entry.name === storeName);
    return store?.badgeClass ?? FALLBACK_BADGE_CLASS;
}
function buildAffiliateUrl(storeName, productName, content) {
    const store = content.stores.items.find((entry) => entry.name === storeName);
    if (!store?.affiliateUrl)
        return "#";
    const query = encodeURIComponent(productName);
    if (store.searchParamStyle === "hyphen") {
        return `${store.affiliateUrl}${query.replace(/%20/g, "-")}`;
    }
    return `${store.affiliateUrl}${query}`;
}
/** Usa o link direto do produto se existir; caso contrário, busca na loja pelo nome. */
export function resolveProductAffiliateUrl(product, content) {
    const direct = product.affiliateUrl?.trim();
    if (direct)
        return direct;
    return buildAffiliateUrl(product.store, product.name, content);
}
export function getStoreSelectOptions(content) {
    return getActiveStores(content).map((store) => ({
        value: store.name,
        label: store.name,
    }));
}
