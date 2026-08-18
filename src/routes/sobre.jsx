import { jsx as _jsx } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { StaticContentPage } from "@/components/affiliate/StaticContentPage";
import { StaticContentSections } from "@/components/affiliate/StaticContentSections";
import { ABOUT_PAGE_SECTIONS } from "@/data/static-pages";
export const Route = createFileRoute("/sobre")({
    head: () => ({
        meta: [
            { title: "Sobre | AfiliaHub" },
            { name: "description", content: "Conheça a missão e os valores do AfiliaHub." },
        ],
    }),
    component: SobrePage,
});
function SobrePage() {
    return (_jsx(StaticContentPage, { title: "Sobre o AfiliaHub", description: "O marketplace de afiliados que re\u00FAne as melhores ofertas dos maiores e-commerces do Brasil.", children: _jsx(StaticContentSections, { sections: ABOUT_PAGE_SECTIONS }) }));
}
