export default function StartSit({ searchParams }) {
  const ok = searchParams?.ok === "1";
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold">Start/Sit Hotline</h1>
      <p className="text-white/80 mt-2">Tell us your lineup dilemma. We’ll reply with a clear, confident pick—plus the why.</p>
      {ok && <p className="mt-4 p-3 rounded bg-green-600/20 border border-green-600/40 max-w-2xl">Got it! We’ll email you back and may answer on the show.</p>}
      <form className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6 grid gap-4 max-w-2xl" method="post" action="/api/start-sit">
        <input className="px-3 py-2 rounded bg-white/10 border border-white/20 placeholder-white/50" name="email" placeholder="Your email (optional)" type="email" />
        <input className="px-3 py-2 rounded bg-white/10 border border-white/20 placeholder-white/50" name="leagueFormat" placeholder="League format (e.g., PPR, Half-PPR)" />
        <textarea className="px-3 py-2 rounded bg-white/10 border border-white/20 placeholder-white/50 min-h-[120px]" name="question" placeholder="e.g., PPR: Start Addison or Lockett?" required />
        <button className="px-4 py-3 rounded bg-[color:var(--skol-gold)] text-black font-semibold hover:opacity-90" type="submit">Submit</button>
        <p className="text-xs text-white/60">Pro tip: Tag us on social with <span className="text-white font-semibold">#SkolStartSit</span> for a faster shout-out on the pod.</p>
      </form>
    </div>
  );
}
