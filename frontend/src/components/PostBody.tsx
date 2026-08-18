/**
 * Minimal renderer for post bodies: blank lines separate blocks, "## " makes a
 * heading and "- " a bullet list. Enough for written articles without pulling
 * in a markdown parser and a sanitiser.
 */
export const PostBody = ({ body }: { body: string }) => {
  const blocks = body.split(/\n{2,}/).filter((block) => block.trim());

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const lines = block.split("\n").filter(Boolean);

        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="list-disc space-y-2 pl-6 text-lg leading-8 text-muted-foreground">
              {lines.map((line, i) => (
                <li key={i}>{line.slice(2)}</li>
              ))}
            </ul>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="pt-4 text-2xl font-semibold">
              {block.slice(3)}
            </h2>
          );
        }

        return (
          <p key={index} className="text-lg leading-8 text-muted-foreground">
            {block}
          </p>
        );
      })}
    </div>
  );
};
