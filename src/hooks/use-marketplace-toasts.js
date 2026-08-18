import { useCallback, useState } from "react";
export function useMarketplaceToasts() {
    const [toasts, setToasts] = useState([]);
    const notify = useCallback((message) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3200);
    }, []);
    return { toasts, notify };
}
