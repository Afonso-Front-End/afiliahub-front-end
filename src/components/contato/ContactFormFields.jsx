import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Send } from "lucide-react";
export const CONTACT_SUBJECTS = [
    "Dúvidas gerais",
    "Suporte a afiliados",
    "Parcerias e marketplaces",
    "Problemas com ofertas",
    "Outro",
];
import { cn } from "@/lib/utils";
const inputClass = "w-full bg-muted rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow";
export function ContactIdentityFields({ nome, email, assunto, onNomeChange, onEmailChange, onAssuntoChange, }) {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "nome", className: "text-sm font-semibold block mb-1.5", children: "Nome" }), _jsx("input", { id: "nome", value: nome, onChange: (e) => onNomeChange(e.target.value), className: inputClass, placeholder: "Seu nome completo" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "text-sm font-semibold block mb-1.5", children: "E-mail" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => onEmailChange(e.target.value), className: inputClass, placeholder: "seu@email.com" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "assunto", className: "text-sm font-semibold block mb-1.5", children: "Assunto" }), _jsx("select", { id: "assunto", value: assunto, onChange: (e) => onAssuntoChange(e.target.value), className: cn(inputClass, "appearance-none cursor-pointer"), children: CONTACT_SUBJECTS.map((subject) => (_jsx("option", { value: subject, children: subject }, subject))) })] })] }));
}
export function ContactMessageField({ mensagem, onMensagemChange, }) {
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [_jsx("label", { htmlFor: "mensagem", className: "text-sm font-semibold", children: "Mensagem" }), _jsxs("span", { className: "text-[10px] text-muted-foreground tabular-nums", children: [mensagem.length, "/500"] })] }), _jsx("textarea", { id: "mensagem", value: mensagem, onChange: (e) => onMensagemChange(e.target.value.slice(0, 500)), rows: 5, className: cn(inputClass, "resize-none"), placeholder: "Descreva sua d\u00FAvida ou solicita\u00E7\u00E3o com o m\u00E1ximo de detalhes..." })] }));
}
export function ContactSubmitButton({ enviando }) {
    return (_jsx("button", { type: "submit", disabled: enviando, className: cn("w-full inline-flex items-center justify-center gap-2 bg-gradient-cta text-primary-foreground rounded-2xl py-3.5 text-sm font-semibold shadow-glow transition-all", enviando ? "opacity-70 cursor-wait" : "hover:scale-[1.01]"), children: enviando ? ("Enviando...") : (_jsxs(_Fragment, { children: ["Enviar mensagem", _jsx(Send, { className: "size-4" })] })) }));
}
