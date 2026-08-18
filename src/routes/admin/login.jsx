import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Zap } from "lucide-react";
import { AuthEmailPasswordFields, AuthSubmitButton } from "@/components/auth/AuthFormFields";
import { adminLogin, getAdminSession } from "@/api/auth";
import { useFormSubmit } from "@/hooks/use-form-submit";
export const Route = createFileRoute("/admin/login")({
    beforeLoad: async () => {
        const session = await getAdminSession();
        if (session)
            throw redirect({ to: "/admin" });
    },
    component: AdminLoginPage,
});
function AdminLoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("admin@afiliahub.com");
    const [password, setPassword] = useState("");
    const { loading, error, run } = useFormSubmit("E-mail ou senha inválidos");
    const submit = (e) => {
        e.preventDefault();
        void run(async () => {
            await adminLogin({ data: { email, password } });
            navigate({ to: "/admin" });
        });
    };
    return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-md bg-surface rounded-3xl p-5 sm:p-8 shadow-soft", children: [_jsxs("div", { className: "flex items-center gap-2.5 mb-6", children: [_jsx("div", { className: "size-10 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow", children: _jsx(Zap, { className: "size-5 text-primary-foreground", fill: "currentColor" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-display font-extrabold text-lg", children: "AfiliaHub Admin" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Painel de edi\u00E7\u00E3o do site" })] })] }), _jsxs("form", { onSubmit: submit, className: "space-y-4", children: [_jsx(AuthEmailPasswordFields, { email: email, password: password, onEmailChange: setEmail, onPasswordChange: setPassword }), error && _jsx("p", { className: "text-sm text-destructive", children: error }), _jsx(AuthSubmitButton, { loading: loading, loadingLabel: "Entrando...", label: "Entrar" })] }), _jsx(Link, { to: "/", className: "block text-center text-xs text-muted-foreground mt-6 hover:text-foreground", children: "\u2190 Voltar ao site" })] }) }));
}
