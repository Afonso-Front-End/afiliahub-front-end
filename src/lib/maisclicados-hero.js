function formatCount(value) {
    return value.toLocaleString("pt-BR");
}
export function buildMaisClicadosHero(hero, summary) {
    return {
        ...hero,
        stats: [
            { id: "s1", value: formatCount(summary.topClicks), label: "Cliques no #1" },
            { id: "s2", value: formatCount(summary.totalClicks), label: "Cliques totais" },
            { id: "s3", value: formatCount(summary.rankedCount), label: "No ranking" },
        ],
    };
}
