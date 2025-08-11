"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminHome() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/admin/list").then(r => {
      if (r.status === 401) throw new Error("Unauthorized");
      return r.json();
    }).then(setData).catch(e => setErr(String(e)));
  }, []);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/admin/new" className="px-3 py-2 rounded bg-[color:var(--skol-gold)] text-black font-semibold hover:opacity-90 text-sm">New Post</Link>
      </div>

      {err && <p className="text-red-400 mt-4">{err}</p>}

      {!data ? <p className="mt-6 text-white/60">Loading…</p> : (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="font-semibold text-white/80 mb-2">Published</h2>
            <ul className="space-y-2">
              {data.posts?.map(p => (
                <li key={p.slug} className="p-3 rounded border border-white/10 bg-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.title || p.slug}</div>
                    <div className="text-xs text-white/50">{p.date || ""}</div>
                  </div>
                  <Link className="text-[color:var(--skol-gold)] text-sm" href={`/admin/edit/${p.slug}?location=posts`}>Edit</Link>
                </li>
              ))}
              {(!data.posts || data.posts.length === 0) && <li className="text-white/60 text-sm">No posts</li>}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white/80 mb-2">Drafts</h2>
            <ul className="space-y-2">
              {data.drafts?.map(p => (
                <li key={p.slug} className="p-3 rounded border border-white/10 bg-white/5 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.title || p.slug}</div>
                    <div className="text-xs text-white/50">{p.date || ""}</div>
                  </div>
                  <Link className="text-[color:var(--skol-gold)] text-sm" href={`/admin/edit/${p.slug}?location=drafts`}>Edit</Link>
                </li>
              ))}
              {(!data.drafts || data.drafts.length === 0) && <li className="text-white/60 text-sm">No drafts</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
