import episodes from "@/data/episodes.json";
export async function generateStaticParams() { return episodes.map((ep) => ({ slug: ep.slug })); }
export default function EpisodePage({ params }) {
  const ep = episodes.find((e) => e.slug === params.slug);
  if (!ep) return <div className="container py-12">Episode not found.</div>;
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold">{ep.title}</h1>
      <p className="text-white/70 mt-2 text-sm">Published {ep.date}</p>
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
        <p className="text-white/80">{ep.description}</p>
        <audio controls className="w-full mt-4" src={ep.audio || ""}></audio>
      </div>
      <h2 className="text-2xl font-semibold mt-10">Show notes</h2>
      <ul className="list-disc ml-6 mt-3 space-y-1 text-white/85">
        {ep.notes.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </div>
  );
}
