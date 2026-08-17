import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { BackToHomeLink } from "@/components/affiliate/BackToHomeLink";
import { CashbackHowItWorks } from "@/components/affiliate/CashbackSections";
import { EconomizeCards } from "@/components/affiliate/EconomizeCards";
import { PageHero } from "@/components/affiliate/PageHero";
import { AdminPageEditOverlay } from "@/components/admin/AdminPageEditOverlay";
import { useSiteContent } from "@/context/site-content-context";
import { fetchSiteContent } from "@/api/cms";

export const Route = createFileRoute("/cashback")({
  loader: async () => {
    const { content } = await fetchSiteContent();
    return { page: content["page-cashback"], highlights: content.cashback };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.page.metaTitle ?? "Como Economizar | AfiliaHub" },
      {
        name: "description",
        content:
          loaderData?.page.metaDescription ??
          "Cupons, promoções e dicas para comprar melhor nos maiores marketplaces.",
      },
    ],
  }),
  component: EconomizePage,
});

function EconomizePage() {
  const { page, highlights } = Route.useLoaderData();
  const { content } = useSiteContent();
  const pageContent = content["page-cashback"] ?? page;
  const highlightCards = content.cashback ?? highlights;

  return (
    <AppLayout>
      <article className="space-y-8">
        <BackToHomeLink />

        <AdminPageEditOverlay sectionId="page-cashback" label="Página Como Economizar">
          <PageHero hero={pageContent.hero} />
        </AdminPageEditOverlay>

        <section className="space-y-4">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl">{highlightCards.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{highlightCards.subtitle}</p>
          </div>
          <EconomizeCards section={highlightCards} />
        </section>

        <CashbackHowItWorks pageContent={pageContent} />
      </article>
    </AppLayout>
  );
}
