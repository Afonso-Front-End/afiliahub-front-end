import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  ContactIdentityFields,
  ContactMessageField,
  ContactSubmitButton,
} from "@/components/contato/ContactFormFields";

const CHANNELS = [
  {
    icon: Mail,
    label: "E-mail geral",
    value: "contato@afiliahub.com.br",
    href: "mailto:contato@afiliahub.com.br",
    desc: "Para dúvidas, sugestões e parcerias.",
  },
  {
    icon: Headphones,
    label: "Suporte a afiliados",
    value: "afiliados@afiliahub.com.br",
    href: "mailto:afiliados@afiliahub.com.br",
    desc: "Ajuda com links, comissões e ferramentas.",
  },
  {
    icon: Clock,
    label: "Horário de atendimento",
    value: "Seg a Sex, 9h às 18h",
    desc: "Horário de Brasília. Resposta em até 48h úteis.",
  },
] as const;

export function ContactHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-10 shadow-soft">
      <div className="relative z-10 max-w-xl">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-surface/70 backdrop-blur px-3 py-1.5 rounded-full text-primary">
          <MessageCircle className="size-3.5" />
          Estamos aqui para ajudar
        </span>
        <h1 className="mt-4 font-display font-extrabold text-3xl md:text-4xl tracking-tight">
          Fale com o AfiliaHub
        </h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Tire dúvidas sobre ofertas, cashback, afiliação ou parcerias. Nossa equipe responde com
          prioridade para afiliados cadastrados.
        </p>
      </div>
      <div className="absolute -right-8 -bottom-8 size-48 rounded-full bg-primary/10 blur-2xl" />
    </div>
  );
}

export function ContactChannels() {
  return (
    <div className="lg:col-span-2 space-y-4">
      {CHANNELS.map((canal) => {
        const Icon = canal.icon;
        return (
          <div
            key={canal.label}
            className="bg-surface rounded-3xl p-5 shadow-soft hover:shadow-card transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="size-11 rounded-2xl bg-gradient-peach grid place-items-center shrink-0">
                <Icon className="size-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {canal.label}
                </p>
                {"href" in canal && canal.href ? (
                  <a
                    href={canal.href}
                    className="font-semibold text-primary mt-0.5 block hover:underline truncate"
                  >
                    {canal.value}
                  </a>
                ) : (
                  <p className="font-semibold mt-0.5">{canal.value}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1.5">{canal.desc}</p>
              </div>
            </div>
          </div>
        );
      })}

      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-surface rounded-3xl p-5 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5 group"
      >
        <div className="size-11 rounded-2xl bg-[oklch(0.7_0.17_150)] grid place-items-center shrink-0">
          <MessageCircle className="size-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm">WhatsApp</p>
          <p className="text-xs text-muted-foreground">Atendimento rápido, Seg a Sex</p>
        </div>
        <span className="ml-auto text-xs font-semibold text-primary group-hover:underline">
          Abrir chat →
        </span>
      </a>
    </div>
  );
}

export function ContactFormSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="size-16 rounded-full bg-gradient-peach grid place-items-center mb-4">
        <CheckCircle2 className="size-8 text-primary" />
      </div>
      <h2 className="font-display font-bold text-xl">Mensagem enviada!</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        Recebemos sua mensagem e responderemos no e-mail informado em até 48 horas úteis.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-semibold text-primary hover:underline"
      >
        Enviar outra mensagem
      </button>
    </div>
  );
}

export function ContactMessageForm({
  nome,
  email,
  assunto,
  mensagem,
  enviando,
  onNomeChange,
  onEmailChange,
  onAssuntoChange,
  onMensagemChange,
  onSubmit,
}: {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  enviando: boolean;
  onNomeChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAssuntoChange: (value: string) => void;
  onMensagemChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <>
      <h2 className="font-display font-bold text-xl mb-1">Envie sua mensagem</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Preencha o formulário e nossa equipe entrará em contato.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <ContactIdentityFields
          nome={nome}
          email={email}
          assunto={assunto}
          onNomeChange={onNomeChange}
          onEmailChange={onEmailChange}
          onAssuntoChange={onAssuntoChange}
        />
        <ContactMessageField mensagem={mensagem} onMensagemChange={onMensagemChange} />
        <ContactSubmitButton enviando={enviando} />
      </form>
    </>
  );
}
