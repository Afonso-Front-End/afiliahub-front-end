import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { StaticPage } from "@/components/affiliate/StaticPage";
export const Route = createFileRoute("/termos")({
    head: () => ({
        meta: [
            { title: "Termos de Uso | AfiliaHub" },
            { name: "description", content: "Termos e condições de uso do AfiliaHub." },
        ],
    }),
    component: TermosPage,
});
function TermosPage() {
    return (_jsx(AppLayout, { children: _jsxs(StaticPage, { title: "Termos de Uso", description: "\u00DAltima atualiza\u00E7\u00E3o: 7 de junho de 2026", children: [_jsx("h2", { children: "1. Aceita\u00E7\u00E3o dos termos" }), _jsx("p", { children: "Ao acessar e utilizar o AfiliaHub, voc\u00EA concorda com estes Termos de Uso. Se n\u00E3o concordar, recomendamos n\u00E3o utilizar a plataforma." }), _jsx("h2", { children: "2. Natureza do servi\u00E7o" }), _jsx("p", { children: "O AfiliaHub \u00E9 um agregador de ofertas e links de afiliados. N\u00E3o somos vendedores diretos dos produtos exibidos. As compras s\u00E3o realizadas nos marketplaces parceiros." }), _jsx("h2", { children: "3. Links de afiliados" }), _jsx("p", { children: "Ao clicar em \"Ver oferta\", voc\u00EA ser\u00E1 redirecionado ao site do parceiro. Podemos receber comiss\u00E3o por indica\u00E7\u00F5es qualificadas, sem custo adicional para voc\u00EA." }), _jsx("h2", { children: "4. Responsabilidades do usu\u00E1rio" }), _jsxs("ul", { children: [_jsx("li", { children: "Utilizar a plataforma de forma l\u00EDcita e \u00E9tica" }), _jsx("li", { children: "Verificar pre\u00E7os, prazos e condi\u00E7\u00F5es diretamente no marketplace antes de comprar" }), _jsx("li", { children: "N\u00E3o tentar burlar sistemas de rastreamento ou seguran\u00E7a" })] }), _jsx("h2", { children: "5. Altera\u00E7\u00F5es" }), _jsx("p", { children: "Reservamo-nos o direito de atualizar estes termos a qualquer momento. Altera\u00E7\u00F5es relevantes ser\u00E3o comunicadas nesta p\u00E1gina." })] }) }));
}
