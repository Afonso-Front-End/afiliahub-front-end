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
  return (
    <StaticContentPage
      title="Política de Privacidade"
      description="Última atualização: 7 de junho de 2026"
    >
      <StaticContentSections sections={PRIVACY_PAGE_SECTIONS} />
    </StaticContentPage>
  );
}
