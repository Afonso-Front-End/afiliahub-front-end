import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Plus, Save } from "lucide-react";
import { nextCmsItemId, prependCmsItem } from "@/lib/cms-item-id";
import { sortCmsItemsNewestFirst } from "@/lib/cms-item-sort";
import { DEFAULT_PRODUCT_IMAGE_BACKGROUND } from "@/lib/product-image-background";
import { cn } from "@/lib/utils";
import type { SectionContentMap, SectionId } from "@/types/cms";
import { BackgroundEditor } from "./BackgroundEditor";
import { ImageField } from "./ImageField";
import {
  AdminField,
  AdminFormSection,
  AdminItemCard,
  AdminNumberField,
  AdminPriceField,
  AdminPriceGroup,
  AdminSelectField,
  priceDiscountPercent,
} from "./AdminFormUi";
import { useSiteContent } from "@/context/site-content-context";
import {
  getStoreSelectOptions,
  STORE_BADGE_PRESETS,
  STORE_BADGE_SELECT_OPTIONS,
  STORE_LINK_STYLE_SELECT_OPTIONS,
} from "@/lib/cms-stores";
import {
  CATEGORY_FALLBACK_IMAGES,
  FLASH_FALLBACK_IMAGES,
  HERO_COUPON_IMAGE,
  HERO_MAIN_IMAGE,
  PRODUCT_FALLBACK_IMAGES,
} from "@/data/cms-fallback-images";

function withCurrentOption(
  options: Array<{ value: string; label: string }>,
  current: string,
  orphanLabel = "(valor atual)",
) {
  if (!current || options.some((option) => option.value === current)) return options;
  return [{ value: current, label: `${current} ${orphanLabel}` }, ...options];
}

