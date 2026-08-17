import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { BackToHomeLink } from "@/components/affiliate/BackToHomeLink";
import {
  ProdutosFilters,
  ProdutosPageHeader,
  ProdutosResults,
} from "@/components/affiliate/ProdutosPageSections";
import { fetchSiteContent } from "@/api/cms";
import { parseProdutosSearch } from "@/lib/produtos-search";
import { useProdutosPage } from "@/hooks/use-produtos-page";

export const Route = createFileRoute("/produtos")({
  validateSearch: parseProdutosSearch,
  loader: async () => {
    const { content } = await fetchSiteContent();
    return { header: content["products-header"] };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: "Todos os Produtos | AfiliaHub" },
      {
        name: "description",
        content:
          loaderData?.header.subtitle ??
          "Explore todos os produtos com ofertas nos maiores marketplaces.",
      },
    ],
  }),
  component: ProdutosPage,
});

function ProdutosPage() {
  const urlSearch = Route.useSearch();
  const {
    header,
    storeFilters,
    busca,
    setBusca,
    filtroLoja,
    setFiltroLoja,
    categoria,
    setCategoria,
    ordenar,
    setOrdenar,
    categoryOptions,
    filteredProducts,
    activeCategoryName,
    updateSearch,
  } = useProdutosPage(urlSearch);

  return (
    <AppLayout>
      <article className="space-y-8">
        <BackToHomeLink />

        <ProdutosPageHeader
          title={header.title}
          subtitle={
            activeCategoryName ? `Produtos em ${activeCategoryName}` : header.subtitle
          }
        />

        <section className="space-y-5">
          <ProdutosFilters
            busca={busca}
            onBuscaChange={setBusca}
            onSearchSubmit={() => updateSearch({ busca: busca.trim() || undefined })}
            categoryOptions={categoryOptions}
            categoria={categoria}
            onCategoryChange={(slug) => {
              setCategoria(slug);
              updateSearch({ categoria: slug });
            }}
            storeFilters={storeFilters}
            filtroLoja={filtroLoja}
            onStoreChange={(loja) => {
              setFiltroLoja(loja);
              updateSearch({ loja: loja === "Todos" ? undefined : loja });
            }}
            ordenar={ordenar}
            onSortChange={(sort) => {
              setOrdenar(sort);
              updateSearch({ ordenar: sort === "default" ? undefined : sort });
            }}
            resultCount={filteredProducts.length}
          />

          <ProdutosResults products={filteredProducts} />
        </section>
      </article>
    </AppLayout>
  );
}
