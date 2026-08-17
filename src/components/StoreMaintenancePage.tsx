import { Link } from "@tanstack/react-router";

export function StoreMaintenancePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">AfiliaHub</p>
        <h1 className="font-display font-bold text-3xl">Loja temporariamente offline</h1>
        <p className="text-sm text-muted-foreground">
          Estamos a preparar novidades. Volte em breve ou entre em contacto connosco se precisar de
          ajuda.
        </p>
        <Link
          to="/admin/login"
          className="inline-flex rounded-2xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
        >
          Área de administrador
        </Link>
      </div>
    </div>
  );
}
