import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { CategoryItem } from "@/types/cms";
import { CATEGORY_FALLBACK_IMAGES } from "@/data/cms-fallback-images";
import { backgroundStyle } from "@/lib/background-style";
import { sortCmsItemsNewestFirst } from "@/lib/cms-item-sort";

type CategoryGridProps = {
  items: CategoryItem[];
  activeSlug?: string | null;
  variant?: "home" | "page";
  onSelect?: (slug: string, name: string) => void;
};

function CategoryGridCardContent({ category }: { category: CategoryItem }) {
  return (
    <>
      {category.badge && (
        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-foreground/85 text-background px-2.5 py-1 rounded-full backdrop-blur">
          {category.badge}
        </span>
      )}
      <div
        className="aspect-square rounded-2xl overflow-hidden grid place-items-center"
        style={backgroundStyle(category.background)}
      >
        <img
          src={category.imageUrl || CATEGORY_FALLBACK_IMAGES[category.id]}
          alt={category.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <p className="text-center font-semibold text-sm mt-3">{category.name}</p>
    </>
  );
}

function CategoryGridCard({
  category,
  activeSlug,
  variant,
  onSelect,
}: {
  category: CategoryItem;
  activeSlug?: string | null;
  variant: "home" | "page";
  onSelect?: (slug: string, name: string) => void;
}) {
  const cardClass = cn(
    "group relative rounded-3xl p-4 bg-surface shadow-soft hover:shadow-card transition-all hover:-translate-y-1 text-left",
    activeSlug === category.slug && "ring-2 ring-primary",
  );

  if (variant === "page") {
    return (
      <Link
        to="/produtos"
        search={{ categoria: category.slug }}
        className={cardClass}
      >
        <CategoryGridCardContent category={category} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect?.(category.slug, category.name)}
      className={cardClass}
    >
      <CategoryGridCardContent category={category} />
    </button>
  );
}

export function CategoryGrid({
  items,
  activeSlug,
  variant = "home",
  onSelect,
}: CategoryGridProps) {
  const visible = sortCmsItemsNewestFirst(items.filter((cat) => cat.active !== false));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {visible.map((category) => (
        <CategoryGridCard
          key={category.id}
          category={category}
          activeSlug={activeSlug}
          variant={variant}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
