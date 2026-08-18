import { jsx as _jsx } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { StaticContentPage } from "@/components/affiliate/StaticContentPage";
import { StaticContentSections } from "@/components/affiliate/StaticContentSections";
import { PRIVACY_PAGE_SECTIONS } from "@/data/static-pages";
export const Route = createFileRoute("/privacidade")({
    head: () => ({
        meta: [
            { title: "Política de Privacidade | AfiliaHub" },
            { name: "description", content: "Como o AfiliaHub coleta, usa e protege seus dados." },
        ],
    }),
    component: PrivacidadePage,
});
function PrivacidadePage() {
    return (_jsx(StaticContentPage, { title: "Pol\u00EDtica de Privacidade", description: "\u00DAltima atualiza\u00E7\u00E3o: 7 de junho de 2026", children: _jsx(StaticContentSections, { sections: PRIVACY_PAGE_SECTIONS }) }));
}
