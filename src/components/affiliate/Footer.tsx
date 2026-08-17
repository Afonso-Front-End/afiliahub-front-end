import { Link } from "@tanstack/react-router";
import { Zap, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { FooterLinkColumn } from "@/components/affiliate/FooterLinkColumn";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";

const SOCIAL = [
  { Icon: Instagram, name: "Instagram", url: "https://instagram.com" },
  { Icon: Twitter, name: "Twitter", url: "https://twitter.com" },
  { Icon: Facebook, name: "Facebook", url: "https://facebook.com" },
  { Icon: Youtube, name: "YouTube", url: "https://youtube.com" },
];

const LOJA_LINKS = [
  { label: "Todos os produtos", to: "/produtos" as const },
  { label: "Todas as categorias", to: "/categorias" as const },
];

const EMPRESA_LINKS = [
  { label: "Sobre", to: "/sobre" as const },
  { label: "Cashback & Cupons", to: "/cashback" as const },
  { label: "Contato", to: "/contato" as const },
  { label: "Blog", to: "/blog" as const },
];

const LEGAL_LINKS = [
  { label: "Termos", to: "/termos" as const },
  { label: "Privacidade", to: "/privacidade" as const },
  { label: "Cookies", to: "/cookies" as const },
];

export function Footer() {
  const { notify } = useMarketplace();
  const { content } = useSiteContent();
  const footer = content.footer;

  return (
    <footer className="mt-8 sm:mt-12 bg-surface rounded-3xl p-5 sm:p-8 shadow-soft">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
        <div className="sm:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 w-fit hover:opacity-80 transition-opacity">
            <div className="size-10 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow">
              <Zap className="size-5 text-primary-foreground" fill="currentColor" />
            </div>
            <p className="font-display font-extrabold text-lg">AfiliaHub</p>
          </Link>
          <p className="text-sm text-muted-foreground mt-3 max-w-sm">{footer.description}</p>
          <div className="flex gap-2 mt-4">
            {SOCIAL.map(({ Icon, name, url }) => (
              <button
                key={name}
                onClick={() => {
                  window.open(url, "_blank", "noopener,noreferrer");
                  notify(`Abrindo ${name}…`);
                }}
                className="size-10 grid place-items-center rounded-2xl bg-muted hover:bg-accent transition-colors"
                aria-label={name}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>
        <FooterLinkColumn title="Loja" links={LOJA_LINKS} />
        <FooterLinkColumn title="Empresa" links={EMPRESA_LINKS} />
        <FooterLinkColumn title="Legal" links={LEGAL_LINKS} />
      </div>
      <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
        <p>{footer.copyright}</p>
        <p>{footer.tagline}</p>
      </div>
    </footer>
  );
}
