## Vercel Domain Setup (theskolsisters.com)
- In Vercel: Project → Settings → Domains → Add `theskolsisters.com` and `www.theskolsisters.com`.
- Registrar DNS:
  - A (apex): `theskolsisters.com` → `76.76.21.21`
  - CNAME (www): `www` → `cname.vercel-dns.com`
- Set `theskolsisters.com` as Primary and redirect `www` → apex.
