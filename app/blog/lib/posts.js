import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'));
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, slug);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug: realSlug,
      title: data.title || realSlug,
      date: data.date || null,
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || null,
      tags: data.tags || [],
      content
    };
  });
  // sort by date desc
  return posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  return {
    slug,
    title: data.title || slug,
    date: data.date || null,
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || null,
    tags: data.tags || [],
    contentHtml
  };
}
