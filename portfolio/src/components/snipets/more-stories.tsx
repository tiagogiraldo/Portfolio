import { Snipet } from "@/interfaces/snipet";
import { SnipetPreview } from "./snipet-preview";

type Props = {
  snipets: Snipet[];
};

export function MoreStories({ snipets }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {snipets.map((snipet) => (
          <SnipetPreview
            key={snipet.slug}
            title={snipet.title}
            coverImage={snipet.coverImage}
            date={snipet.date}
            author={snipet.author}
            slug={snipet.slug}
            excerpt={snipet.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
