export const dynamic = "error"; // enforce static, build-time FS

import { getAllPosts } from '../../lib/posts';
import { getPostBySlug } from '../../../lib/posts';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: `${post.title} — Skol Sisters`,
    description: post.excerpt || 'Skol Sisters Blog'
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  return (
    <div className="container py-12 prose prose-invert max-w-3xl">
      <h1 className="!mb-2">{post.title}</h1>
      {post.date && <p className="text-white/60 text-sm">{new Date(post.date).toLocaleDateString()}</p>}
      <div className="mt-6" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  );
}
