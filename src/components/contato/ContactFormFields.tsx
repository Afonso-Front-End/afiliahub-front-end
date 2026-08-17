import { Send } from "lucide-react";
export const CONTACT_SUBJECTS = [
  "Dúvidas gerais",
  "Suporte a afiliados",
  "Parcerias e marketplaces",
  "Problemas com ofertas",
  "Outro",
] as const;
import { cn } from "@/lib/utils";

const inputClass =
  "w-full bg-muted rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow";

export function ContactIdentityFields({
  nome,
  email,
  assunto,
  onNomeChange,
  onEmailChange,
  onAssuntoChange,
}: {
  nome: string;
  email: string;
  assunto: string;
  onNomeChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAssuntoChange: (value: string) => void;
}) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nome" className="text-sm font-semibold block mb-1.5">
            Nome
          </label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => onNomeChange(e.target.value)}
            className={inputClass}
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold block mb-1.5">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className={inputClass}
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="assunto" className="text-sm font-semibold block mb-1.5">
          Assunto
        </label>
        <select
          id="assunto"
          value={assunto}
          onChange={(e) => onAssuntoChange(e.target.value)}
          className={cn(inputClass, "appearance-none cursor-pointer")}
        >
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export function ContactMessageField({
  mensagem,
  onMensagemChange,
}: {
  mensagem: string;
  onMensagemChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor="mensagem" className="text-sm font-semibold">
          Mensagem
        </label>
        <span className="text-[10px] text-muted-foreground tabular-nums">{mensagem.length}/500</span>
      </div>
      <textarea
        id="mensagem"
        value={mensagem}
        onChange={(e) => onMensagemChange(e.target.value.slice(0, 500))}
        rows={5}
        className={cn(inputClass, "resize-none")}
        placeholder="Descreva sua dúvida ou solicitação com o máximo de detalhes..."
      />
    </div>
  );
}

export function ContactSubmitButton({ enviando }: { enviando: boolean }) {
  return (
    <button
      type="submit"
      disabled={enviando}
      className={cn(
        "w-full inline-flex items-center justify-center gap-2 bg-gradient-cta text-primary-foreground rounded-2xl py-3.5 text-sm font-semibold shadow-glow transition-all",
        enviando ? "opacity-70 cursor-wait" : "hover:scale-[1.01]",
      )}
    >
      {enviando ? (
        "Enviando..."
      ) : (
        <>
          Enviar mensagem
          <Send className="size-4" />
        </>
      )}
    </button>
  );
}
