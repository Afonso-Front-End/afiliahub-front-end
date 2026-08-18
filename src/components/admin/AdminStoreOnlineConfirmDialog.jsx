import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { StoreOnlineConfirmForm } from "@/components/admin/StoreOnlineConfirmForm";
function DialogBackdrop({ loading, onCancel }) {
    return (_jsx("button", { type: "button", className: "absolute inset-0 bg-black/50", "aria-label": "Fechar", onClick: onCancel, disabled: loading }));
}
export function AdminStoreOnlineConfirmDialog({ open, goingOnline, loading, error, onConfirm, onCancel, }) {
    const [password, setPassword] = useState("");
    useEffect(() => {
        if (!open)
            setPassword("");
    }, [open]);
    if (!open)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-[80] flex items-center justify-center p-4", children: [_jsx(DialogBackdrop, { loading: loading, onCancel: onCancel }), _jsx(StoreOnlineConfirmForm, { goingOnline: goingOnline, loading: loading, error: error, password: password, onPasswordChange: setPassword, onConfirm: onConfirm, onCancel: onCancel })] }));
}
