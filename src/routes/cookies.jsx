import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { StaticPage } from "@/components/affiliate/StaticPage";
export const Route = createFileRoute("/cookies")({
    head: () => ({
        meta: [
            { title: "Política de Cookies | AfiliaHub" },
            { name: "description", content: "Entenda como o AfiliaHub utiliza cookies." },
        ],
    }),
    component: CookiesPage,
});
function CookiesPage() {
    return (_jsx(AppLayout, { children: _jsxs(StaticPage, { title: "Pol\u00EDtica de Cookies", description: "\u00DAltima atualiza\u00E7\u00E3o: 7 de junho de 2026", children: [_jsx("h2", { children: "O que s\u00E3o cookies?" }), _jsx("p", { children: "Cookies s\u00E3o pequenos arquivos armazenados no seu navegador que ajudam o site a funcionar, lembrar prefer\u00EAncias e entender como voc\u00EA interage com nossas p\u00E1ginas." }), _jsx("h2", { children: "Tipos de cookies que usamos" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Essenciais:" }), " necess\u00E1rios para navega\u00E7\u00E3o, seguran\u00E7a e funcionamento b\u00E1sico"] }), _jsxs("li", { children: [_jsx("strong", { children: "Funcionais:" }), " lembram favoritos, filtros e prefer\u00EAncias de exibi\u00E7\u00E3o"] }), _jsxs("li", { children: [_jsx("strong", { children: "Anal\u00EDticos:" }), " medem tr\u00E1fego e desempenho de ofertas (dados agregados)"] }), _jsxs("li", { children: [_jsx("strong", { children: "De afiliados:" }), " rastreiam cliques para atribui\u00E7\u00E3o correta de comiss\u00E3o nos parceiros"] })] }), _jsx("h2", { children: "Como gerenciar" }), _jsx("p", { children: "Voc\u00EA pode bloquear ou apagar cookies nas configura\u00E7\u00F5es do seu navegador. Isso pode afetar funcionalidades como favoritos e rastreamento de cashback." }), _jsx("h2", { children: "Contato" }), _jsx("p", { children: "D\u00FAvidas sobre cookies? Escreva para contato@afiliahub.com.br." })] }) }));
}
