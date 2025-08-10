Fix Next.js build: enable @/* path alias + pin Node 20.x for Vercel.

1) Add jsconfig.json (this file) at the repo root.
2) In package.json, add/update:
   "engines": { "node": "20.x" }

Optional: After this, you can import with aliases like:
  import { getAllPosts } from "@/lib/posts";
