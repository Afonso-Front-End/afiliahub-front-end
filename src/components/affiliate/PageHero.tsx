import type { PageHeroContent } from "@/types/cms";
import { backgroundStyle } from "@/lib/background-style";

export function PageHero({ hero }: { hero: PageHeroContent }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-5 sm:p-8 md:p-10 shadow-soft"
      style={backgroundStyle(hero.background)}
    >
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-surface/60 backdrop-blur px-3 py-1.5 rounded-full">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          {hero.badge}
        </span>
        <h1 className="mt-3 sm:mt-4 font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight">
          {hero.title}
        </h1>
        <p className="mt-2 text-sm md:text-base text-foreground/70">{hero.description}</p>
        <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
          {hero.stats.map((stat) => (
            <div key={stat.id} className="bg-surface/70 backdrop-blur rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 min-w-0">
              <p className="text-xl sm:text-2xl font-display font-extrabold text-primary">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
