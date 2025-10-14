import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UrgencyNotice } from "../components/UrgencyNotice";
import { product } from "../data/product";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oishii.site";

export const metadata: Metadata = {
  title: "OIISHI | Charred. Glazed. Legendary.",
  description:
    "Small-batch Japanese barbecue sauce engineered for high-gloss grilling, midnight noodles, and everything in between.",
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    title: "OIISHI — Japanese Barbecue Sauce",
    description:
      "Discover a chef-built tare brewed for lacquered gloss, umami depth, and a clean citrus snap.",
    url: `${siteUrl}/`,
    siteName: "OIISHI",
    images: [
      {
        url: `${siteUrl}/images/hero-steak.jpg`,
        width: 1200,
        height: 900,
        alt: "OIISHI sauce drizzled over a charred steak"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "OIISHI — Charred. Glazed. Legendary.",
    description:
      "Japanese barbecue sauce crafted for obsessive gloss and smoke.",
    images: [`${siteUrl}/images/hero-steak.jpg`]
  }
};

export default function HomePage() {
  const { inventoryCount, nextBatchDate } = product;

  return (
    <>
      <section className="hero hero-home">
        <div className="hero-copy">
          <p className="eyebrow">Japanese Barbecue Sauce</p>
          <h1>Charred. Glazed. Legendary.</h1>
          <p className="lead">
            OIISHI coats sizzling short ribs and smoky mushrooms with a lacquered sheen, fusing umami depth, bright citrus, and a slow-building heat.
          </p>
          <div className="hero-cta-group">
            <Link href="/shop" className="primary-action">
              Shop Now
            </Link>
            <Link href="#why" className="secondary-link hero-secondary">
              Why it hits different →
            </Link>
          </div>
          <div className="hero-badges" aria-label="Product accolades">
            <span>Batch No. 07 · Brewed weekly</span>
            <span>★ 4.9 (2,680 reviews)</span>
          </div>
        </div>
        <div className="hero-visual hero-visual--image">
          <Image
            src="/images/hero-steak.jpg"
            alt="Japanese barbecue sauce drizzled over a grilled steak"
            fill
            priority
            sizes="(min-width: 1024px) 420px, (min-width: 720px) 60vw, 80vw"
            className="hero-visual__image"
          />
        </div>
      </section>

      <UrgencyNotice inventoryCount={inventoryCount} nextBatchDate={nextBatchDate} />

      <div className="home-bridge" aria-label="Quick actions">
        <Link href="#why" className="primary-action primary-action--outline">
          Why It Hits Different
        </Link>
        <Link href="/about#ingredients" className="primary-action primary-action--outline">
          What&apos;s Inside
        </Link>
      </div>

      <section className="home-highlights" id="why">
        <div className="grid">
          <div className="headline-block">
            <p className="section-heading">Why it hits different</p>
            <h2 className="section-title">Culture-forward flavor engineered for the modern table</h2>
            <p className="lead">
              We cold-age tamari, mirin, and charred garlic before finishing with yuzu zest for an edge that plays well with smoky grills and late-night noodles.
            </p>
            <Link href="/about#ingredients" className="secondary-link">
              Explore ingredients →
            </Link>
          </div>
          <ul className="highlight-list">
            {["Triple-fermented soy for velvet umami", "Toasted sesame and ginger aromatics", "Slow-cooked sweetness with a clean burn"].map((item) => (
              <li key={item} className="highlight-item">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="usage-section">
        <p className="section-heading">How to use</p>
        <div className="usage-grid">
          {[
            {
              title: "Marinade",
              description: "Brush over ribeye and shiitake before a high-heat sear for a lacquered crust and gentle caramel smoke.",
              href: "/recipes?use=marinade#results"
            },
            {
              title: "Finish",
              description: "Drizzle on sizzling yakitori, ramen, or crispy tofu to add a glossy, umami-rich pop right before plating.",
              href: "/recipes?use=finishing#results"
            },
            {
              title: "Dip",
              description: "Serve alongside gyoza, fries, or karaage. Stir in chili crunch or citrus for quick customizations.",
              href: "/recipes?use=dip#results"
            }
          ].map((item) => (
            <Link className="usage-card" key={item.title} href={item.href}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <span className="usage-card__cta">Explore recipes →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="recipes-preview">
        <div className="recipes-preview__intro">
          <p className="section-heading">Recipes</p>
          <h2 className="section-title">From weekday noodles to smoke-filled weekends</h2>
          <p className="lead">
            Browse chef-tested recipes that spotlight OIISHI in stir-fries, grilled classics, and bold snacks. Each one is tuned for quick execution and maximum gloss.
          </p>
          <Link href="/recipes" className="subtle-link">
            Explore all recipes →
          </Link>
        </div>
        <div className="recipes-preview__grid">
          {[
            {
              title: "Charred Short Rib Lettuce Cups",
              meta: "Prep 15 · Cook 20",
              href: "/recipes/charred-short-rib"
            },
            {
              title: "Midnight Yaki Udon",
              meta: "Prep 10 · Cook 12",
              href: "/recipes/midnight-yaki-udon"
            },
            {
              title: "Crispy Rice with Glazed Salmon",
              meta: "Prep 20 · Cook 18",
              href: "/recipes/crispy-rice-salmon"
            }
          ].map((recipe) => (
            <article key={recipe.title} className="recipe-card">
              <div className="recipe-card__media" aria-hidden="true" />
              <h3>{recipe.title}</h3>
              <p>{recipe.meta}</p>
              <Link href={recipe.href} className="subtle-link">
                Get recipe →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
