export async function parseApiJsonResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((err as { message?: string }).message ?? "Erro na API");
  }

  return res.json() as Promise<T>;
}
