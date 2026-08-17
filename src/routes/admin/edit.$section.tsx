import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { SectionEditForm } from "@/components/admin/SectionEditForm";
import { AdminEditSectionHeader } from "@/components/admin/AdminEditSectionHeader";
import { editSectionSubtitle } from "@/components/admin/AdminEditSectionExtras";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_SHELL_MAIN_NARROW_CLASS } from "@/lib/admin-layout";
import { SECTION_LABELS } from "@/data/admin-sections";
import { getAdminSession } from "@/api/auth";
import { fetchSection } from "@/api/cms";
import { useAdminSectionSave } from "@/hooks/use-admin-section-save";
import type { SectionId } from "@/types/cms";

type EditSectionSearch = { criar?: boolean };

export const Route = createFileRoute("/admin/edit/$section")({
  validateSearch: (search: Record<string, unknown>): EditSectionSearch => ({
    criar: search.criar === "1" || search.criar === 1 || search.criar === true,
  }),
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (!session) throw redirect({ to: "/admin/login" });
  },
  loader: async ({ params }) => {
    const sectionId = params.section as SectionId;
    if (!(sectionId in SECTION_LABELS)) {
      throw redirect({ to: "/admin" });
    }
    const data = await fetchSection({ data: { sectionId } });
    return { sectionId, data };
  },
  component: AdminEditSectionPage,
});

function AdminEditSectionPage() {
  const { sectionId, data } = Route.useLoaderData();
  const { criar } = Route.useSearch();
  const navigate = useNavigate();
  const { saving, saved, handleSave } = useAdminSectionSave(sectionId);

  return (
    <AdminShell
      active="edit"
      title="Editar secção"
      subtitle={editSectionSubtitle(sectionId)}
      saveFeedback={saved ? "Alterações guardadas com sucesso" : null}
      mainClassName={ADMIN_SHELL_MAIN_NARROW_CLASS}
    >
      <AdminEditSectionHeader sectionId={sectionId} />

      <div className="rounded-3xl bg-surface border border-border shadow-soft overflow-hidden">
        <SectionEditForm
          sectionId={sectionId}
          initial={data}
          onSave={handleSave}
          saving={saving}
          createOnMount={criar}
          onCreateHandled={() =>
            navigate({
              to: "/admin/edit/$section",
              params: { section: sectionId },
              search: {},
              replace: true,
            })
          }
        />
      </div>
    </AdminShell>
  );
}
