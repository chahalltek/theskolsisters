export const metadata = { title: "Admin Login" };

export default function LoginPage() {
  return (
    <div className="container max-w-sm py-16">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form className="mt-6 grid gap-3" method="post" action="/api/admin/login">
        <input className="px-3 py-2 rounded bg-white/10 border border-white/20" name="username" placeholder="Username" required />
        <input className="px-3 py-2 rounded bg-white/10 border border-white/20" name="password" type="password" placeholder="Password" required />
        <button className="px-4 py-2 rounded bg-[color:var(--skol-gold)] text-black font-semibold hover:opacity-90" type="submit">Sign in</button>
      </form>
    </div>
  );
}
