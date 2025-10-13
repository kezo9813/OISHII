"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HIDDEN_ROUTES = [/^\/unlock/, /^\/cart/, /^\/checkout/, /^\/shop/];

export function StickyShopCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 120;
      setIsVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!pathname) return null;
  if (HIDDEN_ROUTES.some((regex) => regex.test(pathname))) return null;

  return (
    <div className={`sticky-site-cta${isVisible ? " is-visible" : ""}`} aria-label="Shop call to action">
      <div className="sticky-site-cta__inner">
        <span>Bottling next batch in 48 hours</span>
        <Link href="/shop" className="primary-action">
          Shop Now
        </Link>
      </div>
    </div>
  );
}
