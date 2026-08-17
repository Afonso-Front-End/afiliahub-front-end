import type { SystemConfigView } from "@/types/system-config";

const fieldClass = "w-full rounded-xl border border-border px-3 py-2.5 text-sm";

export function SystemGeneralFields({
  form,
  onChange,
}: {
  form: SystemConfigView;
  onChange: (next: SystemConfigView) => void;
}) {
  return (
    <>
      <h2 className="font-display font-bold text-lg">Geral</h2>

      <label className="text-xs space-y-1 block">
        Nome do site
        <input
          value={form.siteDisplayName}
          onChange={(e) => onChange({ ...form, siteDisplayName: e.target.value })}
          className={fieldClass}
        />
      </label>

      <label className="text-xs space-y-1 block">
        E-mail de suporte (público)
        <input
          type="email"
          value={form.supportEmail}
          onChange={(e) => onChange({ ...form, supportEmail: e.target.value })}
          className={fieldClass}
        />
      </label>

      <label className="text-xs space-y-1 block">
        URL pública do site
        <input
          value={form.publicSiteUrl}
          onChange={(e) => onChange({ ...form, publicSiteUrl: e.target.value })}
          className={fieldClass}
          placeholder="https://sua-loja.com"
        />
      </label>

      <label className="text-xs space-y-1 block">
        URL pública da API (postbacks)
        <input
          value={form.publicApiUrl}
          onChange={(e) => onChange({ ...form, publicApiUrl: e.target.value })}
          className={fieldClass}
          placeholder="Vazio = usa valor do servidor"
        />
        <span className="text-[11px] text-muted-foreground">
          Servidor atual: {form.serverPublicApiUrl}
        </span>
      </label>
    </>
  );
}

export function SystemUserAccountFields({
  form,
  onChange,
}: {
  form: SystemConfigView;
  onChange: (next: SystemConfigView) => void;
}) {
  return (
    <>
      <h2 className="font-display font-bold text-lg pt-2">Contas de utilizador</h2>

      <label className="inline-flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={form.allowUserRegistration}
          onChange={(e) => onChange({ ...form, allowUserRegistration: e.target.checked })}
        />
        Permitir registo de novas contas
      </label>

      <label className="inline-flex items-center gap-2 text-sm font-medium block">
        <input
          type="checkbox"
          checked={form.requireEmailVerification}
          onChange={(e) => onChange({ ...form, requireEmailVerification: e.target.checked })}
        />
        Exigir confirmação por e-mail antes do login
      </label>

      <div className="rounded-2xl bg-muted/50 border border-border px-4 py-3 text-sm space-y-1">
        <p>
          <span className="font-semibold">E-mail transacional:</span>{" "}
          {form.emailServiceConfigured ? (
            <span className="text-success">configurado no .env</span>
          ) : (
            <span className="text-destructive">não configurado (SMTP no .env)</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground">
          Credenciais SMTP nunca são guardadas na base de dados nem mostradas aqui.
        </p>
      </div>
    </>
  );
}
