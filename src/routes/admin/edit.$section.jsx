import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { SectionEditForm } from "@/components/admin/SectionEditForm";
import { AdminEditSectionHeader } from "@/components/admin/AdminEditSectionHeader";
import { editSectionSubtitle } from "@/components/admin/AdminEditSectionExtras";
import { AdminShell } from "@/components/admin/AdminShell";
import { ADMIN_SHELL_MAIN_NARROW_CLASS } from "@/lib/admin-layout";
import { SECTION_LABELS } from "@/data/admin-sections";
import { requireAdminSession } from "@/lib/require-admin-session";
import { fetchSection } from "@/api/cms";
import { useAdminSectionSave } from "@/hooks/use-admin-section-save";
export const Route = createFileRoute("/admin/edit/$section")({
    ssr: false,
    validateSearch: (search) => ({
        criar: search.criar === "1" || search.criar === 1 || search.criar === true,
    }),
    beforeLoad: async () => {
        await requireAdminSession();
    },
    loader: async ({ params }) => {
        const sectionId = params.section;
        if (!(sectionId in SECTION_LABELS)) {
            throw redirect({ to: "/admin" });
        }
        const data = await fetchSection(sectionId);
        return { sectionId, data };
    },
    component: AdminEditSectionPage,
});
function AdminEditSectionPage() {
    const { sectionId, data } = Route.useLoaderData();
    const { criar } = Route.useSearch();
    const navigate = useNavigate();
    const { saving, saved, handleSave } = useAdminSectionSave(sectionId);
    return (_jsxs(AdminShell, { active: "edit", title: "Editar sec\u00E7\u00E3o", subtitle: editSectionSubtitle(sectionId), saveFeedback: saved ? "Alterações guardadas com sucesso" : null, mainClassName: ADMIN_SHELL_MAIN_NARROW_CLASS, children: [_jsx(AdminEditSectionHeader, { sectionId: sectionId }), _jsx("div", { className: "rounded-3xl bg-surface border border-border shadow-soft overflow-hidden", children: _jsx(SectionEditForm, { sectionId: sectionId, initial: data, onSave: handleSave, saving: saving, createOnMount: criar, onCreateHandled: () => navigate({
                        to: "/admin/edit/$section",
                        params: { section: sectionId },
                        search: {},
                        replace: true,
                    }) }) })] }));
}
