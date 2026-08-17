import { Link } from "@tanstack/react-router";

export function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; to: string }>;
}) {
  return (
    <div>
      <p className="font-semibold text-sm mb-3">{title}</p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="hover:text-foreground transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
