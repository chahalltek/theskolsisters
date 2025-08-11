export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10">
        <div className="container py-3 flex items-center justify-between">
          <div className="font-bold">Admin</div>
          <form method="post" action="/api/admin/logout">
            <button className="text-sm text-white/70 hover:text-white">Sign out</button>
          </form>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
