import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { resendVerificationCode, verifyUserEmail } from "@/api/user-auth";
import { useUserAuth } from "@/context/user-auth-context";

export function useVerifyEmail(initialEmail?: string) {
  const navigate = useNavigate();
  const { refresh } = useUserAuth();
  const [email, setEmail] = useState(initialEmail ?? "");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await verifyUserEmail({ email, code });
      await refresh();
      navigate({ to: "/conta" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Código inválido.");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setError("");
    setMessage("");
    try {
      const result = await resendVerificationCode({ email });
      setMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao reenviar.");
    }
  };

  return { email, code, error, message, loading, setEmail, setCode, submit, resend };
}
