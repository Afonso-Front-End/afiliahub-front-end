import type { ReactNode } from "react";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { ADMIN_SHELL_MAIN_CLASS } from "@/lib/admin-layout";
import { cn } from "@/lib/utils";

export type AdminShellProps = {
  title?: string;
  subtitle?: string;
  active?: "preview" | "edit" | "config-apis" | "configuracoes";
  onRefresh?: () => void;
  saveFeedback?: string | null;
  children: ReactNode;
  mainClassName?: string;
};

/**
 * Layout base de todas as páginas autenticadas do admin.
 * Centraliza a barra superior e o espaçamento do conteúdo.
 */
export function AdminShell({
  title,
  subtitle,
  active,
  onRefresh,
  saveFeedback,
  children,
  mainClassName,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminTopBar
        title={title}
        subtitle={subtitle}
        active={active}
        onRefresh={onRefresh}
        saveFeedback={saveFeedback}
      />
      <main className={cn(ADMIN_SHELL_MAIN_CLASS, mainClassName)}>{children}</main>
    </div>
  );
}
