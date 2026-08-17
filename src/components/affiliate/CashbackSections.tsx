import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { PageCashbackContent } from "@/types/cms";

export function CashbackHowItWorks({ pageContent }: { pageContent: PageCashbackContent }) {
  return (
    <section className="bg-surface rounded-3xl p-6 md:p-8 shadow-soft">
      <h2 className="font-display font-bold text-2xl mb-6">{pageContent.howItWorksTitle}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {pageContent.howItWorks.map((item) => (
          <div key={item.id} className="relative">
            <span className="font-display font-extrabold text-4xl text-primary/20">{item.step}</span>
            <h3 className="font-display font-bold text-lg mt-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5">{item.desc}</p>
          </div>
        ))}
      </div>
      <Link
        to="/produtos"
        className="mt-8 inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground rounded-2xl px-6 py-3 text-sm font-semibold shadow-glow hover:scale-[1.01] transition-transform"
      >
        {pageContent.ctaText}
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}
