import { ShieldCheck } from "lucide-react";

export function SystemConfigIntro() {
  return (
    <div className="rounded-3xl bg-surface border border-border p-6 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="size-11 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow shrink-0">
          <ShieldCheck className="size-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">Configurações seguras</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            SMTP, MongoDB e passwords de servidor continuam no ficheiro <code>.env</code> do
            backend, fora da interface.
          </p>
        </div>
      </div>
    </div>
  );
}
