import Container from "@/components/projects/container";
import { HeroProjects } from "@/components/projects/hero-project";
import { Intro } from "@/components/projects/intro";
import { MoreProjects } from "@/components/projects/more-projects";
import { getAllProjects } from "@/lib/api";

export default function Index() {
  const allProjects = getAllProjects();

  const heroProjects = allProjects[0];

  const moreProjects = allProjects.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <HeroProjects
          title={heroProjects.title}
          coverImage={heroProjects.coverImage}
          date={heroProjects.date}
          author={heroProjects.author}
          slug={heroProjects.slug}
          excerpt={heroProjects.excerpt}
        />
        {moreProjects.length > 0 && <MoreProjects projects={moreProjects} />}
      </Container>
    </main>
  );
}