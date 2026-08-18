import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setStoreOnline } from "@/api/cms";
import { reloadSiteContentFromServer } from "@/lib/site-content-query";
export function useStoreOnlineSwitch(onStoreOnlineChange) {
    const queryClient = useQueryClient();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [targetOnline, setTargetOnline] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const requestSwitch = (online) => {
        setTargetOnline(online);
        setError("");
        setDialogOpen(true);
    };
    const cancelSwitch = () => {
        if (loading)
            return;
        setDialogOpen(false);
        setError("");
    };
    const confirmSwitch = async (password) => {
        setLoading(true);
        setError("");
        try {
            const result = await setStoreOnline({ online: targetOnline, password });
            await reloadSiteContentFromServer(queryClient);
            await queryClient.invalidateQueries({ queryKey: ["system-config"] });
            onStoreOnlineChange?.(result.storeOnline);
            setDialogOpen(false);
            return result;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Não foi possível alterar o estado da loja.");
            return null;
        }
        finally {
            setLoading(false);
        }
    };
    return {
        dialogOpen,
        goingOnline: targetOnline,
        loading,
        error,
        requestSwitch,
        cancelSwitch,
        confirmSwitch,
    };
}
