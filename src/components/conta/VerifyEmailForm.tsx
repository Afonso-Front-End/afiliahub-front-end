import { Link } from "@tanstack/react-router";

function VerifyEmailInputs({
  email,
  code,
  error,
  message,
  loading,
  onEmailChange,
  onCodeChange,
  onSubmit,
}: {
  email: string;
  code: string;
  error: string;
  message: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="text-xs space-y-1 block">
        E-mail
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full rounded-xl border border-border px-3 py-2.5 text-sm"
          required
        />
      </label>
      <label className="text-xs space-y-1 block">
        Código
        <input
          value={code}
          onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          className="w-full rounded-xl border border-border px-3 py-2.5 text-sm tracking-[0.4em] text-center font-semibold"
          placeholder="000000"
          required
        />
      </label>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {message && <p className="text-sm text-success">{message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-foreground text-background rounded-2xl py-3 text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-60"
      >
        {loading ? "A confirmar…" : "Confirmar conta"}
      </button>
    </form>
  );
}

export function VerifyEmailForm({
  email,
  code,
  error,
  message,
  loading,
  onEmailChange,
  onCodeChange,
  onSubmit,
  onResend,
}: {
  email: string;
  code: string;
  error: string;
  message: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
}) {
  return (
    <div className="rounded-3xl bg-surface border border-border p-5 sm:p-8 shadow-soft">
      <h1 className="font-display font-bold text-2xl">Confirmar e-mail</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Introduza o código de 6 dígitos enviado para o seu e-mail.
      </p>
      <VerifyEmailInputs
        email={email}
        code={code}
        error={error}
        message={message}
        loading={loading}
        onEmailChange={onEmailChange}
        onCodeChange={onCodeChange}
        onSubmit={onSubmit}
      />
      <button
        type="button"
        onClick={onResend}
        className="w-full mt-3 text-xs font-semibold text-primary hover:underline"
      >
        Reenviar código
      </button>
      <p className="text-xs text-center text-muted-foreground mt-6">
        <Link to="/conta/entrar" className="text-primary font-semibold hover:underline">
          Voltar ao login
        </Link>
      </p>
    </div>
  );
}
