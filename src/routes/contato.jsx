import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { BackToHomeLink } from "@/components/affiliate/BackToHomeLink";
import { CONTACT_SUBJECTS } from "@/components/contato/ContactFormFields";
import { ContactChannels, ContactFormSuccess, ContactHero, ContactMessageForm, } from "@/components/contato/ContactPageSections";
import { useMarketplace } from "@/context/marketplace-context";
export const Route = createFileRoute("/contato")({
    head: () => ({
        meta: [
            { title: "Contato | AfiliaHub" },
            { name: "description", content: "Entre em contato com a equipe AfiliaHub." },
        ],
    }),
    component: ContatoPage,
});
function ContatoPage() {
    const { notify } = useMarketplace();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [assunto, setAssunto] = useState(CONTACT_SUBJECTS[0]);
    const [mensagem, setMensagem] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nome.trim() || !email.trim() || !mensagem.trim()) {
            notify("Preencha todos os campos do formulário.");
            return;
        }
        setEnviando(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setEnviando(false);
        setEnviado(true);
        notify("Mensagem enviada! Responderemos em até 48h.");
        setNome("");
        setEmail("");
        setAssunto(CONTACT_SUBJECTS[0]);
        setMensagem("");
    };
    return (_jsx(AppLayout, { children: _jsxs("article", { className: "space-y-6", children: [_jsx(BackToHomeLink, {}), _jsx(ContactHero, {}), _jsxs("div", { className: "grid lg:grid-cols-5 gap-6", children: [_jsx(ContactChannels, {}), _jsx("div", { className: "lg:col-span-3 bg-surface rounded-3xl p-6 md:p-8 shadow-soft", children: enviado ? (_jsx(ContactFormSuccess, { onReset: () => setEnviado(false) })) : (_jsx(ContactMessageForm, { nome: nome, email: email, assunto: assunto, mensagem: mensagem, enviando: enviando, onNomeChange: setNome, onEmailChange: setEmail, onAssuntoChange: setAssunto, onMensagemChange: setMensagem, onSubmit: handleSubmit })) })] })] }) }));
}
