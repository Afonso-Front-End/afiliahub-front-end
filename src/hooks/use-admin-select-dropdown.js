import { useEffect, useRef, useState } from "react";
export function useAdminSelectDropdown() {
    const [open, setOpen] = useState(false);
    const [menuStyle, setMenuStyle] = useState({});
    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    useEffect(() => {
        if (!open || !triggerRef.current)
            return;
        const updatePosition = () => {
            const rect = triggerRef.current.getBoundingClientRect();
            setMenuStyle({
                position: "fixed",
                top: rect.bottom + 6,
                left: rect.left,
                width: rect.width,
                zIndex: 80,
            });
        };
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [open]);
    useEffect(() => {
        if (!open)
            return;
        const onPointerDown = (event) => {
            const target = event.target;
            if (rootRef.current?.contains(target) || menuRef.current?.contains(target))
                return;
            setOpen(false);
        };
        const onKeyDown = (event) => {
            if (event.key === "Escape")
                setOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);
    return { open, setOpen, menuStyle, rootRef, triggerRef, menuRef };
}