export function SectionEditForm({
  sectionId,
  initial,
  onSave,
  saving,
  createOnMount = false,
  onCreateHandled,
}: {
  sectionId: SectionId;
  initial: SectionContentMap[SectionId];
  onSave: (data: SectionContentMap[SectionId]) => Promise<void>;
  saving: boolean;
  createOnMount?: boolean;
  onCreateHandled?: () => void;
}) {
  const [data, setData] = useState(initial);
  const [itemSaving, setItemSaving] = useState<string | null>(null);
  const [itemSaved, setItemSaved] = useState<string | null>(null);
  const createHandledRef = useRef(false);
  const { content: siteContent } = useSiteContent();

  const productCategoryOptions = useMemo(() => {
    const seen = new Set<string>();
    return siteContent.categories.items
      .filter((category) => category.active !== false)
      .reduce<Array<{ value: string; label: string }>>((acc, category) => {
        if (seen.has(category.slug)) return acc;
        seen.add(category.slug);
        acc.push({ value: category.slug, label: category.name });
        return acc;
      }, []);
  }, [siteContent.categories.items]);

  const productStoreOptions = useMemo(
    () => getStoreSelectOptions(siteContent),
    [siteContent.stores.items],
  );

  useEffect(() => {
    if (!createOnMount || createHandledRef.current) return;
    createHandledRef.current = true;

    setData((current) => {
      if (sectionId === "categories") {
        const section = current as SectionContentMap["categories"];
        if (section.items.some((item) => item.name === "Nova categoria")) return current;
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
        } as typeof current;
      }

      if (sectionId === "stores") {
        const section = current as SectionContentMap["stores"];
        if (section.items.some((item) => item.name === "Nova loja")) return current;
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
        } as typeof current;
      }

      if (sectionId === "products") {
        const section = current as SectionContentMap["products"];
        if (section.items.some((item) => item.name === "Novo produto")) return current;
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
        } as typeof current;
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

  const saveItem = async (itemKey: string) => {
    setItemSaving(itemKey);
    setItemSaved(null);
    try {
      await onSave(data);
      setItemSaved(itemKey);
      setTimeout(() => setItemSaved((current) => (current === itemKey ? null : current)), 3000);
    } finally {
      setItemSaving(null);
    }
  };

  const itemSaveProps = (itemKey: string) => ({
    onSaveItem: () => saveItem(itemKey),
    savingItem: itemSaving === itemKey,
    savedItem: itemSaved === itemKey,
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSave(data);
      }}
      className="flex flex-col"
    >
      <div className="p-5 md:p-6 space-y-5">
        {sectionId === "hero-main" && (
          <>
            <AdminFormSection title="Textos" description="Conteúdo principal do banner">
              <div className="grid md:grid-cols-2 gap-4">
                <AdminField
                  label="Badge"
                  value={(data as SectionContentMap["hero-main"]).badge}
                  onChange={(v) => setData({ ...data, badge: v } as typeof data)}
                />
                <AdminField
                  label="Destaque"
                  value={(data as SectionContentMap["hero-main"]).highlight}
                  onChange={(v) => setData({ ...data, highlight: v } as typeof data)}
                />
              </div>
              <AdminField
                label="Título"
                value={(data as SectionContentMap["hero-main"]).title}
                onChange={(v) => setData({ ...data, title: v } as typeof data)}
              />
              <AdminField
                label="Descrição"
                hint="Use {highlight} no texto para marcar o destaque em cor"
                value={(data as SectionContentMap["hero-main"]).description}
                onChange={(v) => setData({ ...data, description: v } as typeof data)}
                multiline
              />
              <AdminField
                label="Texto do botão"
                value={(data as SectionContentMap["hero-main"]).buttonText}
                onChange={(v) => setData({ ...data, buttonText: v } as typeof data)}
              />
            </AdminFormSection>
            <AdminFormSection title="Visual" description="Imagem e fundo do card">
              <ImageField
                label="Imagem do produto"
                value={(data as SectionContentMap["hero-main"]).imageUrl}
                fallback={HERO_MAIN_IMAGE}
                onChange={(v) => setData({ ...data, imageUrl: v } as typeof data)}
              />
              <BackgroundEditor
                value={(data as SectionContentMap["hero-main"]).background}
                onChange={(bg) => setData({ ...data, background: bg } as typeof data)}
              />
            </AdminFormSection>
          </>
        )}

        {(sectionId === "hero-cashback" || sectionId === "hero-coupon") && (
          <AdminFormSection title="Card lateral" description="Conteúdo do card no hero">
            <div className="grid md:grid-cols-2 gap-4">
              <AdminField
                label="Rótulo"
                value={(data as SectionContentMap["hero-cashback"]).label}
                onChange={(v) => setData({ ...data, label: v } as typeof data)}
              />
              <AdminField
                label="Texto do botão"
                value={(data as SectionContentMap["hero-cashback"]).buttonText}
                onChange={(v) => setData({ ...data, buttonText: v } as typeof data)}
              />
            </div>
            <AdminField
              label="Título"
              value={(data as SectionContentMap["hero-cashback"]).title}
              onChange={(v) => setData({ ...data, title: v } as typeof data)}
            />
            <AdminField
              label="Subtítulo"
              value={(data as SectionContentMap["hero-cashback"]).subtitle}
              onChange={(v) => setData({ ...data, subtitle: v } as typeof data)}
            />
            {sectionId === "hero-cashback" ? (
              <AdminField
                label="Link do botão"
                value={(data as SectionContentMap["hero-cashback"]).buttonLink}
                onChange={(v) => setData({ ...data, buttonLink: v } as typeof data)}
              />
            ) : (
              <>
                <AdminField
                  label="ID do produto vinculado"
                  hint="Deve existir em Produtos em Destaque"
                  value={(data as SectionContentMap["hero-coupon"]).productId ?? ""}
                  onChange={(v) => {
                    const coupon = data as SectionContentMap["hero-coupon"];
                    setData({
                      ...coupon,
                      productId: v,
                      buttonLink: v ? `/produto/${v}` : coupon.buttonLink,
                    } as typeof data);
                  }}
                />
                <AdminField
                  label="Link do produto na loja"
                  hint="Cole o URL real do produto (recomendado). Vazio = usa o link do produto vinculado."
                  value={(data as SectionContentMap["hero-coupon"]).affiliateUrl ?? ""}
                  onChange={(v) => setData({ ...data, affiliateUrl: v } as typeof data)}
                />
              </>
            )}
            {sectionId === "hero-coupon" && (
              <ImageField
                label="Imagem"
                value={(data as SectionContentMap["hero-coupon"]).imageUrl}
                fallback={HERO_COUPON_IMAGE}
                onChange={(v) => setData({ ...data, imageUrl: v } as typeof data)}
              />
            )}
            <BackgroundEditor
              value={(data as SectionContentMap["hero-cashback"]).background}
              onChange={(bg) => setData({ ...data, background: bg } as typeof data)}
            />
          </AdminFormSection>
        )}

        {sectionId === "categories" && (
          <>
            <AdminFormSection title="Cabeçalho da secção">
              <AdminField
                label="Título"
                value={(data as SectionContentMap["categories"]).title}
                onChange={(v) => setData({ ...data, title: v } as typeof data)}
              />
              <AdminField
                label="Subtítulo"
                value={(data as SectionContentMap["categories"]).subtitle}
                onChange={(v) => setData({ ...data, subtitle: v } as typeof data)}
              />
            </AdminFormSection>
            <AdminFormSection
              title="Categorias"
              description={`${(data as SectionContentMap["categories"]).items.filter((c) => c.active !== false).length} visíveis, ${(data as SectionContentMap["categories"]).items.length} total`}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const section = data as SectionContentMap["categories"];
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
                      background: { type: "solid" as const, color: "#ffffff" },
                      active: true,
                    };
                    setData({
                      ...section,
                      items: prependCmsItem(section.items, newItem),
                    } as typeof data);
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground rounded-full px-4 py-2 text-xs font-semibold shadow-glow hover:scale-[1.02] transition-transform"
                >
                  <Plus className="size-3.5" /> Nova categoria
                </button>
              </div>
              <div className="space-y-4">
                {sortCmsItemsNewestFirst((data as SectionContentMap["categories"]).items).map(
                  (item, displayIndex) => {
                  const i = (data as SectionContentMap["categories"]).items.findIndex(
                    (entry) => entry.id === item.id,
                  );
                  return (
                  <AdminItemCard
                    key={item.id}
                    index={displayIndex + 1}
                    title={item.name}
                    subtitle={item.slug}
                    isActive={item.active !== false}
                    onToggleActive={() => {
                      const items = [...(data as SectionContentMap["categories"]).items];
                      items[i] = { ...item, active: item.active === false };
                      setData({ ...data, items } as typeof data);
                    }}
                    onDelete={() => {
                      if (!confirm(`Apagar a categoria "${item.name}"?`)) return;
                      const items = (data as SectionContentMap["categories"]).items.filter(
                        (_, idx) => idx !== i,
                      );
                      setData({ ...data, items } as typeof data);
                    }}
                    {...itemSaveProps(`category-${item.id}`)}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <AdminField
                        label="Nome"
                        value={item.name}
                        onChange={(v) => {
                          const items = [...(data as SectionContentMap["categories"]).items];
                          items[i] = { ...item, name: v };
                          setData({ ...data, items } as typeof data);
                        }}
                      />
                      <AdminField
                        label="Slug (filtro)"
                        value={item.slug}
                        onChange={(v) => {
                          const items = [...(data as SectionContentMap["categories"]).items];
                          items[i] = { ...item, slug: v };
                          setData({ ...data, items } as typeof data);
                        }}
                      />
                    </div>
                    <AdminField
                      label="Badge (opcional)"
                      value={item.badge ?? ""}
                      onChange={(v) => {
                        const items = [...(data as SectionContentMap["categories"]).items];
                        items[i] = { ...item, badge: v || undefined };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                    <ImageField
                      label="Imagem"
                      value={item.imageUrl}
                      fallback={CATEGORY_FALLBACK_IMAGES[item.id]}
                      onChange={(v) => {
                        const items = [...(data as SectionContentMap["categories"]).items];
                        items[i] = { ...item, imageUrl: v };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                    <BackgroundEditor
                      title="Fundo da imagem"
                      description="Cor ou gradiente atrás da foto no quadrado (visível em PNG transparente)"
                      value={item.background}
                      onChange={(bg) => {
                        const items = [...(data as SectionContentMap["categories"]).items];
                        items[i] = { ...item, background: bg };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                  </AdminItemCard>
                  );
                })}
              </div>
            </AdminFormSection>
          </>
        )}

        {sectionId === "stores" && (
          <>
            <AdminFormSection title="Cabeçalho da secção">
              <AdminField
                label="Título"
                value={(data as SectionContentMap["stores"]).title}
                onChange={(v) => setData({ ...data, title: v } as typeof data)}
              />
              <AdminField
                label="Subtítulo"
                value={(data as SectionContentMap["stores"]).subtitle}
                onChange={(v) => setData({ ...data, subtitle: v } as typeof data)}
              />
            </AdminFormSection>
            <AdminFormSection
              title="Lojas"
              description={`${(data as SectionContentMap["stores"]).items.filter((s) => s.active !== false).length} ativas, ${(data as SectionContentMap["stores"]).items.length} total. Usadas nos produtos, filtros e links`}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const section = data as SectionContentMap["stores"];
                    if (section.items.some((item) => item.name === "Nova loja")) {
                      window.alert("Preencha e guarde a nova loja antes de adicionar outra.");
                      return;
                    }
                    const id = nextCmsItemId("s", section.items);
                    const newItem = {
                      id,
                      name: "Nova loja",
                      affiliateUrl: "https://",
                      searchParamStyle: "query" as const,
                      badgeClass: STORE_BADGE_PRESETS[0].value,
                      active: true,
                    };
                    setData({
                      ...section,
                      items: prependCmsItem(section.items, newItem),
                    } as typeof data);
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground rounded-full px-4 py-2 text-xs font-semibold shadow-glow hover:scale-[1.02] transition-transform"
                >
                  <Plus className="size-3.5" /> Nova loja
                </button>
              </div>
              <div className="space-y-4">
                {sortCmsItemsNewestFirst((data as SectionContentMap["stores"]).items).map(
                  (item, displayIndex) => {
                    const i = (data as SectionContentMap["stores"]).items.findIndex(
                      (entry) => entry.id === item.id,
                    );
                    return (
                      <AdminItemCard
                        key={item.id}
                        index={displayIndex + 1}
                        title={item.name}
                        subtitle={item.affiliateUrl}
                        isActive={item.active !== false}
                        onToggleActive={() => {
                          const items = [...(data as SectionContentMap["stores"]).items];
                          items[i] = { ...item, active: item.active === false };
                          setData({ ...data, items } as typeof data);
                        }}
                        onDelete={() => {
                          if (!confirm(`Apagar a loja "${item.name}"?`)) return;
                          const items = (data as SectionContentMap["stores"]).items.filter(
                            (_, idx) => idx !== i,
                          );
                          setData({ ...data, items } as typeof data);
                        }}
                        {...itemSaveProps(`store-${item.id}`)}
                      >
                        <AdminField
                          label="Nome"
                          hint="Nome exibido nos produtos e filtros"
                          value={item.name}
                          onChange={(v) => {
                            const items = [...(data as SectionContentMap["stores"]).items];
                            items[i] = { ...item, name: v };
                            setData({ ...data, items } as typeof data);
                          }}
                        />
                        <AdminField
                          label="URL base de afiliado"
                          hint="Termina antes do nome do produto"
                          value={item.affiliateUrl}
                          onChange={(v) => {
                            const items = [...(data as SectionContentMap["stores"]).items];
                            items[i] = { ...item, affiliateUrl: v };
                            setData({ ...data, items } as typeof data);
                          }}
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                          <AdminSelectField
                            label="Formato do link"
                            value={item.searchParamStyle}
                            options={STORE_LINK_STYLE_SELECT_OPTIONS}
                            onChange={(v) => {
                              const items = [...(data as SectionContentMap["stores"]).items];
                              items[i] = {
                                ...item,
                                searchParamStyle: v as typeof item.searchParamStyle,
                              };
                              setData({ ...data, items } as typeof data);
                            }}
                          />
                          <AdminSelectField
                            label="Cor do badge"
                            value={item.badgeClass}
                            options={STORE_BADGE_SELECT_OPTIONS}
                            onChange={(v) => {
                              const items = [...(data as SectionContentMap["stores"]).items];
                              items[i] = { ...item, badgeClass: v };
                              setData({ ...data, items } as typeof data);
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                              item.badgeClass,
                            )}
                          >
                            Pré-visualização
                          </span>
                        </div>
                      </AdminItemCard>
                    );
                  },
                )}
              </div>
            </AdminFormSection>
          </>
        )}

        {sectionId === "products-header" && (
          <AdminFormSection title="Cabeçalho">
            <AdminField
              label="Título"
              value={(data as SectionContentMap["products-header"]).title}
              onChange={(v) => setData({ ...data, title: v } as typeof data)}
            />
            <AdminField
              label="Subtítulo"
              value={(data as SectionContentMap["products-header"]).subtitle}
              onChange={(v) => setData({ ...data, subtitle: v } as typeof data)}
            />
          </AdminFormSection>
        )}

        {sectionId === "products" && (
          <AdminFormSection
            title="Produtos"
            description={`${(data as SectionContentMap["products"]).items.filter((p) => p.active).length} visíveis, ${(data as SectionContentMap["products"]).items.length} total`}
          >
            <p className="text-xs text-muted-foreground">
              As lojas do select vêm de{" "}
              <Link to="/admin/edit/$section" params={{ section: "stores" }} className="text-primary font-semibold hover:underline">
                Lojas / Marketplaces
              </Link>
              .
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  const section = data as SectionContentMap["products"];
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
                  } as typeof data);
                }}
                className="inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground rounded-full px-4 py-2 text-xs font-semibold shadow-glow hover:scale-[1.02] transition-transform"
              >
                <Plus className="size-3.5" /> Novo produto
              </button>
            </div>
            <div className="space-y-4">
              {sortCmsItemsNewestFirst((data as SectionContentMap["products"]).items).map(
                (item, displayIndex) => {
                const i = (data as SectionContentMap["products"]).items.findIndex(
                  (entry) => entry.id === item.id,
                );
                return (
                <AdminItemCard
                  key={item.id}
                  index={displayIndex + 1}
                  title={item.name}
                  subtitle={item.store}
                  isActive={item.active}
                  onToggleActive={() => {
                    const items = [...(data as SectionContentMap["products"]).items];
                    items[i] = { ...item, active: !item.active };
                    setData({ ...data, items } as typeof data);
                  }}
                  onDelete={() => {
                    if (!confirm(`Apagar o produto "${item.name}"?`)) return;
                    const items = (data as SectionContentMap["products"]).items.filter(
                      (_, idx) => idx !== i,
                    );
                    setData({ ...data, items } as typeof data);
                  }}
                  {...itemSaveProps(`product-${item.id}`)}
                >
                  <AdminField
                    label="Nome"
                    value={item.name}
                    onChange={(v) => {
                      const items = [...(data as SectionContentMap["products"]).items];
                      items[i] = { ...item, name: v };
                      setData({ ...data, items } as typeof data);
                    }}
                  />
                  <AdminField
                    label="Link do produto na loja"
                    hint="Cole o URL real do produto (recomendado). Vazio = busca automática pelo nome."
                    value={item.affiliateUrl ?? ""}
                    onChange={(v) => {
                      const items = [...(data as SectionContentMap["products"]).items];
                      items[i] = { ...item, affiliateUrl: v };
                      setData({ ...data, items } as typeof data);
                    }}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <AdminSelectField
                      label="Loja"
                      hint="Marketplace onde o produto é vendido"
                      value={item.store}
                      options={withCurrentOption(productStoreOptions, item.store, "(não listada)")}
                      onChange={(v) => {
                        const items = [...(data as SectionContentMap["products"]).items];
                        items[i] = { ...item, store: v };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                    <AdminSelectField
                      label="Categoria"
                      hint="Lista as categorias ativas do site"
                      value={item.category}
                      options={withCurrentOption(
                        productCategoryOptions,
                        item.category,
                        "(não listada)",
                      )}
                      onChange={(v) => {
                        const items = [...(data as SectionContentMap["products"]).items];
                        items[i] = { ...item, category: v };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                  </div>
                  <AdminPriceGroup
                    price={item.price}
                    oldPrice={item.oldPrice}
                    onPriceChange={(v) => {
                      const items = [...(data as SectionContentMap["products"]).items];
                      items[i] = { ...item, price: v };
                      setData({ ...data, items } as typeof data);
                    }}
                    onOldPriceChange={(v) => {
                      const items = [...(data as SectionContentMap["products"]).items];
                      items[i] = { ...item, oldPrice: v };
                      setData({ ...data, items } as typeof data);
                    }}
                  />
                  <AdminField
                    label="Descrição"
                    value={item.description}
                    onChange={(v) => {
                      const items = [...(data as SectionContentMap["products"]).items];
                      items[i] = { ...item, description: v };
                      setData({ ...data, items } as typeof data);
                    }}
                    multiline
                  />
                  <AdminNumberField
                    label="Avaliação"
                    step="0.1"
                    value={item.rating}
                    onChange={(v) => {
                      const items = [...(data as SectionContentMap["products"]).items];
                      items[i] = { ...item, rating: v };
                      setData({ ...data, items } as typeof data);
                    }}
                  />
                  <ImageField
                    label="Imagem"
                    value={item.imageUrl}
                    fallback={PRODUCT_FALLBACK_IMAGES[item.id]}
                    variant="product-card"
                    imageBackground={item.background}
                    onChange={(v) => {
                      const items = [...(data as SectionContentMap["products"]).items];
                      items[i] = { ...item, imageUrl: v };
                      setData({ ...data, items } as typeof data);
                    }}
                  />
                  <BackgroundEditor
                    title="Fundo da imagem"
                    description="Cor ou gradiente atrás da foto no card (visível em PNG transparente)"
                    value={item.background ?? DEFAULT_PRODUCT_IMAGE_BACKGROUND}
                    onChange={(bg) => {
                      const items = [...(data as SectionContentMap["products"]).items];
                      items[i] = { ...item, background: bg };
                      setData({ ...data, items } as typeof data);
                    }}
                  />
                </AdminItemCard>
                );
              })}
            </div>
          </AdminFormSection>
        )}

        {sectionId === "flash-deals" && (
          <>
            <AdminFormSection title="Cabeçalho">
              <AdminField
                label="Título"
                value={(data as SectionContentMap["flash-deals"]).title}
                onChange={(v) => setData({ ...data, title: v } as typeof data)}
              />
              <AdminField
                label="Subtítulo"
                value={(data as SectionContentMap["flash-deals"]).subtitle}
                onChange={(v) => setData({ ...data, subtitle: v } as typeof data)}
              />
              <BackgroundEditor
                value={(data as SectionContentMap["flash-deals"]).background}
                onChange={(bg) => setData({ ...data, background: bg } as typeof data)}
              />
            </AdminFormSection>
            <AdminFormSection title="Ofertas">
              <div className="space-y-4">
                {(data as SectionContentMap["flash-deals"]).items.map((item, i) => (
                  <AdminItemCard
                    key={item.id}
                    index={i + 1}
                    title={item.name}
                    subtitle={item.productId}
                    {...itemSaveProps(`flash-${item.id}`)}
                  >
                    <AdminField
                      label="Nome"
                      value={item.name}
                      onChange={(v) => {
                        const items = [...(data as SectionContentMap["flash-deals"]).items];
                        items[i] = { ...item, name: v };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                    <AdminField
                      label="ID do produto vinculado"
                      hint="Página do produto aberta ao clicar (preços da oferta são os abaixo)"
                      value={item.productId}
                      onChange={(v) => {
                        const items = [...(data as SectionContentMap["flash-deals"]).items];
                        items[i] = { ...item, productId: v };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                    <AdminField
                      label="Link do produto na loja"
                      hint="Cole o URL real do produto (recomendado). Vazio = usa o link do produto vinculado."
                      value={item.affiliateUrl ?? ""}
                      onChange={(v) => {
                        const items = [...(data as SectionContentMap["flash-deals"]).items];
                        items[i] = { ...item, affiliateUrl: v };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                    <div className="rounded-2xl border border-border/60 bg-muted/15 p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-foreground">Preços da oferta</p>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          {priceDiscountPercent(item.price, item.old) || item.discount}% OFF
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AdminPriceField
                          label="Preço oferta"
                          value={item.price}
                          onChange={(v) => {
                            const items = [...(data as SectionContentMap["flash-deals"]).items];
                            items[i] = {
                              ...item,
                              price: v,
                              discount: priceDiscountPercent(v, item.old) || item.discount,
                            };
                            setData({ ...data, items } as typeof data);
                          }}
                        />
                        <AdminPriceField
                          label="Preço antigo"
                          value={item.old}
                          onChange={(v) => {
                            const items = [...(data as SectionContentMap["flash-deals"]).items];
                            items[i] = {
                              ...item,
                              old: v,
                              discount: priceDiscountPercent(item.price, v) || item.discount,
                            };
                            setData({ ...data, items } as typeof data);
                          }}
                        />
                      </div>
                    </div>
                    <ImageField
                      label="Imagem"
                      value={item.imageUrl}
                      fallback={FLASH_FALLBACK_IMAGES[item.id]}
                      variant="product-card"
                      onChange={(v) => {
                        const items = [...(data as SectionContentMap["flash-deals"]).items];
                        items[i] = { ...item, imageUrl: v };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                  </AdminItemCard>
                ))}
              </div>
            </AdminFormSection>
          </>
        )}

        {sectionId === "cashback" && (
          <>
            <AdminFormSection title="Cabeçalho">
              <AdminField
                label="Título"
                value={(data as SectionContentMap["cashback"]).title}
                onChange={(v) => setData({ ...data, title: v } as typeof data)}
              />
              <AdminField
                label="Subtítulo"
                value={(data as SectionContentMap["cashback"]).subtitle}
                onChange={(v) => setData({ ...data, subtitle: v } as typeof data)}
              />
            </AdminFormSection>
            <AdminFormSection title="Cards de destaque">
              <div className="space-y-4">
                {(data as SectionContentMap["cashback"]).cards.map((card, i) => (
                  <AdminItemCard
                    key={card.id}
                    index={i + 1}
                    title={card.title}
                    subtitle={card.href}
                    {...itemSaveProps(`cashback-${card.id}`)}
                  >
                    <AdminField
                      label="Título"
                      value={card.title}
                      onChange={(v) => {
                        const cards = [...(data as SectionContentMap["cashback"]).cards];
                        cards[i] = { ...card, title: v };
                        setData({ ...data, cards } as typeof data);
                      }}
                    />
                    <AdminField
                      label="Descrição"
                      value={card.desc}
                      onChange={(v) => {
                        const cards = [...(data as SectionContentMap["cashback"]).cards];
                        cards[i] = { ...card, desc: v };
                        setData({ ...data, cards } as typeof data);
                      }}
                      multiline
                    />
                    <AdminField
                      label="Texto do botão"
                      value={card.buttonText}
                      onChange={(v) => {
                        const cards = [...(data as SectionContentMap["cashback"]).cards];
                        cards[i] = { ...card, buttonText: v };
                        setData({ ...data, cards } as typeof data);
                      }}
                    />
                    <AdminField
                      label="Link"
                      value={card.href}
                      onChange={(v) => {
                        const cards = [...(data as SectionContentMap["cashback"]).cards];
                        cards[i] = { ...card, href: v };
                        setData({ ...data, cards } as typeof data);
                      }}
                    />
                    <BackgroundEditor
                      value={card.background}
                      onChange={(bg) => {
                        const cards = [...(data as SectionContentMap["cashback"]).cards];
                        cards[i] = { ...card, background: bg };
                        setData({ ...data, cards } as typeof data);
                      }}
                    />
                  </AdminItemCard>
                ))}
              </div>
            </AdminFormSection>
          </>
        )}

        {sectionId === "featured-coupons" && (
          <>
            <AdminFormSection title="Barra de cupons">
              <AdminField
                label="Título"
                value={(data as SectionContentMap["featured-coupons"]).title}
                onChange={(v) => setData({ ...data, title: v } as typeof data)}
              />
              <AdminField
                label="Subtítulo"
                value={(data as SectionContentMap["featured-coupons"]).subtitle}
                onChange={(v) => setData({ ...data, subtitle: v } as typeof data)}
              />
              <AdminField
                label="Texto do link"
                value={(data as SectionContentMap["featured-coupons"]).linkText}
                onChange={(v) => setData({ ...data, linkText: v } as typeof data)}
              />
            </AdminFormSection>
            <AdminFormSection title="Cupons">
              <div className="space-y-4">
                {(data as SectionContentMap["featured-coupons"]).items.map((item, i) => (
                  <AdminItemCard
                    key={item.id}
                    index={i + 1}
                    title={item.code}
                    subtitle={item.discount}
                    {...itemSaveProps(`coupon-${item.id}`)}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <AdminField
                        label="Código"
                        value={item.code}
                        onChange={(v) => {
                          const items = [...(data as SectionContentMap["featured-coupons"]).items];
                          items[i] = { ...item, code: v };
                          setData({ ...data, items } as typeof data);
                        }}
                      />
                      <AdminField
                        label="Desconto"
                        value={item.discount}
                        onChange={(v) => {
                          const items = [...(data as SectionContentMap["featured-coupons"]).items];
                          items[i] = { ...item, discount: v };
                          setData({ ...data, items } as typeof data);
                        }}
                      />
                    </div>
                    <AdminField
                      label="Link na loja"
                      hint="URL para usar o cupom no marketplace (abre em nova aba ao clicar no chip)"
                      value={item.affiliateUrl ?? ""}
                      onChange={(v) => {
                        const items = [...(data as SectionContentMap["featured-coupons"]).items];
                        items[i] = { ...item, affiliateUrl: v };
                        setData({ ...data, items } as typeof data);
                      }}
                    />
                  </AdminItemCard>
                ))}
              </div>
            </AdminFormSection>
          </>
        )}

        {sectionId === "sidebar-promo" && (
          <AdminFormSection title="Promo da sidebar">
            <AdminField
              label="Rótulo"
              value={(data as SectionContentMap["sidebar-promo"]).label}
              onChange={(v) => setData({ ...data, label: v } as typeof data)}
            />
            <AdminField
              label="Título"
              value={(data as SectionContentMap["sidebar-promo"]).title}
              onChange={(v) => setData({ ...data, title: v } as typeof data)}
            />
            <AdminField
              label="Texto do link"
              value={(data as SectionContentMap["sidebar-promo"]).linkText}
              onChange={(v) => setData({ ...data, linkText: v } as typeof data)}
            />
            <BackgroundEditor
              value={(data as SectionContentMap["sidebar-promo"]).background}
              onChange={(bg) => setData({ ...data, background: bg } as typeof data)}
            />
          </AdminFormSection>
        )}

        {sectionId === "page-cashback" && (
          <>
            <AdminFormSection title="Hero da página">
              <AdminField
                label="Badge"
                value={(data as SectionContentMap["page-cashback"]).hero.badge}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-cashback"]).hero, badge: v },
                  } as typeof data)
                }
              />
              <AdminField
                label="Título"
                value={(data as SectionContentMap["page-cashback"]).hero.title}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-cashback"]).hero, title: v },
                  } as typeof data)
                }
              />
              <AdminField
                label="Descrição"
                value={(data as SectionContentMap["page-cashback"]).hero.description}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-cashback"]).hero, description: v },
                  } as typeof data)
                }
                multiline
              />
              <BackgroundEditor
                value={(data as SectionContentMap["page-cashback"]).hero.background}
                onChange={(bg) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-cashback"]).hero, background: bg },
                  } as typeof data)
                }
              />
            </AdminFormSection>
            <AdminFormSection title="Estatísticas do hero">
              {(data as SectionContentMap["page-cashback"]).hero.stats.map((stat, i) => (
                <div key={stat.id} className="grid md:grid-cols-2 gap-4">
                  <AdminField
                    label={`Valor ${i + 1}`}
                    value={stat.value}
                    onChange={(v) => {
                      const stats = [...(data as SectionContentMap["page-cashback"]).hero.stats];
                      stats[i] = { ...stat, value: v };
                      setData({
                        ...data,
                        hero: { ...(data as SectionContentMap["page-cashback"]).hero, stats },
                      } as typeof data);
                    }}
                  />
                  <AdminField
                    label={`Rótulo ${i + 1}`}
                    value={stat.label}
                    onChange={(v) => {
                      const stats = [...(data as SectionContentMap["page-cashback"]).hero.stats];
                      stats[i] = { ...stat, label: v };
                      setData({
                        ...data,
                        hero: { ...(data as SectionContentMap["page-cashback"]).hero, stats },
                      } as typeof data);
                    }}
                  />
                </div>
              ))}
            </AdminFormSection>
            <AdminFormSection title="Como funciona">
              <AdminField
                label="Título"
                value={(data as SectionContentMap["page-cashback"]).howItWorksTitle}
                onChange={(v) => setData({ ...data, howItWorksTitle: v } as typeof data)}
              />
              {(data as SectionContentMap["page-cashback"]).howItWorks.map((step, i) => (
                <AdminItemCard key={step.id} index={i + 1} title={step.title} {...itemSaveProps(`how-${step.id}`)}>
                  <AdminField
                    label="Passo"
                    value={step.step}
                    onChange={(v) => {
                      const howItWorks = [...(data as SectionContentMap["page-cashback"]).howItWorks];
                      howItWorks[i] = { ...step, step: v };
                      setData({ ...data, howItWorks } as typeof data);
                    }}
                  />
                  <AdminField
                    label="Título"
                    value={step.title}
                    onChange={(v) => {
                      const howItWorks = [...(data as SectionContentMap["page-cashback"]).howItWorks];
                      howItWorks[i] = { ...step, title: v };
                      setData({ ...data, howItWorks } as typeof data);
                    }}
                  />
                  <AdminField
                    label="Descrição"
                    value={step.desc}
                    onChange={(v) => {
                      const howItWorks = [...(data as SectionContentMap["page-cashback"]).howItWorks];
                      howItWorks[i] = { ...step, desc: v };
                      setData({ ...data, howItWorks } as typeof data);
                    }}
                    multiline
                  />
                </AdminItemCard>
              ))}
              <AdminField
                label="Texto do botão final"
                value={(data as SectionContentMap["page-cashback"]).ctaText}
                onChange={(v) => setData({ ...data, ctaText: v } as typeof data)}
              />
            </AdminFormSection>
            <AdminFormSection title="SEO">
              <AdminField
                label="Título da página"
                value={(data as SectionContentMap["page-cashback"]).metaTitle}
                onChange={(v) => setData({ ...data, metaTitle: v } as typeof data)}
              />
              <AdminField
                label="Descrição meta"
                value={(data as SectionContentMap["page-cashback"]).metaDescription}
                onChange={(v) => setData({ ...data, metaDescription: v } as typeof data)}
                multiline
              />
            </AdminFormSection>
          </>
        )}

        {sectionId === "page-cupons" && (
          <>
            <AdminFormSection title="Hero da página">
              <AdminField
                label="Badge"
                value={(data as SectionContentMap["page-cupons"]).hero.badge}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-cupons"]).hero, badge: v },
                  } as typeof data)
                }
              />
              <AdminField
                label="Título"
                value={(data as SectionContentMap["page-cupons"]).hero.title}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-cupons"]).hero, title: v },
                  } as typeof data)
                }
              />
              <AdminField
                label="Descrição"
                value={(data as SectionContentMap["page-cupons"]).hero.description}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-cupons"]).hero, description: v },
                  } as typeof data)
                }
                multiline
              />
              <BackgroundEditor
                value={(data as SectionContentMap["page-cupons"]).hero.background}
                onChange={(bg) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-cupons"]).hero, background: bg },
                  } as typeof data)
                }
              />
            </AdminFormSection>
            <AdminFormSection title="Estatísticas do hero">
              {(data as SectionContentMap["page-cupons"]).hero.stats.map((stat, i) => (
                <div key={stat.id} className="grid md:grid-cols-2 gap-4">
                  <AdminField
                    label={`Valor ${i + 1}`}
                    value={stat.value}
                    onChange={(v) => {
                      const stats = [...(data as SectionContentMap["page-cupons"]).hero.stats];
                      stats[i] = { ...stat, value: v };
                      setData({
                        ...data,
                        hero: { ...(data as SectionContentMap["page-cupons"]).hero, stats },
                      } as typeof data);
                    }}
                  />
                  <AdminField
                    label={`Rótulo ${i + 1}`}
                    value={stat.label}
                    onChange={(v) => {
                      const stats = [...(data as SectionContentMap["page-cupons"]).hero.stats];
                      stats[i] = { ...stat, label: v };
                      setData({
                        ...data,
                        hero: { ...(data as SectionContentMap["page-cupons"]).hero, stats },
                      } as typeof data);
                    }}
                  />
                </div>
              ))}
            </AdminFormSection>
            <AdminFormSection title="Lista de cupons">
              <AdminField
                label="Título"
                value={(data as SectionContentMap["page-cupons"]).listTitle}
                onChange={(v) => setData({ ...data, listTitle: v } as typeof data)}
              />
              <AdminField
                label="Subtítulo"
                value={(data as SectionContentMap["page-cupons"]).listSubtitle}
                onChange={(v) => setData({ ...data, listSubtitle: v } as typeof data)}
              />
              <div className="space-y-4">
                {(data as SectionContentMap["page-cupons"]).coupons.map((cupom, i) => (
                  <AdminItemCard key={cupom.id} index={i + 1} title={cupom.code} {...itemSaveProps(`coupon-${cupom.id}`)}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <AdminField
                        label="Código"
                        value={cupom.code}
                        onChange={(v) => {
                          const coupons = [...(data as SectionContentMap["page-cupons"]).coupons];
                          coupons[i] = { ...cupom, code: v };
                          setData({ ...data, coupons } as typeof data);
                        }}
                      />
                      <AdminSelectField
                        label="Loja"
                        value={cupom.store}
                        options={withCurrentOption(productStoreOptions, cupom.store, "(não listada)")}
                        onChange={(v) => {
                          const coupons = [...(data as SectionContentMap["page-cupons"]).coupons];
                          coupons[i] = { ...cupom, store: v };
                          setData({ ...data, coupons } as typeof data);
                        }}
                      />
                      <AdminField
                        label="Desconto"
                        value={cupom.discount}
                        onChange={(v) => {
                          const coupons = [...(data as SectionContentMap["page-cupons"]).coupons];
                          coupons[i] = { ...cupom, discount: v };
                          setData({ ...data, coupons } as typeof data);
                        }}
                      />
                      <AdminField
                        label="Validade"
                        value={cupom.expires}
                        onChange={(v) => {
                          const coupons = [...(data as SectionContentMap["page-cupons"]).coupons];
                          coupons[i] = { ...cupom, expires: v };
                          setData({ ...data, coupons } as typeof data);
                        }}
                      />
                    </div>
                    <AdminField
                      label="Descrição"
                      value={cupom.desc}
                      onChange={(v) => {
                        const coupons = [...(data as SectionContentMap["page-cupons"]).coupons];
                        coupons[i] = { ...cupom, desc: v };
                        setData({ ...data, coupons } as typeof data);
                      }}
                    />
                    <AdminField
                      label="Link na loja"
                      hint="URL para usar o cupom no marketplace (botão «Usar na loja» no site)"
                      value={cupom.affiliateUrl ?? ""}
                      onChange={(v) => {
                        const coupons = [...(data as SectionContentMap["page-cupons"]).coupons];
                        coupons[i] = { ...cupom, affiliateUrl: v };
                        setData({ ...data, coupons } as typeof data);
                      }}
                    />
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={cupom.hot}
                        onChange={(e) => {
                          const coupons = [...(data as SectionContentMap["page-cupons"]).coupons];
                          coupons[i] = { ...cupom, hot: e.target.checked };
                          setData({ ...data, coupons } as typeof data);
                        }}
                      />
                      Destaque Hot
                    </label>
                  </AdminItemCard>
                ))}
              </div>
            </AdminFormSection>
            <AdminFormSection title="SEO">
              <AdminField
                label="Título da página"
                value={(data as SectionContentMap["page-cupons"]).metaTitle}
                onChange={(v) => setData({ ...data, metaTitle: v } as typeof data)}
              />
              <AdminField
                label="Descrição meta"
                value={(data as SectionContentMap["page-cupons"]).metaDescription}
                onChange={(v) => setData({ ...data, metaDescription: v } as typeof data)}
                multiline
              />
            </AdminFormSection>
          </>
        )}

        {sectionId === "page-maisclicados" && (
          <>
            <AdminFormSection title="Hero da página">
              <AdminField
                label="Badge"
                value={(data as SectionContentMap["page-maisclicados"]).hero.badge}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-maisclicados"]).hero, badge: v },
                  } as typeof data)
                }
              />
              <AdminField
                label="Título"
                value={(data as SectionContentMap["page-maisclicados"]).hero.title}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-maisclicados"]).hero, title: v },
                  } as typeof data)
                }
              />
              <AdminField
                label="Descrição"
                value={(data as SectionContentMap["page-maisclicados"]).hero.description}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-maisclicados"]).hero, description: v },
                  } as typeof data)
                }
                multiline
              />
              <BackgroundEditor
                value={(data as SectionContentMap["page-maisclicados"]).hero.background}
                onChange={(bg) =>
                  setData({
                    ...data,
                    hero: { ...(data as SectionContentMap["page-maisclicados"]).hero, background: bg },
                  } as typeof data)
                }
              />
            </AdminFormSection>
            <AdminFormSection title="Estatísticas do hero">
              {(data as SectionContentMap["page-maisclicados"]).hero.stats.map((stat, i) => (
                <div key={stat.id} className="grid md:grid-cols-2 gap-4">
                  <AdminField
                    label={`Valor ${i + 1}`}
                    value={stat.value}
                    onChange={(v) => {
                      const stats = [...(data as SectionContentMap["page-maisclicados"]).hero.stats];
                      stats[i] = { ...stat, value: v };
                      setData({
                        ...data,
                        hero: { ...(data as SectionContentMap["page-maisclicados"]).hero, stats },
                      } as typeof data);
                    }}
                  />
                  <AdminField
                    label={`Rótulo ${i + 1}`}
                    value={stat.label}
                    onChange={(v) => {
                      const stats = [...(data as SectionContentMap["page-maisclicados"]).hero.stats];
                      stats[i] = { ...stat, label: v };
                      setData({
                        ...data,
                        hero: { ...(data as SectionContentMap["page-maisclicados"]).hero, stats },
                      } as typeof data);
                    }}
                  />
                </div>
              ))}
            </AdminFormSection>
            <AdminFormSection
              title="Lista do ranking"
              description="Ordenação automática pelos cliques reais em Comprar. Edite textos abaixo; os números vêm do site."
            >
              <AdminField
                label="Título"
                value={(data as SectionContentMap["page-maisclicados"]).listTitle}
                onChange={(v) => setData({ ...data, listTitle: v } as typeof data)}
              />
              <AdminField
                label="Subtítulo"
                value={(data as SectionContentMap["page-maisclicados"]).listSubtitle}
                onChange={(v) => setData({ ...data, listSubtitle: v } as typeof data)}
              />
            </AdminFormSection>
            <AdminFormSection title="SEO">
              <AdminField
                label="Título da página"
                value={(data as SectionContentMap["page-maisclicados"]).metaTitle}
                onChange={(v) => setData({ ...data, metaTitle: v } as typeof data)}
              />
              <AdminField
                label="Descrição meta"
                value={(data as SectionContentMap["page-maisclicados"]).metaDescription}
                onChange={(v) => setData({ ...data, metaDescription: v } as typeof data)}
                multiline
              />
            </AdminFormSection>
          </>
        )}

        {sectionId === "footer" && (
          <AdminFormSection title="Rodapé">
            <AdminField
              label="Descrição"
              value={(data as SectionContentMap["footer"]).description}
              onChange={(v) => setData({ ...data, description: v } as typeof data)}
              multiline
            />
            <AdminField
              label="Copyright"
              value={(data as SectionContentMap["footer"]).copyright}
              onChange={(v) => setData({ ...data, copyright: v } as typeof data)}
            />
            <AdminField
              label="Tagline"
              value={(data as SectionContentMap["footer"]).tagline}
              onChange={(v) => setData({ ...data, tagline: v } as typeof data)}
            />
          </AdminFormSection>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-border bg-surface/95 backdrop-blur-md px-5 md:px-6 py-4">
        <button
          type="submit"
          disabled={saving}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-cta text-primary-foreground rounded-2xl py-3.5 text-sm font-semibold shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:hover:scale-100"
        >
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" /> A guardar...
            </>
          ) : (
            <>
              <Save className="size-4" /> Guardar tudo
            </>
          )}
        </button>
      </div>
    </form>
  );
}
