import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { BackToHomeLink } from "@/components/affiliate/BackToHomeLink";
import { ProductCard } from "@/components/affiliate/ProductCard";
import {
  ProductDetailGallery,
  ProductDetailInfo,
  ProductFlashBanner,
} from "@/components/affiliate/ProductDetailView";
import { useMarketplace } from "@/context/marketplace-context";
import { fetchSiteContent } from "@/api/cms";
import { loadProductDetail } from "@/lib/product-loader";
import { useSiteContent } from "@/context/site-content-context";
import { productDiscountPercent } from "@/lib/product-discount";

type ProductSearch = { deal?: string };

export const Route = createFileRoute("/produto/$productId")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    deal: typeof search.deal === "string" ? search.deal : undefined,
  }),
  loaderDeps: ({ search }: { search: ProductSearch }) => ({ deal: search.deal }),
  loader: async ({ params, deps }) => {
    const { content } = await fetchSiteContent();
    const result = loadProductDetail(content, params.productId, deps.deal);
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.product.name} | AfiliaHub`
          : "Produto | AfiliaHub",
      },
      {
        name: "description",
        content: loaderData?.product.description ?? "Detalhes do produto no AfiliaHub.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product, related, isFlashPromo } = Route.useLoaderData();
  const { isFavorite, toggleFavorite, openOffer } = useMarketplace();
  const { content } = useSiteContent();
  const fav = isFavorite(product.id);
  const discount = productDiscountPercent(product.price, product.oldPrice);

  return (
    <AppLayout>
      <article className="space-y-8">
        <BackToHomeLink />
        {isFlashPromo && <ProductFlashBanner />}

        <div className="grid lg:grid-cols-2 gap-8">
          <ProductDetailGallery product={product} discount={discount} isFlashPromo={isFlashPromo} />
          <ProductDetailInfo
            product={product}
            content={content}
            fav={fav}
            onBuy={() => openOffer(product)}
            onToggleFavorite={() => toggleFavorite(product.id)}
          />
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-xl md:text-2xl mb-4">
              Produtos relacionados
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </article>
    </AppLayout>
  );
}
