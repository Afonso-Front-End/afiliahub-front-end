import { useMemo, useState } from "react";
import { cmsProductToProduct } from "@/lib/cms-product";
import { PRODUCT_FALLBACK_IMAGES } from "@/data/cms-fallback-images";
import type { ClickRankingSummary } from "@/api/stats";
import type { CmsProduct } from "@/types/cms";

export function useMaisClicadosRanking(cmsProducts: CmsProduct[], clickSummary: ClickRankingSummary) {
  const [filtroLoja, setFiltroLoja] = useState("Todos");

  const clickMap = useMemo(
    () => new Map(clickSummary.items.map((item) => [item.productId, item.clicks])),
    [clickSummary.items],
  );

  const ranking = useMemo(() => {
    const activeProducts = cmsProducts.filter((product) => product.active !== false);

    const entries = activeProducts.map((cmsItem) => {
      const product = cmsProductToProduct(cmsItem);
      if (!product.img) {
        product.img = PRODUCT_FALLBACK_IMAGES[product.id] ?? product.img;
      }
      return {
        id: cmsItem.id,
        productId: cmsItem.id,
        clicks: clickMap.get(cmsItem.id) ?? 0,
        product,
      };
    });

    return entries
      .sort((a, b) => b.clicks - a.clicks || a.product.name.localeCompare(b.product.name, "pt-BR"))
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [clickMap, cmsProducts]);

  const lojas = useMemo(
    () => ["Todos", ...Array.from(new Set(ranking.map((entry) => entry.product.store)))],
    [ranking],
  );

  const filtrado = useMemo(
    () =>
      filtroLoja === "Todos"
        ? ranking
        : ranking.filter((entry) => entry.product.store === filtroLoja),
    [filtroLoja, ranking],
  );

  return { filtroLoja, setFiltroLoja, lojas, filtrado };
}
