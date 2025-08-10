Fix Next.js build:
1) Add alias support (this zip includes jsconfig.json).
2) Pin Node to 20.x so Vercel uses Node 20 instead of 22.

Commands:
```bash
# from repo root
# 1) add jsconfig.json
unzip ~/Downloads/theskolsisters-alias-node20-patch.zip -d .
git add jsconfig.json

# 2) set engines to Node 20 LTS
# If you have jq:
jq '.engines = (.engines // {}) | .engines.node = "20.x"' package.json > package.tmp && mv package.tmp package.json

# If you don't have jq, edit package.json manually and add:
#   "engines": { "node": "20.x" }

git add package.json
git commit -m "Enable @/* alias via jsconfig.json + pin Node 20.x for Vercel"
git push
```
Then redeploy in Vercel. Make sure Project → Settings → General:
- Root Directory: `/`
- Install Command: (blank) or `npm install`
- Build Command: (blank) or `next build`
- Node.js Version: 20.x
