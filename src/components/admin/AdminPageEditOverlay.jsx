import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getAdminSession } from "@/api/auth";
import { AdminSectionOverlay } from "./AdminSectionOverlay";
export function AdminPageEditOverlay({ sectionId, label, children, }) {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        getAdminSession()
            .then((session) => setIsAdmin(!!session))
            .catch(() => setIsAdmin(false));
    }, []);
    if (!isAdmin)
        return _jsx(_Fragment, { children: children });
    return (_jsx(AdminSectionOverlay, { sectionId: sectionId, label: label, children: children }));
}
