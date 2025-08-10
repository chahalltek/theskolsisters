# Blog (App Router) Pack — Skol Sisters

This pack mounts a Markdown-powered blog at `/blog` using the **App Router**.

## Install
1) Copy these folders/files into your repo:
   - `app/blog/`
   - `lib/posts.js`
   - `content/posts/` (keep as your blog source)
2) Install deps:
   ```bash
   npm install gray-matter remark remark-html
   ```
3) Commit & deploy. Visit `/blog`.

## Authoring
- Add `.md` files to `content/posts/` with frontmatter:
  ```yaml
  ---
  title: "Post title"
  date: "2025-08-10"
  excerpt: "Short summary"
  tags: ["waivers","start-sit"]
  ---
  Markdown body...
  ```
- Each file’s name becomes the slug.

## Notes
- Pages are statically generated via `generateStaticParams()`; re-deploy to publish new posts, or add ISR if you want on-demand updates.
- Styling uses your site's Tailwind. The post page applies `prose prose-invert`; if you don't have typography plugin, it still renders fine.
