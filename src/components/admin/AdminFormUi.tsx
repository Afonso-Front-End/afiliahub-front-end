import { useEffect, useRef, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { AdminItemCard } from "@/components/admin/AdminItemCard";
import { AdminSelectField } from "@/components/admin/AdminSelectMenu";
import { adminInputClass } from "@/components/admin/admin-input";
import { parseBrlPriceInput } from "@/lib/price-input";
import { cn } from "@/lib/utils";

function formatBrlPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function priceDiscountPercent(price: number, oldPrice: number) {
  if (!Number.isFinite(price) || !Number.isFinite(oldPrice) || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function AdminField({
  label,
  value,
  onChange,
  multiline,
  hint,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
  type?: "text" | "number";
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      {hint && <span className="block text-[11px] text-muted-foreground -mt-0.5">{hint}</span>}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cn(adminInputClass, "resize-y min-h-[88px]")}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={adminInputClass}
        />
      )}
    </label>
  );
}

export { AdminSelectField };

export function AdminFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/80 bg-background/60 overflow-hidden">
      <div className="px-5 py-4 border-b border-border/60 bg-muted/40">
        <h2 className="text-sm font-semibold">{title}</h2>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </section>
  );
}

export { AdminItemCard };

export function AdminNumberField({
  label,
  value,
  onChange,
  step = "0.01",
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: string;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      {hint && <span className="block text-[11px] text-muted-foreground -mt-0.5">{hint}</span>}
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={adminInputClass}
      />
    </label>
  );
}

export function AdminPriceField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  const [display, setDisplay] = useState(formatBrlPrice(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDisplay(formatBrlPrice(value));
  }, [value, focused]);

  const commit = (raw: string) => {
    const parsed = parseBrlPriceInput(raw);
    onChange(parsed);
    setDisplay(formatBrlPrice(parsed));
  };

  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      {hint && <span className="block text-[11px] text-muted-foreground -mt-0.5">{hint}</span>}
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
          R$
        </span>
        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={display}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            commit(display);
          }}
          onChange={(e) => {
            const next = e.target.value;
            setDisplay(next);
            if (next.trim()) onChange(parseBrlPriceInput(next));
          }}
          placeholder="0,00"
          className={cn(adminInputClass, "pl-10 font-mono tabular-nums")}
        />
      </div>
    </label>
  );
}

export function AdminPriceGroup({
  price,
  oldPrice,
  onPriceChange,
  onOldPriceChange,
  priceLabel = "Preço promocional",
  oldPriceLabel = "Preço original",
}: {
  price: number;
  oldPrice: number;
  onPriceChange: (value: number) => void;
  onOldPriceChange: (value: number) => void;
  priceLabel?: string;
  oldPriceLabel?: string;
}) {
  const discount = priceDiscountPercent(price, oldPrice);

  return (
    <div className="rounded-2xl border border-border/60 bg-muted/15 p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold text-foreground">Preços</p>
        {discount > 0 ? (
          <span className="text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {discount}% de desconto
          </span>
        ) : (
          <span className="text-[10px] text-muted-foreground">Sem desconto visível</span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AdminPriceField
          label={priceLabel}
          value={price}
          onChange={onPriceChange}
          hint="Valor exibido no card"
        />
        <AdminPriceField
          label={oldPriceLabel}
          value={oldPrice}
          onChange={onOldPriceChange}
          hint="Valor riscado no site"
        />
      </div>
    </div>
  );
}
