import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSnipets, getSnipetBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/components/snipets/container";
import Header from "@/components/snipets/container";
import { SnipetBody } from "@/components/snipets/snipet-body";
import { SnipetHeader } from "@/components/snipets/snipet-header";

export default async function Snipet({ params }: Params) {
  const snipet = getSnipetBySlug(params.slug);

  if (!snipet) {
    return notFound();
  }

  const content = await markdownToHtml(snipet.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-10">
          <SnipetHeader
            title={snipet.title}
            coverImage={snipet.coverImage}
            date={snipet.date}
            author={snipet.author}
          />
          <SnipetBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const snipet = getSnipetBySlug(params.slug);

  if (!snipet) {
    return notFound();
  }

//   const title = `${snipet.title} | Next.js Blog Example with ${CMS_NAME}`;

  const title = `${snipet.title}`;
  return {
    title,
    openGraph: {
      title,
      images: [snipet.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const snipets = getAllSnipets();

  return snipets.map((snipet) => ({
    slug: snipet.slug,
  }));
}