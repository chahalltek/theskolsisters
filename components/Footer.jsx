import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 mt-16">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/brand/logo-horizontal.svg"
            alt="The Skol Sisters"
            width={120}  // set what you want
            height={24}
            priority
          />
          <span className="text-sm">
            © {new Date().getFullYear()} The Skol Sisters. All rights reserved.
          </span>
        </div>
        {/* ... */}
      </div>
    </footer>
  );
}
