import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { AuthEmailPasswordFields, AuthSubmitButton } from "@/components/auth/AuthFormFields";
import { loginUser } from "@/api/user-auth";
import { redirectIfUserSession } from "@/lib/require-user-session";
import { useUserAuth } from "@/context/user-auth-context";
import { useAuthCredentials } from "@/hooks/use-auth-credentials";
import { useFormSubmit } from "@/hooks/use-form-submit";
export const Route = createFileRoute("/conta/entrar")({
    ssr: false,
    beforeLoad: async () => {
        await redirectIfUserSession();
    },
    component: LoginPage,
});
function LoginPage() {
    const navigate = useNavigate();
    const { refresh } = useUserAuth();
    const { email, setEmail, password, setPassword } = useAuthCredentials();
    const { loading, error, run } = useFormSubmit("Erro ao entrar.");
    const submit = (e) => {
        e.preventDefault();
        void run(async () => {
            try {
                await loginUser({ email, password });
                await refresh();
                navigate({ to: "/conta" });
            }
            catch (err) {
                const message = err instanceof Error ? err.message : "Erro ao entrar.";
                if (message.includes("Confirme o seu e-mail")) {
                    navigate({ to: "/conta/verificar", search: { email } });
                }
                throw err;
            }
        });
    };
    return (_jsx(AppLayout, { children: _jsx("div", { className: "max-w-md mx-auto", children: _jsxs("div", { className: "rounded-3xl bg-surface border border-border p-5 sm:p-8 shadow-soft", children: [_jsx("h1", { className: "font-display font-bold text-2xl", children: "Entrar" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Aceda \u00E0 sua conta para ativar cashback." }), _jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [_jsx(AuthEmailPasswordFields, { email: email, password: password, onEmailChange: setEmail, onPasswordChange: setPassword }), error && _jsx("p", { className: "text-sm text-destructive", children: error }), _jsx(AuthSubmitButton, { loading: loading, loadingLabel: "A entrar\u2026", label: "Entrar" })] }), _jsxs("p", { className: "text-xs text-center text-muted-foreground mt-6", children: ["N\u00E3o tem conta?", " ", _jsx(Link, { to: "/conta/registar", className: "text-primary font-semibold hover:underline", children: "Criar conta" })] })] }) }) }));
}
