import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="container py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/logo-horizontal.svg"   // note: no /public prefix
            alt="The Skol Sisters logo"
            width={140}
            height={28}
            priority
          />
          <span className="font-extrabold tracking-tight text-lg">The Skol Sisters</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/episodes" className="hover:opacity-80">Episodes</Link>
          <Link href="/start-sit" className="hover:opacity-80">Start/Sit</Link>
          <Link href="/blog" className="hover:opacity-80">Blog</Link>
          <Link href="/about" className="hover:opacity-80">About</Link>
        </nav>

        <Link href="/subscribe" className="px-3 py-2 rounded bg-[#FFC62F] text-black font-semibold hover:opacity-90 text-sm">
          Subscribe
        </Link>
      </div>
    </header>
  );
}
