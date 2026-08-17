import { useState } from "react";
import { getErrorMessage } from "@/lib/error-handling";

export function useFormSubmit(defaultError = "Erro inesperado.") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async (action: () => Promise<void>, options?: { fallbackError?: string }) => {
    setLoading(true);
    setError("");
    try {
      await action();
    } catch (err) {
      setError(getErrorMessage(err, options?.fallbackError ?? defaultError));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, setError, run };
}
