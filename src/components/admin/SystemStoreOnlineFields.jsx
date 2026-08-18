import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AdminStoreOnlineConfirmDialog } from "@/components/admin/AdminStoreOnlineConfirmDialog";
import { useStoreOnlineSwitch } from "@/hooks/use-store-online-switch";
import { storeOnlineStatusLabel, storeOnlineSuccessMessage } from "@/lib/store-online-copy";
import { useState } from "react";
export function SystemStoreOnlineFields({ storeOnline, onStoreOnlineChange, }) {
    const [message, setMessage] = useState("");
    const { dialogOpen, goingOnline, loading, error, requestSwitch, cancelSwitch, confirmSwitch, } = useStoreOnlineSwitch((online) => {
        onStoreOnlineChange(online);
        setMessage(storeOnlineSuccessMessage(online));
    });
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "space-y-3 pt-2 border-t border-border", children: [_jsx("h2", { className: "font-display font-bold text-lg", children: "Estado da loja" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Controle se o site est\u00E1 vis\u00EDvel ao p\u00FAblico ou em manuten\u00E7\u00E3o. A edi\u00E7\u00E3o do conte\u00FAdo funciona nos dois estados." }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Estado atual: ", _jsx("span", { className: "font-semibold", children: storeOnlineStatusLabel(storeOnline) })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("button", { type: "button", disabled: loading || storeOnline, onClick: () => requestSwitch(true), className: "rounded-2xl bg-foreground text-background px-4 py-2 text-sm font-semibold disabled:opacity-50", children: "Colocar online" }), _jsx("button", { type: "button", disabled: loading || !storeOnline, onClick: () => requestSwitch(false), className: "rounded-2xl border border-border px-4 py-2 text-sm font-semibold disabled:opacity-50", children: "Colocar offline" })] }), message && _jsx("p", { className: "text-sm text-success", children: message })] }), _jsx(AdminStoreOnlineConfirmDialog, { open: dialogOpen, goingOnline: goingOnline, loading: loading, error: error, onConfirm: (password) => void confirmSwitch(password), onCancel: cancelSwitch })] }));
}
