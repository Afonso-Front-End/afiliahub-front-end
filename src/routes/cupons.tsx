import { createFileRoute } from "@tanstack/react-router";
import { TicketPercent } from "lucide-react";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { BackToHomeLink } from "@/components/affiliate/BackToHomeLink";
import { CouponCard } from "@/components/affiliate/CouponCard";
import { PageListHeader } from "@/components/affiliate/PageListHeader";
import { PageHero } from "@/components/affiliate/PageHero";
import { AdminPageEditOverlay } from "@/components/admin/AdminPageEditOverlay";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
import { fetchSiteContent } from "@/api/cms";
import { useCuponsPage } from "@/hooks/use-cupons-page";
import { openTrackedAffiliateUrl } from "@/lib/affiliate-link";

export const Route = createFileRoute("/cupons")({
  loader: async () => {
    const { content } = await fetchSiteContent();
    return { page: content["page-cupons"] };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.page.metaTitle ?? "Cupons Exclusivos | AfiliaHub" },
      {
        name: "description",
        content:
          loaderData?.page.metaDescription ??
          "Resgate cupons exclusivos atualizados diariamente nos maiores marketplaces.",
      },
    ],
  }),
  component: CuponsPage,
});

function CuponsPage() {
  const { page } = Route.useLoaderData();
  const { content } = useSiteContent();
  const pageContent = content["page-cupons"] ?? page;
  const { notify } = useMarketplace();
  const { filtroLoja, setFiltroLoja, lojas, cuponsFiltrados, copiado, copiarCupom } =
    useCuponsPage(pageContent, notify);

  return (
    <AppLayout>
      <article className="space-y-8">
        <BackToHomeLink />

        <AdminPageEditOverlay sectionId="page-cupons" label="Página Cupons">
          <PageHero hero={pageContent.hero} />
        </AdminPageEditOverlay>

        <section>
          <PageListHeader
            icon={TicketPercent}
            title={pageContent.listTitle}
            subtitle={pageContent.listSubtitle}
            filters={lojas}
            activeFilter={filtroLoja}
            onFilterChange={setFiltroLoja}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cuponsFiltrados.map((cupom) => (
              <CouponCard
                key={cupom.id}
                cupom={cupom}
                copied={copiado === cupom.id}
                onCopy={() => copiarCupom(cupom.id, cupom.code)}
                onUseInStore={() =>
                  openTrackedAffiliateUrl(
                    {
                      storeName: cupom.store,
                      productName: `Cupom ${cupom.code}`,
                      url: cupom.affiliateUrl ?? "",
                    },
                    notify,
                  )
                }
              />
            ))}
          </div>
        </section>
      </article>
    </AppLayout>
  );
}
