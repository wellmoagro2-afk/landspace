import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "../data";
import { COURSES } from "@/app/catalogo/data";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

// Função para mapear posts para cursos relacionados
function getRelatedCourse(postSlug: string) {
  const mapping: Record<string, string> = {
    "automatizando-analises-r": "transicao-uso-cobertura",
    "scripts-rusle-qgis": "modelagem-perda-solos-rusle",
    "gee-processamento-nuvem": "geoai-monitoramento-historico-landsat",
  };
  
  const courseSlug = mapping[postSlug];
  if (courseSlug) {
    return COURSES.find(c => c.slug === courseSlug);
  }
  return null;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedCourse = getRelatedCourse(slug);

  return (
    <BlogPostClient post={post} relatedCourse={relatedCourse ?? null} />
  );
}
