import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { Hero } from "@/components/affiliate/Hero";
import { Categories } from "@/components/affiliate/Categories";
import { FeaturedProducts } from "@/components/affiliate/FeaturedProducts";
import { FlashDeals } from "@/components/affiliate/FlashDeals";
import { CashbackSection } from "@/components/affiliate/CashbackSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfiliaHub | Marketplace de Afiliados Premium" },
      {
        name: "description",
        content:
          "Encontre as melhores ofertas da Shopee, Amazon, Mercado Livre, AliExpress e Magalu em um marketplace de afiliados moderno e curado.",
      },
      { property: "og:title", content: "AfiliaHub | Marketplace de Afiliados" },
      {
        property: "og:description",
        content: "As melhores promoções dos maiores marketplaces em um só lugar.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppLayout>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <FlashDeals />
      <CashbackSection />
    </AppLayout>
  );
}
