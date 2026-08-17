import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { SystemConfigForm } from "@/components/admin/SystemConfigForm";
import { SystemConfigIntro } from "@/components/admin/SystemConfigIntro";
import { useSystemConfigPage } from "@/hooks/use-system-config-page";
import { ADMIN_SHELL_MAIN_NARROW_CLASS } from "@/lib/admin-layout";
import { getAdminSession } from "@/api/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/configuracoes")({
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (!session) throw redirect({ to: "/admin/login" });
    return session;
  },
  component: AdminSystemConfigPage,
});

function SystemConfigStatus({
  loading,
  error,
}: {
  loading: boolean;
  error: string;
}) {
  return (
    <>
      {loading && <p className="text-sm text-muted-foreground">A carregar…</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </>
  );
}

function AdminSystemConfigPage() {
  const { form, setForm, loading, saving, saved, error, save } = useSystemConfigPage();

  return (
    <AdminShell
      active="configuracoes"
      title="Configurações"
      subtitle="Apenas opções seguras para editar na interface"
      saveFeedback={saved ? "Configurações guardadas" : null}
      mainClassName={cn(ADMIN_SHELL_MAIN_NARROW_CLASS, "max-w-3xl")}
    >
      <SystemConfigIntro />
      <SystemConfigStatus loading={loading} error={error} />
      {form && <SystemConfigForm form={form} saving={saving} onChange={setForm} onSave={save} />}
    </AdminShell>
  );
}
