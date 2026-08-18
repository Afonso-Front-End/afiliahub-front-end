import { getRequestHeader } from "@tanstack/react-start/server";
import { getServerConfig } from "@/config.server";
import { parseApiJsonResponse } from "./parse-response";
export async function serverApiFetch(path, init) {
    const cookie = getRequestHeader("cookie");
    const { apiUrl } = getServerConfig();
    const headers = new Headers(init?.headers);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    if (cookie) {
        headers.set("Cookie", cookie);
    }
    const res = await fetch(`${apiUrl}${path}`, {
        ...init,
        headers,
        cache: "no-store",
    });
    return parseApiJsonResponse(res);
}
