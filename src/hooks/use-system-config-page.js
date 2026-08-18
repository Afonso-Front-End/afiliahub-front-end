import { useEffect, useState } from "react";
import { fetchSystemConfig, saveSystemConfig } from "@/api/system-config";
export function useSystemConfigPage() {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        fetchSystemConfig()
            .then(setForm)
            .catch((err) => setError(err instanceof Error ? err.message : "Erro ao carregar."))
            .finally(() => setLoading(false));
    }, []);
    const save = async () => {
        if (!form)
            return;
        setSaving(true);
        setError("");
        setSaved(false);
        try {
            const updated = await saveSystemConfig({
                siteDisplayName: form.siteDisplayName,
                supportEmail: form.supportEmail,
                publicSiteUrl: form.publicSiteUrl,
                publicApiUrl: form.publicApiUrl,
                allowUserRegistration: form.allowUserRegistration,
                requireEmailVerification: form.requireEmailVerification,
            });
            setForm(updated);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao guardar.");
        }
        finally {
            setSaving(false);
        }
    };
    return { form, setForm, loading, saving, saved, error, save };
}
