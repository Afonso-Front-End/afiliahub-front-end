import type { ClickRankingSummary } from "@/api/stats";
import type { PageHeroContent } from "@/types/cms";

function formatCount(value: number) {
  return value.toLocaleString("pt-BR");
}

export function buildMaisClicadosHero(hero: PageHeroContent, summary: ClickRankingSummary) {
  return {
    ...hero,
    stats: [
      { id: "s1", value: formatCount(summary.topClicks), label: "Cliques no #1" },
      { id: "s2", value: formatCount(summary.totalClicks), label: "Cliques totais" },
      { id: "s3", value: formatCount(summary.rankedCount), label: "No ranking" },
    ],
  };
}
