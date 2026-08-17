import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CategoryGrid } from "./CategoryGrid";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";

export function Categories() {
  const { category, setCategory, scrollTo, notify } = useMarketplace();
  const { content } = useSiteContent();
  const section = content.categories;

  return (
    <section id="categorias" className="mt-10 scroll-mt-28">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-display font-bold text-2xl md:text-3xl">{section.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{section.subtitle}</p>
        </div>
        <Link
          to="/categorias"
          className="inline-flex items-center gap-1.5 text-sm font-semibold bg-surface px-4 py-2 rounded-full shadow-soft hover:shadow-card transition-shadow shrink-0"
        >
          {section.buttonText} <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <CategoryGrid
        items={section.items}
        activeSlug={category}
        onSelect={(slug, name) => {
          setCategory(slug);
          scrollTo("produtos");
          notify(`Categoria: ${name}`);
        }}
      />
    </section>
  );
}
