import Intro from "@/components/intro";
import {MDXRemote} from 'next-mdx-remote'

export default function Home() {
    const content =`
      #This is marksown content
    `

  return (
    <section className="py-24">
      <div className="container max-w-3xl">
        <Intro/>

      </div>
    </section>

  );
}
