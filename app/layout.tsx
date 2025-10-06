import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const navigation = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const metadata: Metadata = {
  title: "OISHII — Modern Yakiniku Sauce",
  description:
    "Placeholder website for a luxury yakiniku sauce brand. White space, black type, and room for storytelling.",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <div className="site-shell">
            <nav>
              <Link href="/" className="brand-mark">
                OISHII
              </Link>
              <ul>
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <div className="site-shell">{children}</div>
        </main>
        <footer>
          <div className="site-shell footer">
            <span>Limited batches. Crafted with intention.</span>
            <span className="subtle-link">© {new Date().getFullYear()} OISHII</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
