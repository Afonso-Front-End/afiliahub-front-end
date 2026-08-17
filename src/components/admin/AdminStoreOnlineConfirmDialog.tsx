import { useEffect, useState } from "react";
import { StoreOnlineConfirmForm } from "@/components/admin/StoreOnlineConfirmForm";

function DialogBackdrop({ loading, onCancel }: { loading: boolean; onCancel: () => void }) {
  return (
    <button
      type="button"
      className="absolute inset-0 bg-black/50"
      aria-label="Fechar"
      onClick={onCancel}
      disabled={loading}
    />
  );
}

export function AdminStoreOnlineConfirmDialog({
  open,
  goingOnline,
  loading,
  error,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  goingOnline: boolean;
  loading: boolean;
  error: string;
  onConfirm: (password: string) => void;
  onCancel: () => void;
}) {
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open) setPassword("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <DialogBackdrop loading={loading} onCancel={onCancel} />
      <StoreOnlineConfirmForm
        goingOnline={goingOnline}
        loading={loading}
        error={error}
        password={password}
        onPasswordChange={setPassword}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </div>
  );
}
