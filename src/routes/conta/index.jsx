import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { getUserSession } from "@/api/user-auth";
import { useUserAuth } from "@/context/user-auth-context";
export const Route = createFileRoute("/conta/")({
    loader: async () => {
        const session = await getUserSession();
        if (!session?.user)
            throw redirect({ to: "/conta/entrar" });
        return session.user;
    },
    component: AccountPage,
});
function AccountPage() {
    const user = Route.useLoaderData();
    const { logout } = useUserAuth();
    return (_jsx(AppLayout, { children: _jsx("div", { className: "max-w-lg mx-auto space-y-6", children: _jsxs("div", { className: "rounded-3xl bg-surface border border-border p-5 sm:p-8 shadow-soft", children: [_jsx("h1", { className: "font-display font-bold text-2xl", children: "Minha conta" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Acompanhe ofertas e produtos favoritos." }), _jsxs("dl", { className: "mt-6 space-y-3 text-sm", children: [_jsxs("div", { children: [_jsx("dt", { className: "text-muted-foreground text-xs", children: "Nome" }), _jsx("dd", { className: "font-semibold", children: user.name })] }), _jsxs("div", { children: [_jsx("dt", { className: "text-muted-foreground text-xs", children: "E-mail" }), _jsx("dd", { className: "font-semibold", children: user.email })] }), _jsxs("div", { children: [_jsx("dt", { className: "text-muted-foreground text-xs", children: "Estado" }), _jsx("dd", { className: "font-semibold text-success", children: user.emailVerified ? "Conta confirmada" : "Aguarda confirmação" })] })] }), _jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [_jsx(Link, { to: "/maisclicados", className: "rounded-2xl bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition-colors", children: "Mais clicados" }), _jsx(Link, { to: "/produtos", className: "rounded-2xl bg-muted px-5 py-2.5 text-sm font-semibold hover:bg-accent transition-colors", children: "Ver produtos" }), _jsx("button", { type: "button", onClick: () => logout().then(() => (window.location.href = "/")), className: "rounded-2xl bg-muted px-5 py-2.5 text-sm font-semibold hover:bg-accent transition-colors", children: "Sair" })] })] }) }) }));
}
