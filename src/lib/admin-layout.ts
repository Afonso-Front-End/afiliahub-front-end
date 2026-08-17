/** ID da barra superior do admin — altura exposta em `--admin-bar-height` no `:root`. */
export const ADMIN_BAR_ID = "admin-top-bar";

/**
 * Barra sticky no fluxo do documento.
 * Evita sobrepor o conteúdo: novas páginas admin só precisam usar `AdminShell`.
 */
export const ADMIN_BAR_SURFACE_CLASS =
  "sticky top-0 z-50 bg-foreground text-background px-4 py-3 flex flex-col shadow-card";

/** Área principal padrão abaixo da barra (dentro de `AdminShell`). */
export const ADMIN_SHELL_MAIN_CLASS = "min-h-0 flex-1";

/** Layout estreito para formulários de edição. */
export const ADMIN_SHELL_MAIN_NARROW_CLASS = "max-w-3xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5";

/** Offset sticky (sidebar/header) abaixo da barra admin ao rolar. */
export const ADMIN_STICKY_TOP_CLASS = "top-[calc(var(--admin-bar-height,4.25rem)+1.5rem)]";
