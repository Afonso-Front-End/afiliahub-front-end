import { jsx as _jsx } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { VerifyEmailForm } from "@/components/conta/VerifyEmailForm";
import { useVerifyEmail } from "@/hooks/use-verify-email";
export const Route = createFileRoute("/conta/verificar")({
    validateSearch: (search) => ({
        email: typeof search.email === "string" ? search.email : undefined,
    }),
    component: VerifyEmailPage,
});
function VerifyEmailPage() {
    const { email: emailFromUrl } = Route.useSearch();
    const state = useVerifyEmail(emailFromUrl);
    return (_jsx(AppLayout, { children: _jsx("div", { className: "max-w-md mx-auto", children: _jsx(VerifyEmailForm, { email: state.email, code: state.code, error: state.error, message: state.message, loading: state.loading, onEmailChange: state.setEmail, onCodeChange: state.setCode, onSubmit: state.submit, onResend: state.resend }) }) }));
}
