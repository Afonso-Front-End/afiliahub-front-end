import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { SystemConfigForm } from "@/components/admin/SystemConfigForm";
import { SystemConfigIntro } from "@/components/admin/SystemConfigIntro";
import { useSystemConfigPage } from "@/hooks/use-system-config-page";
import { ADMIN_SHELL_MAIN_NARROW_CLASS } from "@/lib/admin-layout";
import { requireAdminSession } from "@/lib/require-admin-session";
import { cn } from "@/lib/utils";
export const Route = createFileRoute("/admin/configuracoes")({
    ssr: false,
    beforeLoad: async () => {
        return requireAdminSession();
    },
    component: AdminSystemConfigPage,
});
function SystemConfigStatus({ loading, error, }) {
    return (_jsxs(_Fragment, { children: [loading && _jsx("p", { className: "text-sm text-muted-foreground", children: "A carregar\u2026" }), error && _jsx("p", { className: "text-sm text-destructive", children: error })] }));
}
function AdminSystemConfigPage() {
    const { form, setForm, loading, saving, saved, error, save } = useSystemConfigPage();
    return (_jsxs(AdminShell, { active: "configuracoes", title: "Configura\u00E7\u00F5es", subtitle: "Apenas op\u00E7\u00F5es seguras para editar na interface", saveFeedback: saved ? "Configurações guardadas" : null, mainClassName: cn(ADMIN_SHELL_MAIN_NARROW_CLASS, "max-w-3xl"), children: [_jsx(SystemConfigIntro, {}), _jsx(SystemConfigStatus, { loading: loading, error: error }), form && _jsx(SystemConfigForm, { form: form, saving: saving, onChange: setForm, onSave: save })] }));
}
