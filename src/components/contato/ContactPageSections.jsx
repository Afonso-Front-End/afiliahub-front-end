import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckCircle2, Clock, Headphones, Mail, MessageCircle, } from "lucide-react";
import { ContactIdentityFields, ContactMessageField, ContactSubmitButton, } from "@/components/contato/ContactFormFields";
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
];
export function ContactHero() {
    return (_jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-10 shadow-soft", children: [_jsxs("div", { className: "relative z-10 max-w-xl", children: [_jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold bg-surface/70 backdrop-blur px-3 py-1.5 rounded-full text-primary", children: [_jsx(MessageCircle, { className: "size-3.5" }), "Estamos aqui para ajudar"] }), _jsx("h1", { className: "mt-4 font-display font-extrabold text-3xl md:text-4xl tracking-tight", children: "Fale com o AfiliaHub" }), _jsx("p", { className: "text-muted-foreground mt-2 text-sm md:text-base", children: "Tire d\u00FAvidas sobre ofertas, cashback, afilia\u00E7\u00E3o ou parcerias. Nossa equipe responde com prioridade para afiliados cadastrados." })] }), _jsx("div", { className: "absolute -right-8 -bottom-8 size-48 rounded-full bg-primary/10 blur-2xl" })] }));
}
export function ContactChannels() {
    return (_jsxs("div", { className: "lg:col-span-2 space-y-4", children: [CHANNELS.map((canal) => {
                const Icon = canal.icon;
                return (_jsx("div", { className: "bg-surface rounded-3xl p-5 shadow-soft hover:shadow-card transition-shadow", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "size-11 rounded-2xl bg-gradient-peach grid place-items-center shrink-0", children: _jsx(Icon, { className: "size-5 text-primary" }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: canal.label }), "href" in canal && canal.href ? (_jsx("a", { href: canal.href, className: "font-semibold text-primary mt-0.5 block hover:underline truncate", children: canal.value })) : (_jsx("p", { className: "font-semibold mt-0.5", children: canal.value })), _jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: canal.desc })] })] }) }, canal.label));
            }), _jsxs("a", { href: "https://wa.me/5511999999999", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 bg-surface rounded-3xl p-5 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5 group", children: [_jsx("div", { className: "size-11 rounded-2xl bg-[oklch(0.7_0.17_150)] grid place-items-center shrink-0", children: _jsx(MessageCircle, { className: "size-5 text-white" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-sm", children: "WhatsApp" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Atendimento r\u00E1pido, Seg a Sex" })] }), _jsx("span", { className: "ml-auto text-xs font-semibold text-primary group-hover:underline", children: "Abrir chat \u2192" })] })] }));
}
export function ContactFormSuccess({ onReset }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center text-center py-12 px-4", children: [_jsx("div", { className: "size-16 rounded-full bg-gradient-peach grid place-items-center mb-4", children: _jsx(CheckCircle2, { className: "size-8 text-primary" }) }), _jsx("h2", { className: "font-display font-bold text-xl", children: "Mensagem enviada!" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-sm", children: "Recebemos sua mensagem e responderemos no e-mail informado em at\u00E9 48 horas \u00FAteis." }), _jsx("button", { type: "button", onClick: onReset, className: "mt-6 text-sm font-semibold text-primary hover:underline", children: "Enviar outra mensagem" })] }));
}
export function ContactMessageForm({ nome, email, assunto, mensagem, enviando, onNomeChange, onEmailChange, onAssuntoChange, onMensagemChange, onSubmit, }) {
    return (_jsxs(_Fragment, { children: [_jsx("h2", { className: "font-display font-bold text-xl mb-1", children: "Envie sua mensagem" }), _jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Preencha o formul\u00E1rio e nossa equipe entrar\u00E1 em contato." }), _jsxs("form", { onSubmit: onSubmit, className: "space-y-4", children: [_jsx(ContactIdentityFields, { nome: nome, email: email, assunto: assunto, onNomeChange: onNomeChange, onEmailChange: onEmailChange, onAssuntoChange: onAssuntoChange }), _jsx(ContactMessageField, { mensagem: mensagem, onMensagemChange: onMensagemChange }), _jsx(ContactSubmitButton, { enviando: enviando })] })] }));
}
