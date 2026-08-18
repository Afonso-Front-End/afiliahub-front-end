import { jsx as _jsx } from "react/jsx-runtime";
export function StaticContentSections({ sections, }) {
    return sections.map((section, index) => {
        if (section.type === "paragraph") {
            return _jsx("p", { children: section.text }, index);
        }
        if (section.type === "heading") {
            return _jsx("h2", { children: section.text }, index);
        }
        return (_jsx("ul", { children: section.items.map((item) => (_jsx("li", { children: item }, item))) }, index));
    });
}
