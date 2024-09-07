import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/components/projects/container";
import Header from "@/components/projects/container";
import { ProjectBody } from "@/components/projects/project-body";
import { ProjectHeader } from "@/components/projects/project-header";

export default async function Project({ params }: Params) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  const content = await markdownToHtml(project.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-10">
          <ProjectHeader
            title={project.title}
            coverImage={project.coverImage}
            date={project.date}
            author={project.author}
          />
          <ProjectBody content={content} />
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
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

//   const title = `${project.title} | Next.js Blog Example with ${CMS_NAME}`;

  const title = `${project.title}`;
  return {
    title,
    openGraph: {
      title,
      images: [project.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}