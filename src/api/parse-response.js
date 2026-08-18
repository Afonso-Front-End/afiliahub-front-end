export async function parseApiJsonResponse(res) {
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message ?? "Erro na API");
    }
    return res.json();
}
