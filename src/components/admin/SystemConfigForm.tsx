import {
  SystemGeneralFields,
  SystemUserAccountFields,
} from "@/components/admin/SystemConfigSections";
import { SystemStoreOnlineFields } from "@/components/admin/SystemStoreOnlineFields";
import type { SystemConfigView } from "@/types/system-config";

export function SystemConfigForm({
  form,
  saving,
  onChange,
  onSave,
}: {
  form: SystemConfigView;
  saving: boolean;
  onChange: (next: SystemConfigView) => void;
  onSave: () => void;
}) {
  return (
    <div className="rounded-3xl bg-surface border border-border p-6 shadow-soft space-y-4">
      <SystemGeneralFields form={form} onChange={onChange} />
      <SystemStoreOnlineFields
        storeOnline={form.storeOnline}
        onStoreOnlineChange={(storeOnline) => onChange({ ...form, storeOnline })}
      />
      <SystemUserAccountFields form={form} onChange={onChange} />

      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="rounded-2xl bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-60"
      >
        {saving ? "A guardar…" : "Guardar configurações"}
      </button>
    </div>
  );
}
