type StaticSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: readonly string[] };

export function StaticContentSections({
  sections,
}: {
  sections: readonly StaticSection[];
}) {
  return sections.map((section, index) => {
    if (section.type === "paragraph") {
      return <p key={index}>{section.text}</p>;
    }

    if (section.type === "heading") {
      return <h2 key={index}>{section.text}</h2>;
    }

    return (
      <ul key={index}>
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  });
}
