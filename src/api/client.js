import { parseApiJsonResponse } from "./parse-response";

function getApiBase() {
    const configured = import.meta.env.VITE_API_URL?.trim();
    if (configured) {
        return configured.replace(/\/$/, "");
    }

    if (typeof window !== "undefined") {
        return "";
    }

    return "http://localhost:4000";
}
export async function apiFetch(path, init) {
    const res = await fetch(`${getApiBase()}${path}`, {
        ...init,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
    });
    return parseApiJsonResponse(res);
}
