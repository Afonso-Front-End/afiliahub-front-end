import { useEffect, useState } from "react";
import { saveStoreApiConfig } from "@/api/store-api";
export function useStoreApiCard(initial, onSaved, onSaveSuccess) {
    const [form, setForm] = useState(initial);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        setForm(initial);
    }, [initial]);
    const save = async () => {
        setSaving(true);
        setError("");
        try {
            const { config } = await saveStoreApiConfig(form.storeName, {
                enabled: form.enabled,
                affiliateId: form.affiliateId,
                affiliateParam: form.affiliateParam,
                apiKey: form.apiKey,
                apiSecret: form.apiSecret,
                trackingParam: form.trackingParam,
                trackingPrefix: form.trackingPrefix,
                webhookSecret: form.webhookSecret,
                notes: form.notes,
            });
            setForm(config);
            onSaveSuccess("Configuração guardada");
            onSaved();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao guardar.");
        }
        finally {
            setSaving(false);
        }
    };
    return { form, setForm, saving, error, save };
}
