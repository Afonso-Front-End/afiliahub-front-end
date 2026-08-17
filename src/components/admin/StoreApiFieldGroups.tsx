import type { StoreApiConfig } from "@/types/user";
import { cn } from "@/lib/utils";

const fieldClass = "w-full rounded-xl border border-border px-3 py-2.5 text-sm";

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  readOnly,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <label className="text-xs space-y-1 block">
      {label}
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={cn(fieldClass, readOnly && "bg-muted")}
        placeholder={placeholder}
      />
    </label>
  );
}

export function StoreApiAffiliateFields({
  form,
  onChange,
}: {
  form: StoreApiConfig;
  onChange: (next: StoreApiConfig) => void;
}) {
  return (
    <>
      <TextField
        label="ID de afiliado"
        value={form.affiliateId}
        onChange={(value) => onChange({ ...form, affiliateId: value })}
        placeholder="ID fornecido pela loja"
      />
      <div className="grid sm:grid-cols-2 gap-3">
        <TextField
          label="Parâmetro do ID (query)"
          value={form.affiliateParam}
          onChange={(value) => onChange({ ...form, affiliateParam: value })}
        />
        <TextField
          label="Parâmetro de rastreio"
          value={form.trackingParam}
          onChange={(value) => onChange({ ...form, trackingParam: value })}
        />
      </div>
    </>
  );
}

export function StoreApiCredentialFields({
  form,
  onChange,
}: {
  form: StoreApiConfig;
  onChange: (next: StoreApiConfig) => void;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <TextField
        label="API Key"
        value={form.apiKey}
        onChange={(value) => onChange({ ...form, apiKey: value })}
        placeholder="Opcional"
      />
      <TextField
        label="API Secret"
        type="password"
        value={form.apiSecret}
        onChange={(value) => onChange({ ...form, apiSecret: value })}
        placeholder="Opcional"
      />
    </div>
  );
}

export function StoreApiWebhookFields({
  form,
  onChange,
}: {
  form: StoreApiConfig;
  onChange: (next: StoreApiConfig) => void;
}) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-3">
        <TextField
          label="Prefixo de rastreio"
          value={form.trackingPrefix}
          onChange={(value) => onChange({ ...form, trackingPrefix: value })}
        />
        <TextField
          label="Segredo do webhook"
          value={form.webhookSecret}
          onChange={(value) => onChange({ ...form, webhookSecret: value })}
          placeholder="Validação de postbacks"
        />
      </div>
      <TextField label="URL de postback (copiar para a loja)" value={form.postbackUrl} readOnly />
      <label className="text-xs space-y-1 block">
        Notas internas
        <textarea
          value={form.notes}
          onChange={(e) => onChange({ ...form, notes: e.target.value })}
          className={cn(fieldClass, "min-h-20 resize-y")}
        />
      </label>
    </>
  );
}
