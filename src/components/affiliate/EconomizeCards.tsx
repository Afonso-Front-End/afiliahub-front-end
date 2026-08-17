import { Wallet, TicketPercent, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { backgroundStyle } from "@/lib/background-style";
import type { SiteContent } from "@/types/cms";

const CARD_ICONS = [Wallet, TicketPercent, TrendingUp];

export function EconomizeCards({ section }: { section: SiteContent["cashback"] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {section.cards.map((card, i) => {
        const Icon = CARD_ICONS[i] ?? Wallet;
        return (
          <Link
            key={card.id}
            to={card.href}
            className="rounded-3xl p-6 group hover:-translate-y-1 transition-transform block shadow-soft"
            style={backgroundStyle(card.background)}
          >
            <div className="size-12 rounded-2xl bg-surface/80 backdrop-blur grid place-items-center mb-4">
              <Icon className="size-5 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg">{card.title}</h3>
            <p className="text-sm text-foreground/70 mt-1.5">{card.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {card.buttonText || "Explorar"}{" "}
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
