import Container from "@/components/snipets/container";
import { HeroSnipets } from "@/components/snipets/hero-snipet";
import { Intro } from "@/components/snipets/intro";
import { MoreSnipets } from "@/components/snipets/more-snipets";
import { getAllSnipets } from "@/lib/api";

export default function Index() {
  const allSnipets = getAllSnipets();

  const heroSnipets = allSnipets[0];

  const moreSnipets = allSnipets.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <HeroSnipets
          title={heroSnipets.title}
          coverImage={heroSnipets.coverImage}
          date={heroSnipets.date}
          author={heroSnipets.author}
          slug={heroSnipets.slug}
          excerpt={heroSnipets.excerpt}
        />
        {moreSnipets.length > 0 && <MoreSnipets snipets={moreSnipets} />}
      </Container>
    </main>
  );
}