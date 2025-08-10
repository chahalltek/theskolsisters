# Vercel Fix
- Your project used a custom **Install Command** `npm install npm run dev`. That makes Vercel try to install packages named `npm`, `run`, and `dev`, pulling in a native module (`inotify`) that fails on Node 22.
- Add this `vercel.json` to enforce sane defaults:
  - `"installCommand": "npm install"`
  - `"buildCommand": "next build"`

## Also recommended
- Pin Node LTS in package.json:
  ```json
  "engines": { "node": "20.x" }
  ```
- Vercel Project → Settings → General:
  - **Root Directory**: `/` (repo root)
  - **Install Command**: leave blank or `npm install`
  - **Build Command**: leave blank or `next build`
