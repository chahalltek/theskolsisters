const GH_API = "https://api.github.com";

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function repoInfo() {
  const [owner, repo] = mustEnv("GITHUB_REPO").split("/");
  return {
    owner,
    repo,
    branch: process.env.GITHUB_BRANCH || "main",
    token: mustEnv("GITHUB_TOKEN"),
  };
}

async function gh(method, path, body) {
  const { token } = repoInfo();
  const res = await fetch(`${GH_API}${path}`, {
    method,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`GitHub ${method} ${path} -> ${res.status}: ${t}`);
  }
  return res.json();
}

export async function getFile(path) {
  const { owner, repo, branch } = repoInfo();
  return gh("GET", `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`);
}

export async function listDir(dir) {
  const { owner, repo, branch } = repoInfo();
  return gh("GET", `/repos/${owner}/${repo}/contents/${encodeURIComponent(dir)}?ref=${branch}`);
}

export async function commitFile(path, content, message, sha = null) {
  const { owner, repo, branch } = repoInfo();
  const b64 = Buffer.from(content, "utf8").toString("base64");
  return gh("PUT", `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    message,
    content: b64,
    branch,
    sha: sha || undefined,
  });
}

export async function deleteFile(path, message, sha) {
  const { owner, repo, branch } = repoInfo();
  return gh("DELETE", `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    message,
    sha,
    branch,
  });
}

export function rawFileUrl(path) {
  const { owner, repo, branch } = repoInfo();
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}
