import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Plus, Save } from "lucide-react";
import { nextCmsItemId, prependCmsItem } from "@/lib/cms-item-id";
import { sortCmsItemsNewestFirst } from "@/lib/cms-item-sort";
import { DEFAULT_PRODUCT_IMAGE_BACKGROUND } from "@/lib/product-image-background";
import { cn } from "@/lib/utils";
import { BackgroundEditor } from "./BackgroundEditor";
import { ImageField } from "./ImageField";
import { AdminField, AdminFormSection, AdminItemCard, AdminNumberField, AdminPriceField, AdminPriceGroup, AdminSelectField, priceDiscountPercent, } from "./AdminFormUi";
import { useSiteContent } from "@/context/site-content-context";
import { getStoreSelectOptions, STORE_BADGE_PRESETS, STORE_BADGE_SELECT_OPTIONS, STORE_LINK_STYLE_SELECT_OPTIONS, } from "@/lib/cms-stores";
import { CATEGORY_FALLBACK_IMAGES, FLASH_FALLBACK_IMAGES, HERO_COUPON_IMAGE, HERO_MAIN_IMAGE, PRODUCT_FALLBACK_IMAGES, } from "@/data/cms-fallback-images";
function withCurrentOption(options, current, orphanLabel = "(valor atual)") {
    if (!current || options.some((option) => option.value === current))
        return options;
    return [{ value: current, label: `${current} ${orphanLabel}` }, ...options];
}
export function SectionEditForm({ sectionId, initial, onSave, saving, createOnMount = false, onCreateHandled, }) {
    const [data, setData] = useState(initial);
    const [itemSaving, setItemSaving] = useState(null);
    const [itemSaved, setItemSaved] = useState(null);
    const createHandledRef = useRef(false);
    const { content: siteContent } = useSiteContent();
    const productCategoryOptions = useMemo(() => {
        const seen = new Set();
        return siteContent.categories.items
            .filter((category) => category.active !== false)
            .reduce((acc, category) => {
            if (seen.has(category.slug))
                return acc;
            seen.add(category.slug);
            acc.push({ value: category.slug, label: category.name });
            return acc;
        }, []);
    }, [siteContent.categories.items]);
    const productStoreOptions = useMemo(() => getStoreSelectOptions(siteContent), [siteContent.stores.items]);
    useEffect(() => {
        setData(initial);
    }, [initial]);
    useEffect(() => {
        if (!createOnMount || createHandledRef.current)
            return;
        createHandledRef.current = true;
        setData((current) => {
            if (sectionId === "categories") {
                const section = current;
                if (section.items.some((item) => item.name === "Nova categoria"))
                    return current;
                const id = nextCmsItemId("c", section.items);
                return {
                    ...section,
                    items: sortCmsItemsNewestFirst([
                        {
                            id,
                            name: "Nova categoria",
                            slug: "Nova categoria",
                            imageUrl: "",
                            background: { type: "solid", color: "#ffffff" },
                            active: true,
                        },
                        ...section.items,
                    ]),
                };
            }
            if (sectionId === "stores") {
                const section = current;
                if (section.items.some((item) => item.name === "Nova loja"))
                    return current;
                const id = nextCmsItemId("s", section.items);
                return {
                    ...section,
                    items: sortCmsItemsNewestFirst([
                        {
                            id,
                            name: "Nova loja",
                            affiliateUrl: "https://",
                            searchParamStyle: "query",
                            badgeClass: STORE_BADGE_PRESETS[0].value,
                            active: true,
                        },
                        ...section.items,
                    ]),
                };
            }
            if (sectionId === "products") {
                const section = current;
                if (section.items.some((item) => item.name === "Novo produto"))
                    return current;
                const id = nextCmsItemId("", section.items);
                return {
                    items: sortCmsItemsNewestFirst([
                        {
                            id,
                            name: "Novo produto",
                            imageUrl: "",
                            price: 99.9,
                            oldPrice: 149.9,
                            rating: 4.5,
                            store: productStoreOptions[0]?.value ?? "Shopee",
                            category: productCategoryOptions[0]?.value ?? "Eletrônicos",
                            description: "Descrição do produto.",
                            affiliateUrl: "",
                            background: DEFAULT_PRODUCT_IMAGE_BACKGROUND,
                            active: true,
                        },
                        ...section.items,
                    ]),
                };
            }
            return current;
        });
        onCreateHandled?.();
    }, [
        createOnMount,
        onCreateHandled,
        productCategoryOptions,
        productStoreOptions,
        sectionId,
    ]);
    const saveItem = async (itemKey) => {
        setItemSaving(itemKey);
        setItemSaved(null);
        try {
            await onSave(data);
            setItemSaved(itemKey);
            setTimeout(() => setItemSaved((current) => (current === itemKey ? null : current)), 3000);
        }
        finally {
            setItemSaving(null);
        }
    };
    const itemSaveProps = (itemKey) => ({
        onSaveItem: () => saveItem(itemKey),
        savingItem: itemSaving === itemKey,
        savedItem: itemSaved === itemKey,
    });
    return (_jsxs("form", { onSubmit: async (e) => {
            e.preventDefault();
            await onSave(data);
        }, className: "flex flex-col", children: [_jsxs("div", { className: "p-5 md:p-6 space-y-5", children: [sectionId === "hero-main" && (_jsxs(_Fragment, { children: [_jsxs(AdminFormSection, { title: "Textos", description: "Conte\u00FAdo principal do banner", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminField, { label: "Badge", value: data.badge, onChange: (v) => setData({ ...data, badge: v }) }), _jsx(AdminField, { label: "Destaque", value: data.highlight, onChange: (v) => setData({ ...data, highlight: v }) })] }), _jsx(AdminField, { label: "T\u00EDtulo", value: data.title, onChange: (v) => setData({ ...data, title: v }) }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o", hint: "Use {highlight} no texto para marcar o destaque em cor", value: data.description, onChange: (v) => setData({ ...data, description: v }), multiline: true }), _jsx(AdminField, { label: "Texto do bot\u00E3o", value: data.buttonText, onChange: (v) => setData({ ...data, buttonText: v }) })] }), _jsxs(AdminFormSection, { title: "Visual", description: "Imagem e fundo do card", children: [_jsx(ImageField, { label: "Imagem do produto", value: data.imageUrl, fallback: HERO_MAIN_IMAGE, onChange: (v) => setData({ ...data, imageUrl: v }) }), _jsx(BackgroundEditor, { value: data.background, onChange: (bg) => setData({ ...data, background: bg }) })] })] })), (sectionId === "hero-cashback" || sectionId === "hero-coupon") && (_jsxs(AdminFormSection, { title: "Card lateral", description: "Conte\u00FAdo do card no hero", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminField, { label: "R\u00F3tulo", value: data.label, onChange: (v) => setData({ ...data, label: v }) }), _jsx(AdminField, { label: "Texto do bot\u00E3o", value: data.buttonText, onChange: (v) => setData({ ...data, buttonText: v }) })] }), _jsx(AdminField, { label: "T\u00EDtulo", value: data.title, onChange: (v) => setData({ ...data, title: v }) }), _jsx(AdminField, { label: "Subt\u00EDtulo", value: data.subtitle, onChange: (v) => setData({ ...data, subtitle: v }) }), sectionId === "hero-cashback" ? (_jsx(AdminField, { label: "Link do bot\u00E3o", value: data.buttonLink, onChange: (v) => setData({ ...data, buttonLink: v }) })) : (_jsxs(_Fragment, { children: [_jsx(AdminField, { label: "ID do produto vinculado", hint: "Deve existir em Produtos em Destaque", value: data.productId ?? "", onChange: (v) => {
                                            const coupon = data;
                                            setData({
                                                ...coupon,
                                                productId: v,
                                                buttonLink: v ? `/produto/${v}` : coupon.buttonLink,
                                            });
                                        } }), _jsx(AdminField, { label: "Link do produto na loja", hint: "Cole o URL real do produto (recomendado). Vazio = usa o link do produto vinculado.", value: data.affiliateUrl ?? "", onChange: (v) => setData({ ...data, affiliateUrl: v }) })] })), sectionId === "hero-coupon" && (_jsx(ImageField, { label: "Imagem", value: data.imageUrl, fallback: HERO_COUPON_IMAGE, onChange: (v) => setData({ ...data, imageUrl: v }) })), _jsx(BackgroundEditor, { value: data.background, onChange: (bg) => setData({ ...data, background: bg }) })] })), sectionId === "categories" && (_jsxs(_Fragment, { children: [_jsxs(AdminFormSection, { title: "Cabe\u00E7alho da sec\u00E7\u00E3o", children: [_jsx(AdminField, { label: "T\u00EDtulo", value: data.title, onChange: (v) => setData({ ...data, title: v }) }), _jsx(AdminField, { label: "Subt\u00EDtulo", value: data.subtitle, onChange: (v) => setData({ ...data, subtitle: v }) })] }), _jsxs(AdminFormSection, { title: "Categorias", description: `${data.items.filter((c) => c.active !== false).length} visíveis, ${data.items.length} total`, children: [_jsx("div", { className: "flex justify-end", children: _jsxs("button", { type: "button", onClick: () => {
                                                const section = data;
                                                if (section.items.some((item) => item.name === "Nova categoria")) {
                                                    window.alert("Preencha e guarde a nova categoria antes de adicionar outra.");
                                                    return;
                                                }
                                                const id = nextCmsItemId("c", section.items);
                                                const newItem = {
                                                    id,
                                                    name: "Nova categoria",
                                                    slug: "Nova categoria",
                                                    imageUrl: "",
                                                    background: { type: "solid", color: "#ffffff" },
                                                    active: true,
                                                };
                                                setData({
                                                    ...section,
                                                    items: prependCmsItem(section.items, newItem),
                                                });
                                            }, className: "inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground rounded-full px-4 py-2 text-xs font-semibold shadow-glow hover:scale-[1.02] transition-transform", children: [_jsx(Plus, { className: "size-3.5" }), " Nova categoria"] }) }), _jsx("div", { className: "space-y-4", children: sortCmsItemsNewestFirst(data.items).map((item, displayIndex) => {
                                            const i = data.items.findIndex((entry) => entry.id === item.id);
                                            return (_jsxs(AdminItemCard, { index: displayIndex + 1, title: item.name, subtitle: item.slug, isActive: item.active !== false, onToggleActive: () => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, active: item.active === false };
                                                    setData({ ...data, items });
                                                }, onDelete: () => {
                                                    if (!confirm(`Apagar a categoria "${item.name}"?`))
                                                        return;
                                                    const items = data.items.filter((_, idx) => idx !== i);
                                                    setData({ ...data, items });
                                                }, ...itemSaveProps(`category-${item.id}`), children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminField, { label: "Nome", value: item.name, onChange: (v) => {
                                                                    const items = [...data.items];
                                                                    items[i] = { ...item, name: v };
                                                                    setData({ ...data, items });
                                                                } }), _jsx(AdminField, { label: "Slug (filtro)", value: item.slug, onChange: (v) => {
                                                                    const items = [...data.items];
                                                                    items[i] = { ...item, slug: v };
                                                                    setData({ ...data, items });
                                                                } })] }), _jsx(AdminField, { label: "Badge (opcional)", value: item.badge ?? "", onChange: (v) => {
                                                            const items = [...data.items];
                                                            items[i] = { ...item, badge: v || undefined };
                                                            setData({ ...data, items });
                                                        } }), _jsx(ImageField, { label: "Imagem", value: item.imageUrl, fallback: CATEGORY_FALLBACK_IMAGES[item.id], onChange: (v) => {
                                                            const items = [...data.items];
                                                            items[i] = { ...item, imageUrl: v };
                                                            setData({ ...data, items });
                                                        } }), _jsx(BackgroundEditor, { title: "Fundo da imagem", description: "Cor ou gradiente atr\u00E1s da foto no quadrado (vis\u00EDvel em PNG transparente)", value: item.background, onChange: (bg) => {
                                                            const items = [...data.items];
                                                            items[i] = { ...item, background: bg };
                                                            setData({ ...data, items });
                                                        } })] }, item.id));
                                        }) })] })] })), sectionId === "stores" && (_jsxs(_Fragment, { children: [_jsxs(AdminFormSection, { title: "Cabe\u00E7alho da sec\u00E7\u00E3o", children: [_jsx(AdminField, { label: "T\u00EDtulo", value: data.title, onChange: (v) => setData({ ...data, title: v }) }), _jsx(AdminField, { label: "Subt\u00EDtulo", value: data.subtitle, onChange: (v) => setData({ ...data, subtitle: v }) })] }), _jsxs(AdminFormSection, { title: "Lojas", description: `${data.items.filter((s) => s.active !== false).length} ativas, ${data.items.length} total. Usadas nos produtos, filtros e links`, children: [_jsx("div", { className: "flex justify-end", children: _jsxs("button", { type: "button", onClick: () => {
                                                const section = data;
                                                if (section.items.some((item) => item.name === "Nova loja")) {
                                                    window.alert("Preencha e guarde a nova loja antes de adicionar outra.");
                                                    return;
                                                }
                                                const id = nextCmsItemId("s", section.items);
                                                const newItem = {
                                                    id,
                                                    name: "Nova loja",
                                                    affiliateUrl: "https://",
                                                    searchParamStyle: "query",
                                                    badgeClass: STORE_BADGE_PRESETS[0].value,
                                                    active: true,
                                                };
                                                setData({
                                                    ...section,
                                                    items: prependCmsItem(section.items, newItem),
                                                });
                                            }, className: "inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground rounded-full px-4 py-2 text-xs font-semibold shadow-glow hover:scale-[1.02] transition-transform", children: [_jsx(Plus, { className: "size-3.5" }), " Nova loja"] }) }), _jsx("div", { className: "space-y-4", children: sortCmsItemsNewestFirst(data.items).map((item, displayIndex) => {
                                            const i = data.items.findIndex((entry) => entry.id === item.id);
                                            return (_jsxs(AdminItemCard, { index: displayIndex + 1, title: item.name, subtitle: item.affiliateUrl, isActive: item.active !== false, onToggleActive: () => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, active: item.active === false };
                                                    setData({ ...data, items });
                                                }, onDelete: () => {
                                                    if (!confirm(`Apagar a loja "${item.name}"?`))
                                                        return;
                                                    const items = data.items.filter((_, idx) => idx !== i);
                                                    setData({ ...data, items });
                                                }, ...itemSaveProps(`store-${item.id}`), children: [_jsx(AdminField, { label: "Nome", hint: "Nome exibido nos produtos e filtros", value: item.name, onChange: (v) => {
                                                            const items = [...data.items];
                                                            items[i] = { ...item, name: v };
                                                            setData({ ...data, items });
                                                        } }), _jsx(AdminField, { label: "URL base de afiliado", hint: "Termina antes do nome do produto", value: item.affiliateUrl, onChange: (v) => {
                                                            const items = [...data.items];
                                                            items[i] = { ...item, affiliateUrl: v };
                                                            setData({ ...data, items });
                                                        } }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminSelectField, { label: "Formato do link", value: item.searchParamStyle, options: STORE_LINK_STYLE_SELECT_OPTIONS, onChange: (v) => {
                                                                    const items = [...data.items];
                                                                    items[i] = {
                                                                        ...item,
                                                                        searchParamStyle: v,
                                                                    };
                                                                    setData({ ...data, items });
                                                                } }), _jsx(AdminSelectField, { label: "Cor do badge", value: item.badgeClass, options: STORE_BADGE_SELECT_OPTIONS, onChange: (v) => {
                                                                    const items = [...data.items];
                                                                    items[i] = { ...item, badgeClass: v };
                                                                    setData({ ...data, items });
                                                                } })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { className: cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", item.badgeClass), children: "Pr\u00E9-visualiza\u00E7\u00E3o" }) })] }, item.id));
                                        }) })] })] })), sectionId === "products-header" && (_jsxs(AdminFormSection, { title: "Cabe\u00E7alho", children: [_jsx(AdminField, { label: "T\u00EDtulo", value: data.title, onChange: (v) => setData({ ...data, title: v }) }), _jsx(AdminField, { label: "Subt\u00EDtulo", value: data.subtitle, onChange: (v) => setData({ ...data, subtitle: v }) })] })), sectionId === "products" && (_jsxs(AdminFormSection, { title: "Produtos", description: `${data.items.filter((p) => p.active).length} visíveis, ${data.items.length} total`, children: [_jsxs("p", { className: "text-xs text-muted-foreground", children: ["As lojas do select v\u00EAm de", " ", _jsx(Link, { to: "/admin/edit/$section", params: { section: "stores" }, className: "text-primary font-semibold hover:underline", children: "Lojas / Marketplaces" }), "."] }), _jsx("div", { className: "flex justify-end", children: _jsxs("button", { type: "button", onClick: () => {
                                        const section = data;
                                        if (section.items.some((item) => item.name === "Novo produto")) {
                                            window.alert("Preencha e guarde o novo produto antes de adicionar outro.");
                                            return;
                                        }
                                        const id = nextCmsItemId("", section.items);
                                        const newItem = {
                                            id,
                                            name: "Novo produto",
                                            imageUrl: "",
                                            price: 99.9,
                                            oldPrice: 149.9,
                                            rating: 4.5,
                                            store: productStoreOptions[0]?.value ?? "Shopee",
                                            category: productCategoryOptions[0]?.value ?? "Eletrônicos",
                                            description: "Descrição do produto.",
                                            affiliateUrl: "",
                                            background: DEFAULT_PRODUCT_IMAGE_BACKGROUND,
                                            active: true,
                                        };
                                        setData({
                                            items: sortCmsItemsNewestFirst([newItem, ...section.items]),
                                        });
                                    }, className: "inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground rounded-full px-4 py-2 text-xs font-semibold shadow-glow hover:scale-[1.02] transition-transform", children: [_jsx(Plus, { className: "size-3.5" }), " Novo produto"] }) }), _jsx("div", { className: "space-y-4", children: sortCmsItemsNewestFirst(data.items).map((item, displayIndex) => {
                                    const i = data.items.findIndex((entry) => entry.id === item.id);
                                    return (_jsxs(AdminItemCard, { index: displayIndex + 1, title: item.name, subtitle: item.store, isActive: item.active, onToggleActive: () => {
                                            const items = [...data.items];
                                            items[i] = { ...item, active: !item.active };
                                            setData({ ...data, items });
                                        }, onDelete: () => {
                                            if (!confirm(`Apagar o produto "${item.name}"?`))
                                                return;
                                            const items = data.items.filter((_, idx) => idx !== i);
                                            setData({ ...data, items });
                                        }, ...itemSaveProps(`product-${item.id}`), children: [_jsx(AdminField, { label: "Nome", value: item.name, onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, name: v };
                                                    setData({ ...data, items });
                                                } }), _jsx(AdminField, { label: "Link do produto na loja", hint: "Cole o URL real do produto (recomendado). Vazio = busca autom\u00E1tica pelo nome.", value: item.affiliateUrl ?? "", onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, affiliateUrl: v };
                                                    setData({ ...data, items });
                                                } }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminSelectField, { label: "Loja", hint: "Marketplace onde o produto \u00E9 vendido", value: item.store, options: withCurrentOption(productStoreOptions, item.store, "(não listada)"), onChange: (v) => {
                                                            const items = [...data.items];
                                                            items[i] = { ...item, store: v };
                                                            setData({ ...data, items });
                                                        } }), _jsx(AdminSelectField, { label: "Categoria", hint: "Lista as categorias ativas do site", value: item.category, options: withCurrentOption(productCategoryOptions, item.category, "(não listada)"), onChange: (v) => {
                                                            const items = [...data.items];
                                                            items[i] = { ...item, category: v };
                                                            setData({ ...data, items });
                                                        } })] }), _jsx(AdminPriceGroup, { price: item.price, oldPrice: item.oldPrice, onPriceChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, price: v };
                                                    setData({ ...data, items });
                                                }, onOldPriceChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, oldPrice: v };
                                                    setData({ ...data, items });
                                                } }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o", value: item.description, onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, description: v };
                                                    setData({ ...data, items });
                                                }, multiline: true }), _jsx(AdminNumberField, { label: "Avalia\u00E7\u00E3o", step: "0.1", value: item.rating, onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, rating: v };
                                                    setData({ ...data, items });
                                                } }), _jsx(ImageField, { label: "Imagem", value: item.imageUrl, fallback: PRODUCT_FALLBACK_IMAGES[item.id], variant: "product-card", imageBackground: item.background, onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, imageUrl: v };
                                                    setData({ ...data, items });
                                                } }), _jsx(BackgroundEditor, { title: "Fundo da imagem", description: "Cor ou gradiente atr\u00E1s da foto no card (vis\u00EDvel em PNG transparente)", value: item.background ?? DEFAULT_PRODUCT_IMAGE_BACKGROUND, onChange: (bg) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, background: bg };
                                                    setData({ ...data, items });
                                                } })] }, item.id));
                                }) })] })), sectionId === "flash-deals" && (_jsxs(_Fragment, { children: [_jsxs(AdminFormSection, { title: "Cabe\u00E7alho", children: [_jsx(AdminField, { label: "T\u00EDtulo", value: data.title, onChange: (v) => setData({ ...data, title: v }) }), _jsx(AdminField, { label: "Subt\u00EDtulo", value: data.subtitle, onChange: (v) => setData({ ...data, subtitle: v }) }), _jsx(BackgroundEditor, { value: data.background, onChange: (bg) => setData({ ...data, background: bg }) })] }), _jsx(AdminFormSection, { title: "Ofertas", children: _jsx("div", { className: "space-y-4", children: data.items.map((item, i) => (_jsxs(AdminItemCard, { index: i + 1, title: item.name, subtitle: item.productId, ...itemSaveProps(`flash-${item.id}`), children: [_jsx(AdminField, { label: "Nome", value: item.name, onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, name: v };
                                                    setData({ ...data, items });
                                                } }), _jsx(AdminField, { label: "ID do produto vinculado", hint: "P\u00E1gina do produto aberta ao clicar (pre\u00E7os da oferta s\u00E3o os abaixo)", value: item.productId, onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, productId: v };
                                                    setData({ ...data, items });
                                                } }), _jsx(AdminField, { label: "Link do produto na loja", hint: "Cole o URL real do produto (recomendado). Vazio = usa o link do produto vinculado.", value: item.affiliateUrl ?? "", onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, affiliateUrl: v };
                                                    setData({ ...data, items });
                                                } }), _jsxs("div", { className: "rounded-2xl border border-border/60 bg-muted/15 p-4 space-y-3", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsx("p", { className: "text-xs font-semibold text-foreground", children: "Pre\u00E7os da oferta" }), _jsxs("span", { className: "text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2.5 py-1 rounded-full", children: [priceDiscountPercent(item.price, item.old) || item.discount, "% OFF"] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(AdminPriceField, { label: "Pre\u00E7o oferta", value: item.price, onChange: (v) => {
                                                                    const items = [...data.items];
                                                                    items[i] = {
                                                                        ...item,
                                                                        price: v,
                                                                        discount: priceDiscountPercent(v, item.old) || item.discount,
                                                                    };
                                                                    setData({ ...data, items });
                                                                } }), _jsx(AdminPriceField, { label: "Pre\u00E7o antigo", value: item.old, onChange: (v) => {
                                                                    const items = [...data.items];
                                                                    items[i] = {
                                                                        ...item,
                                                                        old: v,
                                                                        discount: priceDiscountPercent(item.price, v) || item.discount,
                                                                    };
                                                                    setData({ ...data, items });
                                                                } })] })] }), _jsx(ImageField, { label: "Imagem", value: item.imageUrl, fallback: FLASH_FALLBACK_IMAGES[item.id], variant: "product-card", onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, imageUrl: v };
                                                    setData({ ...data, items });
                                                } })] }, item.id))) }) })] })), sectionId === "cashback" && (_jsxs(_Fragment, { children: [_jsxs(AdminFormSection, { title: "Cabe\u00E7alho", children: [_jsx(AdminField, { label: "T\u00EDtulo", value: data.title, onChange: (v) => setData({ ...data, title: v }) }), _jsx(AdminField, { label: "Subt\u00EDtulo", value: data.subtitle, onChange: (v) => setData({ ...data, subtitle: v }) })] }), _jsx(AdminFormSection, { title: "Cards de destaque", children: _jsx("div", { className: "space-y-4", children: data.cards.map((card, i) => (_jsxs(AdminItemCard, { index: i + 1, title: card.title, subtitle: card.href, ...itemSaveProps(`cashback-${card.id}`), children: [_jsx(AdminField, { label: "T\u00EDtulo", value: card.title, onChange: (v) => {
                                                    const cards = [...data.cards];
                                                    cards[i] = { ...card, title: v };
                                                    setData({ ...data, cards });
                                                } }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o", value: card.desc, onChange: (v) => {
                                                    const cards = [...data.cards];
                                                    cards[i] = { ...card, desc: v };
                                                    setData({ ...data, cards });
                                                }, multiline: true }), _jsx(AdminField, { label: "Texto do bot\u00E3o", value: card.buttonText, onChange: (v) => {
                                                    const cards = [...data.cards];
                                                    cards[i] = { ...card, buttonText: v };
                                                    setData({ ...data, cards });
                                                } }), _jsx(AdminField, { label: "Link", value: card.href, onChange: (v) => {
                                                    const cards = [...data.cards];
                                                    cards[i] = { ...card, href: v };
                                                    setData({ ...data, cards });
                                                } }), _jsx(BackgroundEditor, { value: card.background, onChange: (bg) => {
                                                    const cards = [...data.cards];
                                                    cards[i] = { ...card, background: bg };
                                                    setData({ ...data, cards });
                                                } })] }, card.id))) }) })] })), sectionId === "featured-coupons" && (_jsxs(_Fragment, { children: [_jsxs(AdminFormSection, { title: "Barra de cupons", children: [_jsx(AdminField, { label: "T\u00EDtulo", value: data.title, onChange: (v) => setData({ ...data, title: v }) }), _jsx(AdminField, { label: "Subt\u00EDtulo", value: data.subtitle, onChange: (v) => setData({ ...data, subtitle: v }) }), _jsx(AdminField, { label: "Texto do link", value: data.linkText, onChange: (v) => setData({ ...data, linkText: v }) })] }), _jsx(AdminFormSection, { title: "Cupons", children: _jsx("div", { className: "space-y-4", children: data.items.map((item, i) => (_jsxs(AdminItemCard, { index: i + 1, title: item.code, subtitle: item.discount, ...itemSaveProps(`coupon-${item.id}`), children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminField, { label: "C\u00F3digo", value: item.code, onChange: (v) => {
                                                            const items = [...data.items];
                                                            items[i] = { ...item, code: v };
                                                            setData({ ...data, items });
                                                        } }), _jsx(AdminField, { label: "Desconto", value: item.discount, onChange: (v) => {
                                                            const items = [...data.items];
                                                            items[i] = { ...item, discount: v };
                                                            setData({ ...data, items });
                                                        } })] }), _jsx(AdminField, { label: "Link na loja", hint: "URL para usar o cupom no marketplace (abre em nova aba ao clicar no chip)", value: item.affiliateUrl ?? "", onChange: (v) => {
                                                    const items = [...data.items];
                                                    items[i] = { ...item, affiliateUrl: v };
                                                    setData({ ...data, items });
                                                } })] }, item.id))) }) })] })), sectionId === "sidebar-promo" && (_jsxs(AdminFormSection, { title: "Promo da sidebar", children: [_jsx(AdminField, { label: "R\u00F3tulo", value: data.label, onChange: (v) => setData({ ...data, label: v }) }), _jsx(AdminField, { label: "T\u00EDtulo", value: data.title, onChange: (v) => setData({ ...data, title: v }) }), _jsx(AdminField, { label: "Texto do link", value: data.linkText, onChange: (v) => setData({ ...data, linkText: v }) }), _jsx(BackgroundEditor, { value: data.background, onChange: (bg) => setData({ ...data, background: bg }) })] })), sectionId === "page-cashback" && (_jsxs(_Fragment, { children: [_jsxs(AdminFormSection, { title: "Hero da p\u00E1gina", children: [_jsx(AdminField, { label: "Badge", value: data.hero.badge, onChange: (v) => setData({
                                            ...data,
                                            hero: { ...data.hero, badge: v },
                                        }) }), _jsx(AdminField, { label: "T\u00EDtulo", value: data.hero.title, onChange: (v) => setData({
                                            ...data,
                                            hero: { ...data.hero, title: v },
                                        }) }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o", value: data.hero.description, onChange: (v) => setData({
                                            ...data,
                                            hero: { ...data.hero, description: v },
                                        }), multiline: true }), _jsx(BackgroundEditor, { value: data.hero.background, onChange: (bg) => setData({
                                            ...data,
                                            hero: { ...data.hero, background: bg },
                                        }) })] }), _jsx(AdminFormSection, { title: "Estat\u00EDsticas do hero", children: data.hero.stats.map((stat, i) => (_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminField, { label: `Valor ${i + 1}`, value: stat.value, onChange: (v) => {
                                                const stats = [...data.hero.stats];
                                                stats[i] = { ...stat, value: v };
                                                setData({
                                                    ...data,
                                                    hero: { ...data.hero, stats },
                                                });
                                            } }), _jsx(AdminField, { label: `Rótulo ${i + 1}`, value: stat.label, onChange: (v) => {
                                                const stats = [...data.hero.stats];
                                                stats[i] = { ...stat, label: v };
                                                setData({
                                                    ...data,
                                                    hero: { ...data.hero, stats },
                                                });
                                            } })] }, stat.id))) }), _jsxs(AdminFormSection, { title: "Como funciona", children: [_jsx(AdminField, { label: "T\u00EDtulo", value: data.howItWorksTitle, onChange: (v) => setData({ ...data, howItWorksTitle: v }) }), data.howItWorks.map((step, i) => (_jsxs(AdminItemCard, { index: i + 1, title: step.title, ...itemSaveProps(`how-${step.id}`), children: [_jsx(AdminField, { label: "Passo", value: step.step, onChange: (v) => {
                                                    const howItWorks = [...data.howItWorks];
                                                    howItWorks[i] = { ...step, step: v };
                                                    setData({ ...data, howItWorks });
                                                } }), _jsx(AdminField, { label: "T\u00EDtulo", value: step.title, onChange: (v) => {
                                                    const howItWorks = [...data.howItWorks];
                                                    howItWorks[i] = { ...step, title: v };
                                                    setData({ ...data, howItWorks });
                                                } }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o", value: step.desc, onChange: (v) => {
                                                    const howItWorks = [...data.howItWorks];
                                                    howItWorks[i] = { ...step, desc: v };
                                                    setData({ ...data, howItWorks });
                                                }, multiline: true })] }, step.id))), _jsx(AdminField, { label: "Texto do bot\u00E3o final", value: data.ctaText, onChange: (v) => setData({ ...data, ctaText: v }) })] }), _jsxs(AdminFormSection, { title: "SEO", children: [_jsx(AdminField, { label: "T\u00EDtulo da p\u00E1gina", value: data.metaTitle, onChange: (v) => setData({ ...data, metaTitle: v }) }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o meta", value: data.metaDescription, onChange: (v) => setData({ ...data, metaDescription: v }), multiline: true })] })] })), sectionId === "page-cupons" && (_jsxs(_Fragment, { children: [_jsxs(AdminFormSection, { title: "Hero da p\u00E1gina", children: [_jsx(AdminField, { label: "Badge", value: data.hero.badge, onChange: (v) => setData({
                                            ...data,
                                            hero: { ...data.hero, badge: v },
                                        }) }), _jsx(AdminField, { label: "T\u00EDtulo", value: data.hero.title, onChange: (v) => setData({
                                            ...data,
                                            hero: { ...data.hero, title: v },
                                        }) }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o", value: data.hero.description, onChange: (v) => setData({
                                            ...data,
                                            hero: { ...data.hero, description: v },
                                        }), multiline: true }), _jsx(BackgroundEditor, { value: data.hero.background, onChange: (bg) => setData({
                                            ...data,
                                            hero: { ...data.hero, background: bg },
                                        }) })] }), _jsx(AdminFormSection, { title: "Estat\u00EDsticas do hero", children: data.hero.stats.map((stat, i) => (_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminField, { label: `Valor ${i + 1}`, value: stat.value, onChange: (v) => {
                                                const stats = [...data.hero.stats];
                                                stats[i] = { ...stat, value: v };
                                                setData({
                                                    ...data,
                                                    hero: { ...data.hero, stats },
                                                });
                                            } }), _jsx(AdminField, { label: `Rótulo ${i + 1}`, value: stat.label, onChange: (v) => {
                                                const stats = [...data.hero.stats];
                                                stats[i] = { ...stat, label: v };
                                                setData({
                                                    ...data,
                                                    hero: { ...data.hero, stats },
                                                });
                                            } })] }, stat.id))) }), _jsxs(AdminFormSection, { title: "Lista de cupons", children: [_jsx(AdminField, { label: "T\u00EDtulo", value: data.listTitle, onChange: (v) => setData({ ...data, listTitle: v }) }), _jsx(AdminField, { label: "Subt\u00EDtulo", value: data.listSubtitle, onChange: (v) => setData({ ...data, listSubtitle: v }) }), _jsx("div", { className: "space-y-4", children: data.coupons.map((cupom, i) => (_jsxs(AdminItemCard, { index: i + 1, title: cupom.code, ...itemSaveProps(`coupon-${cupom.id}`), children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminField, { label: "C\u00F3digo", value: cupom.code, onChange: (v) => {
                                                                const coupons = [...data.coupons];
                                                                coupons[i] = { ...cupom, code: v };
                                                                setData({ ...data, coupons });
                                                            } }), _jsx(AdminSelectField, { label: "Loja", value: cupom.store, options: withCurrentOption(productStoreOptions, cupom.store, "(não listada)"), onChange: (v) => {
                                                                const coupons = [...data.coupons];
                                                                coupons[i] = { ...cupom, store: v };
                                                                setData({ ...data, coupons });
                                                            } }), _jsx(AdminField, { label: "Desconto", value: cupom.discount, onChange: (v) => {
                                                                const coupons = [...data.coupons];
                                                                coupons[i] = { ...cupom, discount: v };
                                                                setData({ ...data, coupons });
                                                            } }), _jsx(AdminField, { label: "Validade", value: cupom.expires, onChange: (v) => {
                                                                const coupons = [...data.coupons];
                                                                coupons[i] = { ...cupom, expires: v };
                                                                setData({ ...data, coupons });
                                                            } })] }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o", value: cupom.desc, onChange: (v) => {
                                                        const coupons = [...data.coupons];
                                                        coupons[i] = { ...cupom, desc: v };
                                                        setData({ ...data, coupons });
                                                    } }), _jsx(AdminField, { label: "Link na loja", hint: "URL para usar o cupom no marketplace (bot\u00E3o \u00ABUsar na loja\u00BB no site)", value: cupom.affiliateUrl ?? "", onChange: (v) => {
                                                        const coupons = [...data.coupons];
                                                        coupons[i] = { ...cupom, affiliateUrl: v };
                                                        setData({ ...data, coupons });
                                                    } }), _jsxs("label", { className: "flex items-center gap-2 text-sm font-medium", children: [_jsx("input", { type: "checkbox", checked: cupom.hot, onChange: (e) => {
                                                                const coupons = [...data.coupons];
                                                                coupons[i] = { ...cupom, hot: e.target.checked };
                                                                setData({ ...data, coupons });
                                                            } }), "Destaque Hot"] })] }, cupom.id))) })] }), _jsxs(AdminFormSection, { title: "SEO", children: [_jsx(AdminField, { label: "T\u00EDtulo da p\u00E1gina", value: data.metaTitle, onChange: (v) => setData({ ...data, metaTitle: v }) }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o meta", value: data.metaDescription, onChange: (v) => setData({ ...data, metaDescription: v }), multiline: true })] })] })), sectionId === "page-maisclicados" && (_jsxs(_Fragment, { children: [_jsxs(AdminFormSection, { title: "Hero da p\u00E1gina", children: [_jsx(AdminField, { label: "Badge", value: data.hero.badge, onChange: (v) => setData({
                                            ...data,
                                            hero: { ...data.hero, badge: v },
                                        }) }), _jsx(AdminField, { label: "T\u00EDtulo", value: data.hero.title, onChange: (v) => setData({
                                            ...data,
                                            hero: { ...data.hero, title: v },
                                        }) }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o", value: data.hero.description, onChange: (v) => setData({
                                            ...data,
                                            hero: { ...data.hero, description: v },
                                        }), multiline: true }), _jsx(BackgroundEditor, { value: data.hero.background, onChange: (bg) => setData({
                                            ...data,
                                            hero: { ...data.hero, background: bg },
                                        }) })] }), _jsx(AdminFormSection, { title: "Estat\u00EDsticas do hero", children: data.hero.stats.map((stat, i) => (_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(AdminField, { label: `Valor ${i + 1}`, value: stat.value, onChange: (v) => {
                                                const stats = [...data.hero.stats];
                                                stats[i] = { ...stat, value: v };
                                                setData({
                                                    ...data,
                                                    hero: { ...data.hero, stats },
                                                });
                                            } }), _jsx(AdminField, { label: `Rótulo ${i + 1}`, value: stat.label, onChange: (v) => {
                                                const stats = [...data.hero.stats];
                                                stats[i] = { ...stat, label: v };
                                                setData({
                                                    ...data,
                                                    hero: { ...data.hero, stats },
                                                });
                                            } })] }, stat.id))) }), _jsxs(AdminFormSection, { title: "Lista do ranking", description: "Ordena\u00E7\u00E3o autom\u00E1tica pelos cliques reais em Comprar. Edite textos abaixo; os n\u00FAmeros v\u00EAm do site.", children: [_jsx(AdminField, { label: "T\u00EDtulo", value: data.listTitle, onChange: (v) => setData({ ...data, listTitle: v }) }), _jsx(AdminField, { label: "Subt\u00EDtulo", value: data.listSubtitle, onChange: (v) => setData({ ...data, listSubtitle: v }) })] }), _jsxs(AdminFormSection, { title: "SEO", children: [_jsx(AdminField, { label: "T\u00EDtulo da p\u00E1gina", value: data.metaTitle, onChange: (v) => setData({ ...data, metaTitle: v }) }), _jsx(AdminField, { label: "Descri\u00E7\u00E3o meta", value: data.metaDescription, onChange: (v) => setData({ ...data, metaDescription: v }), multiline: true })] })] })), sectionId === "footer" && (_jsxs(AdminFormSection, { title: "Rodap\u00E9", children: [_jsx(AdminField, { label: "Descri\u00E7\u00E3o", value: data.description, onChange: (v) => setData({ ...data, description: v }), multiline: true }), _jsx(AdminField, { label: "Copyright", value: data.copyright, onChange: (v) => setData({ ...data, copyright: v }) }), _jsx(AdminField, { label: "Tagline", value: data.tagline, onChange: (v) => setData({ ...data, tagline: v }) })] }))] }), _jsx("div", { className: "sticky bottom-0 border-t border-border bg-surface/95 backdrop-blur-md px-5 md:px-6 py-4", children: _jsx("button", { type: "submit", disabled: saving, className: "w-full inline-flex items-center justify-center gap-2 bg-gradient-cta text-primary-foreground rounded-2xl py-3.5 text-sm font-semibold shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:hover:scale-100", children: saving ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "size-4 animate-spin" }), " A guardar..."] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "size-4" }), " Guardar tudo"] })) }) })] }));
}
