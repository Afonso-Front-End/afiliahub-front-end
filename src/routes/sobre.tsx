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
  return (
    <StaticContentPage
      title="Sobre o AfiliaHub"
      description="O marketplace de afiliados que reúne as melhores ofertas dos maiores e-commerces do Brasil."
    >
      <StaticContentSections sections={ABOUT_PAGE_SECTIONS} />
    </StaticContentPage>
  );
}
