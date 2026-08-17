import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { AuthEmailPasswordFields, AuthSubmitButton } from "@/components/auth/AuthFormFields";
import { loginUser } from "@/api/user-auth";
import { useUserAuth } from "@/context/user-auth-context";
import { useAuthCredentials } from "@/hooks/use-auth-credentials";
import { useFormSubmit } from "@/hooks/use-form-submit";

export const Route = createFileRoute("/conta/entrar")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { refresh } = useUserAuth();
  const { email, setEmail, password, setPassword } = useAuthCredentials();
  const { loading, error, run } = useFormSubmit("Erro ao entrar.");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    void run(async () => {
      try {
        await loginUser({ email, password });
        await refresh();
        navigate({ to: "/conta" });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao entrar.";
        if (message.includes("Confirme o seu e-mail")) {
          navigate({ to: "/conta/verificar", search: { email } });
        }
        throw err;
      }
    });
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        <div className="rounded-3xl bg-surface border border-border p-5 sm:p-8 shadow-soft">
          <h1 className="font-display font-bold text-2xl">Entrar</h1>
          <p className="text-sm text-muted-foreground mt-1">Aceda à sua conta para ativar cashback.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <AuthEmailPasswordFields
              email={email}
              password={password}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <AuthSubmitButton loading={loading} loadingLabel="A entrar…" label="Entrar" />
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Não tem conta?{" "}
            <Link to="/conta/registar" className="text-primary font-semibold hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
