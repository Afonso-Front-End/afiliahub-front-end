import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { AuthEmailPasswordFields, AuthSubmitButton } from "@/components/auth/AuthFormFields";
import { registerUser } from "@/api/user-auth";
import { useAuthCredentials } from "@/hooks/use-auth-credentials";
import { useFormSubmit } from "@/hooks/use-form-submit";
export const Route = createFileRoute("/conta/registar")({
    component: RegisterPage,
});
function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const { email, setEmail, password, setPassword } = useAuthCredentials();
    const { loading, error, run } = useFormSubmit("Erro ao registar.");
    const submit = (e) => {
        e.preventDefault();
        void run(async () => {
            await registerUser({ name, email, password });
            navigate({ to: "/conta/verificar", search: { email } });
        });
    };
    return (_jsx(AppLayout, { children: _jsx("div", { className: "max-w-md mx-auto", children: _jsxs("div", { className: "rounded-3xl bg-surface border border-border p-5 sm:p-8 shadow-soft", children: [_jsx("h1", { className: "font-display font-bold text-2xl", children: "Criar conta" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Receber\u00E1 um c\u00F3digo de confirma\u00E7\u00E3o no seu e-mail." }), _jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [_jsxs("label", { className: "text-xs space-y-1 block", children: ["Nome", _jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: "w-full rounded-xl border border-border px-3 py-2.5 text-sm", required: true })] }), _jsx(AuthEmailPasswordFields, { email: email, password: password, onEmailChange: setEmail, onPasswordChange: setPassword, passwordMinLength: 6 }), error && _jsx("p", { className: "text-sm text-destructive", children: error }), _jsx(AuthSubmitButton, { loading: loading, loadingLabel: "A enviar c\u00F3digo\u2026", label: "Registar e confirmar e-mail" })] }), _jsxs("p", { className: "text-xs text-center text-muted-foreground mt-6", children: ["J\u00E1 tem conta?", " ", _jsx(Link, { to: "/conta/entrar", className: "text-primary font-semibold hover:underline", children: "Entrar" })] })] }) }) }));
}
