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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await registerUser({ name, email, password });
      navigate({ to: "/conta/verificar", search: { email } });
    });
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        <div className="rounded-3xl bg-surface border border-border p-5 sm:p-8 shadow-soft">
          <h1 className="font-display font-bold text-2xl">Criar conta</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Receberá um código de confirmação no seu e-mail.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="text-xs space-y-1 block">
              Nome
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border px-3 py-2.5 text-sm"
                required
              />
            </label>
            <AuthEmailPasswordFields
              email={email}
              password={password}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              passwordMinLength={6}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <AuthSubmitButton
              loading={loading}
              loadingLabel="A enviar código…"
              label="Registar e confirmar e-mail"
            />
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Já tem conta?{" "}
            <Link to="/conta/entrar" className="text-primary font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
