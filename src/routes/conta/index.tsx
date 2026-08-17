import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { getUserSession } from "@/api/user-auth";
import { useUserAuth } from "@/context/user-auth-context";

export const Route = createFileRoute("/conta/")({
  loader: async () => {
    const session = await getUserSession();
    if (!session?.user) throw redirect({ to: "/conta/entrar" });
    return session.user;
  },
  component: AccountPage,
});

function AccountPage() {
  const user = Route.useLoaderData();
  const { logout } = useUserAuth();

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto space-y-6">
        <div className="rounded-3xl bg-surface border border-border p-5 sm:p-8 shadow-soft">
          <h1 className="font-display font-bold text-2xl">Minha conta</h1>
          <p className="text-sm text-muted-foreground mt-1">Acompanhe ofertas e produtos favoritos.</p>

          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground text-xs">Nome</dt>
              <dd className="font-semibold">{user.name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs">E-mail</dt>
              <dd className="font-semibold">{user.email}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs">Estado</dt>
              <dd className="font-semibold text-success">
                {user.emailVerified ? "Conta confirmada" : "Aguarda confirmação"}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/maisclicados"
              className="rounded-2xl bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition-colors"
            >
              Mais clicados
            </Link>
            <Link
              to="/produtos"
              className="rounded-2xl bg-muted px-5 py-2.5 text-sm font-semibold hover:bg-accent transition-colors"
            >
              Ver produtos
            </Link>
            <button
              type="button"
              onClick={() => logout().then(() => (window.location.href = "/"))}
              className="rounded-2xl bg-muted px-5 py-2.5 text-sm font-semibold hover:bg-accent transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
