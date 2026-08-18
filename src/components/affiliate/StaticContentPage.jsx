import { jsx as _jsx } from "react/jsx-runtime";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { StaticPage } from "@/components/affiliate/StaticPage";
export function StaticContentPage({ title, description, children, }) {
    return (_jsx(AppLayout, { children: _jsx(StaticPage, { title: title, description: description, children: children }) }));
}
