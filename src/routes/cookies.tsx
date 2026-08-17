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
  return (
    <AppLayout>
      <StaticPage
        title="Política de Cookies"
        description="Última atualização: 7 de junho de 2026"
      >
        <h2>O que são cookies?</h2>
        <p>
          Cookies são pequenos arquivos armazenados no seu navegador que ajudam o site a funcionar,
          lembrar preferências e entender como você interage com nossas páginas.
        </p>
        <h2>Tipos de cookies que usamos</h2>
        <ul>
          <li>
            <strong>Essenciais:</strong> necessários para navegação, segurança e funcionamento básico
          </li>
          <li>
            <strong>Funcionais:</strong> lembram favoritos, filtros e preferências de exibição
          </li>
          <li>
            <strong>Analíticos:</strong> medem tráfego e desempenho de ofertas (dados agregados)
          </li>
          <li>
            <strong>De afiliados:</strong> rastreiam cliques para atribuição correta de comissão nos
            parceiros
          </li>
        </ul>
        <h2>Como gerenciar</h2>
        <p>
          Você pode bloquear ou apagar cookies nas configurações do seu navegador. Isso pode afetar
          funcionalidades como favoritos e rastreamento de cashback.
        </p>
        <h2>Contato</h2>
        <p>
          Dúvidas sobre cookies? Escreva para contato@afiliahub.com.br.
        </p>
      </StaticPage>
    </AppLayout>
  );
}
