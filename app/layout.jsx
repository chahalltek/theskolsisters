export const metadata = {
  title: "Skol Sisters",
  description: "Smart, sisterly fantasy football advice—with Skol spirit.",
  metadataBase: new URL("https://theskolsisters.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Skol Sisters",
    description: "Smart, sisterly fantasy football advice—with Skol spirit.",
    url: "https://theskolsisters.com",
    images: ["/og.png"]
  },
  twitter: { card: "summary_large_image", site: "@SkolSisters" }
};

import "./../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
