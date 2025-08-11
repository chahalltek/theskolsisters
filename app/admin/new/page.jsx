"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/md/slug";

export default function NewPostPage() {
  const r = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [tags, setTags] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [draft, setDraft] = useState(true);
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  function onTitleChange(v) {
    setTitle(v);
    if (!slug) setSlug(slugify(v));
  }

  async function save() {
    setSaving(true);
    const payload = {
      title, slug: slug || slugify(title), date,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      excerpt, draft,
      body,
      location: draft ? "drafts" : "posts",
    };
    const res = await fetch("/api/admin/post", {
      method: "POST",
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

  async function uploadImage(file) {
    const fd = new FormData();
    fd.set("file", file);
    fd.set("name", file.name.replace(/\.[^.]+$/, ""));
    const res = await fetch("/api/admin/image-upload", { method: "POST", body: fd });
    const json = await res.json();
    if (json?.url) {
      setImgUrl(json.url);
      // insert markdown image syntax
      setBody(prev => `${prev}\n\n![${file.name}](${json.url})\n`);
    } else {
      alert("Upload failed");
    }
  }

  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-2xl font-bold">New Post</h1>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="grid gap-3">
          <input className="px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Title" value={title} onChange={e => onTitleChange(e.target.value)} />
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
            <div className="mt-3">
              <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} />
              {imgUrl && <div className="text-xs text-white/60 mt-1">Last uploaded: {imgUrl}</div>}
            </div>
          </div>

          <div className="flex gap-3">
            <button disabled={saving} className="px-3 py-2 rounded bg-[color:var(--skol-gold)] text-black font-semibold hover:opacity-90" onClick={save}>
              {saving ? "Saving…" : "Save"}
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
    </div>
  );
}
