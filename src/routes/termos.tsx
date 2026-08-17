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
  return (
    <AppLayout>
      <StaticPage
        title="Termos de Uso"
        description="Última atualização: 7 de junho de 2026"
      >
        <h2>1. Aceitação dos termos</h2>
        <p>
          Ao acessar e utilizar o AfiliaHub, você concorda com estes Termos de Uso. Se não concordar,
          recomendamos não utilizar a plataforma.
        </p>
        <h2>2. Natureza do serviço</h2>
        <p>
          O AfiliaHub é um agregador de ofertas e links de afiliados. Não somos vendedores diretos
          dos produtos exibidos. As compras são realizadas nos marketplaces parceiros.
        </p>
        <h2>3. Links de afiliados</h2>
        <p>
          Ao clicar em &quot;Ver oferta&quot;, você será redirecionado ao site do parceiro. Podemos
          receber comissão por indicações qualificadas, sem custo adicional para você.
        </p>
        <h2>4. Responsabilidades do usuário</h2>
        <ul>
          <li>Utilizar a plataforma de forma lícita e ética</li>
          <li>Verificar preços, prazos e condições diretamente no marketplace antes de comprar</li>
          <li>Não tentar burlar sistemas de rastreamento ou segurança</li>
        </ul>
        <h2>5. Alterações</h2>
        <p>
          Reservamo-nos o direito de atualizar estes termos a qualquer momento. Alterações relevantes
          serão comunicadas nesta página.
        </p>
      </StaticPage>
    </AppLayout>
  );
}
