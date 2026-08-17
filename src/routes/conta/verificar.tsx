import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { VerifyEmailForm } from "@/components/conta/VerifyEmailForm";
import { useVerifyEmail } from "@/hooks/use-verify-email";

type VerifySearch = { email?: string };

export const Route = createFileRoute("/conta/verificar")({
  validateSearch: (search: Record<string, unknown>): VerifySearch => ({
    email: typeof search.email === "string" ? search.email : undefined,
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { email: emailFromUrl } = Route.useSearch();
  const state = useVerifyEmail(emailFromUrl);

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        <VerifyEmailForm
          email={state.email}
          code={state.code}
          error={state.error}
          message={state.message}
          loading={state.loading}
          onEmailChange={state.setEmail}
          onCodeChange={state.setCode}
          onSubmit={state.submit}
          onResend={state.resend}
        />
      </div>
    </AppLayout>
  );
}
