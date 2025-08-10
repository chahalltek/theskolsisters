import Link from "next/link";
import episodes from "@/data/episodes.json";
export default function EpisodesPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold">Episodes</h1>
      <p className="text-white/80 mt-2">Catch up on every Skol Sisters episode.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {episodes.map((ep) => (
          <div key={ep.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col">
            <h3 className="font-semibold">Episode {ep.id}: {ep.title}</h3>
            <p className="text-white/80 mt-2 flex-1">{ep.teaser}</p>
            <Link href={"/episodes/" + ep.slug} className="mt-3 inline-block px-3 py-2 border border-white/20 rounded hover:bg-white/10">Listen</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
