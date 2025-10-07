import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const navigation = [
  { href: "/shop", label: "Shop" },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "About" }
];

const utilityLinks = [
  { href: "/store-locator", label: "Find a Store" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/cart", label: "Cart" }
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
        <div className="site-topbar">
          <div className="announcement-bar" role="status">
            <div className="site-shell announcement-content">
              <span>Free shipping on orders over $35.</span>
              <Link href="/shop">Shop the latest drop →</Link>
            </div>
          </div>
          <header className="site-header">
            <div className="site-shell">
              <div className="nav-row">
                <Link href="/" className="brand-mark" aria-label="OISHII home">
                  OISHII
                </Link>
                <nav aria-label="Primary">
                  <ul className="nav-links">
                    {navigation.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="nav-utility" aria-label="Utility">
                  {utilityLinks.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </header>
        </div>
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
