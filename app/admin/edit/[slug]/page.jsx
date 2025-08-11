"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/md/slug";

export default function EditPost({ params }) {
  const r = useRouter();
  const q = useSearchParams();
  const initialLocation = q.get("location") || "drafts"; // "posts" | "drafts"
  const [loaded, setLoaded] = useState(false);
  const [sha, setSha] = useState("");
  const [location, setLocation] = useState(initialLocation);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(params.slug);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [tags, setTags] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [draft, setDraft] = useState(initialLocation === "drafts");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/post?slug=${params.slug}&location=${initialLocation}`);
      const json = await res.json();
      if (!json?.ok) {
        alert("Failed to load");
        r.push("/admin");
        return;
      }
      setSha(json.sha || "");
      setTitle(json.frontmatter?.title || "");
      setDate(json.frontmatter?.date || new Date().toISOString().slice(0,10));
      setTags(Array.isArray(json.frontmatter?.tags) ? json.frontmatter.tags.join(", ") : "");
      setExcerpt(json.frontmatter?.excerpt || "");
      setDraft(json.frontmatter?.draft === true || initialLocation === "drafts");
      setBody(json.body || "");
      setLoaded(true);
    })();
  }, [params.slug, initialLocation, r]);

  async function save() {
    setSaving(true);
    const toLocation = draft ? "drafts" : "posts";
    const moving = toLocation !== location;
    const payload = {
      slug: slugify(slug),
      title, date,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      excerpt,
      draft,
      body,
      fromLocation: location,
      toLocation,
      move: moving,
      sha,
    };
    const res = await fetch("/api/admin/post", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      alert("Failed: " + (await res.text()));
      return;
    }
    r.push("/admin");
  }

  async function doDelete() {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/admin/post?slug=${slug}&location=${location}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    r.push("/admin");
  }

  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-2xl font-bold">Edit: {params.slug}</h1>

      {!loaded ? <p className="mt-6 text-white/60">Loading…</p> : (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="grid gap-3">
            <input className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Slug" value={slug} onChange={e => setSlug(slugify(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <input className="px-3 py-2 rounded bg-white/10 border border-white/20" type="date" value={date} onChange={e => setDate(e.target.value)} />
              <input className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
            </div>
            <textarea className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Excerpt" rows={3} value={excerpt} onChange={e => setExcerpt(e.target.value)} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={draft} onChange={e => setDraft(e.target.checked)} />
              Save as draft
            </label>

            <div className="rounded border border-white/10 p-3">
              <div className="text-sm text-white/60 mb-2">Body (Markdown)</div>
              <textarea className="w-full h-64 px-3 py-2 rounded bg-white/10 border border-white/20" value={body} onChange={e => setBody(e.target.value)} />
            </div>

            <div className="flex gap-3">
              <button disabled={saving} className="px-3 py-2 rounded bg-[color:var(--skol-gold)] text-black font-semibold hover:opacity-90" onClick={save}>
                {saving ? "Saving…" : "Save"}
              </button>
              <button className="px-3 py-2 rounded border border-red-500/50 text-red-400 hover:bg-red-500/10" onClick={doDelete}>
                Delete
              </button>
            </div>
          </div>

          <div className="rounded border border-white/10 p-3 bg-white/5 overflow-auto">
            <div className="text-sm text-white/60 mb-2">Live Preview</div>
            <article className="prose prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{`# ${title || "Untitled"}

${excerpt ? `> ${excerpt}\n\n` : ""}${body || "_Start writing…_"}`}</ReactMarkdown>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
