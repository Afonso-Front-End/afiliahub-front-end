import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { CategoryGrid } from "@/components/affiliate/CategoryGrid";
import { useSiteContent } from "@/context/site-content-context";
import { fetchSiteContent } from "@/api/cms";

export const Route = createFileRoute("/categorias")({
  loader: async () => {
    const { content } = await fetchSiteContent();
    return { section: content.categories };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: "Todas as Categorias | AfiliaHub" },
      {
        name: "description",
        content:
          loaderData?.section.subtitle ??
          "Explore todas as categorias e encontre os melhores produtos nos maiores marketplaces.",
      },
    ],
  }),
  component: CategoriasPage,
});

function CategoriasPage() {
  const { section: loaderSection } = Route.useLoaderData();
  const { content } = useSiteContent();
  const section = content.categories ?? loaderSection;
  const visibleCount = section.items.filter((c) => c.active !== false).length;

  return (
    <AppLayout>
      <article className="space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Voltar ao início
        </Link>

        <section className="rounded-3xl bg-surface border border-border p-6 md:p-8 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-muted px-3 py-1.5 rounded-full">
                <LayoutGrid className="size-3.5 text-primary" />
                Catálogo completo
              </span>
              <h1 className="mt-3 font-display font-extrabold text-3xl md:text-4xl tracking-tight">
                {section.title}
              </h1>
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
                {section.subtitle}
              </p>
              <p className="mt-3 text-xs font-semibold text-muted-foreground">
                {visibleCount} categoria(s) disponível(is)
              </p>
            </div>
            <Link
              to="/produtos"
              className="inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-cta text-primary-foreground rounded-full px-4 py-2 shadow-glow hover:scale-[1.02] transition-transform"
            >
              Ver todos os produtos
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </section>

        <section>
          <CategoryGrid items={section.items} variant="page" />
        </section>
      </article>
    </AppLayout>
  );
}
