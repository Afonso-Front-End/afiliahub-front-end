import { useMemo, useState } from "react";
import type { PageCuponsContent } from "@/types/cms";

export function useCuponsPage(pageContent: PageCuponsContent, notify: (message: string) => void) {
  const [copiado, setCopiado] = useState<string | null>(null);
  const [filtroLoja, setFiltroLoja] = useState("Todos");

  const lojas = useMemo(
    () => ["Todos", ...Array.from(new Set(pageContent.coupons.map((cupom) => cupom.store)))],
    [pageContent.coupons],
  );

  const cuponsFiltrados = useMemo(
    () =>
      filtroLoja === "Todos"
        ? pageContent.coupons
        : pageContent.coupons.filter((cupom) => cupom.store === filtroLoja),
    [filtroLoja, pageContent.coupons],
  );

  const copiarCupom = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiado(id);
      notify(`Cupom ${code} copiado!`);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      notify(`Cupom: ${code}`);
    }
  };

  return { filtroLoja, setFiltroLoja, lojas, cuponsFiltrados, copiado, copiarCupom };
}
