import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackToHomeLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="size-4" />
      Voltar ao início
    </Link>
  );
}
