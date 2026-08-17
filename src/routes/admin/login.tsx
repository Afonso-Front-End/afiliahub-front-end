import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Zap } from "lucide-react";
import { AuthEmailPasswordFields, AuthSubmitButton } from "@/components/auth/AuthFormFields";
import { adminLogin, getAdminSession } from "@/api/auth";
import { useFormSubmit } from "@/hooks/use-form-submit";

export const Route = createFileRoute("/admin/login")({
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (session) throw redirect({ to: "/admin" });
  },
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@afiliahub.com");
  const [password, setPassword] = useState("");
  const { loading, error, run } = useFormSubmit("E-mail ou senha inválidos");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    void run(async () => {
      await adminLogin({ data: { email, password } });
      navigate({ to: "/admin" });
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-3xl p-5 sm:p-8 shadow-soft">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="size-10 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow">
            <Zap className="size-5 text-primary-foreground" fill="currentColor" />
          </div>
          <div>
            <p className="font-display font-extrabold text-lg">AfiliaHub Admin</p>
            <p className="text-xs text-muted-foreground">Painel de edição do site</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <AuthEmailPasswordFields
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <AuthSubmitButton loading={loading} loadingLabel="Entrando..." label="Entrar" />
        </form>

        <Link to="/" className="block text-center text-xs text-muted-foreground mt-6 hover:text-foreground">
          ← Voltar ao site
        </Link>
      </div>
    </div>
  );
}
