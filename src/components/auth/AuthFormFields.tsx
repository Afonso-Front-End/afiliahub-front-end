const authInputClass = "w-full rounded-xl border border-border px-3 py-2.5 text-sm";

export function AuthEmailPasswordFields({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  passwordMinLength,
}: {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  passwordMinLength?: number;
}) {
  return (
    <>
      <label className="text-xs space-y-1 block">
        E-mail
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={authInputClass}
          required
        />
      </label>
      <label className="text-xs space-y-1 block">
        Senha
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          minLength={passwordMinLength}
          className={authInputClass}
          required
        />
      </label>
    </>
  );
}

export function AuthSubmitButton({
  loading,
  loadingLabel,
  label,
}: {
  loading: boolean;
  loadingLabel: string;
  label: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-foreground text-background rounded-2xl py-3 text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-60"
    >
      {loading ? loadingLabel : label}
    </button>
  );
}
