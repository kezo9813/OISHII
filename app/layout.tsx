import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { StickyShopCTA } from "../components/StickyShopCTA";
import { SpinToWinModal } from "../components/SpinToWinModal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const navigation = [
  { href: "/shop", label: "Shop" },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "Our Sauce" },
  { href: "/contact", label: "Contact" }
];

const utilityLinks = [
  { href: "/store-locator", label: "Find a Store" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/cart", label: "Cart" }
];

export const metadata: Metadata = {
  title: "OIISHI — Modern Yakiniku Sauce",
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
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
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
                <nav aria-label="Primary" className="nav-primary">
                  <ul className="nav-links">
                    {navigation.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Link href="/" className="brand-mark" aria-label="OIISHI home">
                  OIISHI
                </Link>
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
        <div className="trust-bar" role="complementary">
          <div className="site-shell trust-bar__inner">
            <span>Encrypted checkout</span>
            <span>48-hour fulfillment</span>
            <span>30-day flavor guarantee</span>
          </div>
        </div>
        <main id="main-content">
          <div className="site-shell">{children}</div>
        </main>
        <footer>
          <div className="site-shell footer">
            <span>Limited batches. Crafted with intention.</span>
            <span className="subtle-link">© {new Date().getFullYear()} OIISHI</span>
          </div>
        </footer>
        <StickyShopCTA />
        <SpinToWinModal />
      </body>
    </html>
  );
}
