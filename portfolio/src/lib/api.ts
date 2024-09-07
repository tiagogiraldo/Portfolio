import { Post } from "@/interfaces/post";
import { Project } from "@/interfaces/project";
import { Snipet } from "@/interfaces/snipet";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}


// ------------------------------------------

const projectsDirectory = join(process.cwd(), "_projects");

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory);
}

export function getProjectBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(projectsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Project;
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    // sort projects by date in descending order
    .sort((project1, project2) => (project1.date > project2.date ? -1 : 1));
  return projects;
}


// -------------------------------------------

const snipetsDirectory = join(process.cwd(), "_snipets");

export function getSnipetSlugs() {
  return fs.readdirSync(snipetsDirectory);
}

export function getSnipetBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(snipetsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Snipet;
}

export function getAllSnipets(): Snipet[] {
  const slugs = getSnipetSlugs();
  const snipets = slugs
    .map((slug) => getSnipetBySlug(slug))
    // sort snipets by date in descending order
    .sort((snipet1, snipet2) => (snipet1.date > snipet2.date ? -1 : 1));
  return snipets;
}