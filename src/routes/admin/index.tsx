import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { Hero } from "@/components/affiliate/Hero";
import { Categories } from "@/components/affiliate/Categories";
import { FeaturedProducts } from "@/components/affiliate/FeaturedProducts";
import { FlashDeals } from "@/components/affiliate/FlashDeals";
import { CashbackSection } from "@/components/affiliate/CashbackSection";
import { AdminSectionOverlay } from "@/components/admin/AdminSectionOverlay";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/api/auth";
import { useSiteContent } from "@/context/site-content-context";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (!session) throw redirect({ to: "/admin/login" });
    return session;
  },
  component: AdminPreviewPage,
});

function AdminPreviewPage() {
  const { refresh } = useSiteContent();

  return (
    <AdminShell
      active="preview"
      title="Preview do site"
      subtitle="Clique em Editar em cada área para alterar o conteúdo"
      onRefresh={() => void refresh()}
    >
      <AppLayout adminMode>
        <Hero adminEdit />
        <AdminSectionOverlay sectionId="categories" label="Categorias Populares">
          <Categories />
        </AdminSectionOverlay>
        <AdminSectionOverlay sectionId="products-header" label="Cabeçalho Produtos">
          <AdminSectionOverlay sectionId="products" label="Produtos em Destaque">
            <FeaturedProducts />
          </AdminSectionOverlay>
        </AdminSectionOverlay>
        <AdminSectionOverlay sectionId="flash-deals" label="Promoções do Dia">
          <FlashDeals />
        </AdminSectionOverlay>
        <AdminSectionOverlay sectionId="cashback" label="Cashback & Cupons">
          <AdminSectionOverlay sectionId="featured-coupons" label="Cupons em destaque">
            <CashbackSection />
          </AdminSectionOverlay>
        </AdminSectionOverlay>
      </AppLayout>
    </AdminShell>
  );
}
