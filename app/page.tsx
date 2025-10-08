import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero hero-home">
        <div className="hero-copy">
          <p className="eyebrow">Japanese Barbecue Sauce</p>
          <h1>Charred. Glazed. Legendary.</h1>
          <p className="lead">
            OISHII coats sizzling short ribs and smoky mushrooms with a lacquered sheen, fusing umami depth, bright citrus, and a slow-building heat.
          </p>
          <Link href="/shop" className="primary-action">
            Shop Now
          </Link>
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

      <section className="home-highlights">
        <div className="grid">
          <div className="headline-block">
            <p className="section-heading">Why it hits different</p>
            <h2 className="section-title">Culture-forward flavor engineered for the modern table</h2>
            <p className="lead">
              We cold-age tamari, mirin, and charred garlic before finishing with yuzu zest for an edge that plays well with smoky grills and late-night noodles.
            </p>
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
              description: "Brush over ribeye and shiitake before a high-heat sear for a lacquered crust and gentle caramel smoke."
            },
            {
              title: "Finish",
              description: "Drizzle on sizzling yakitori, ramen, or crispy tofu to add a glossy, umami-rich pop right before plating."
            },
            {
              title: "Dip",
              description: "Serve alongside gyoza, fries, or karaage. Stir in chili crunch or citrus for quick customizations."
            }
          ].map((item) => (
            <article className="usage-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="recipes-preview">
        <div className="recipes-preview__intro">
          <p className="section-heading">Recipes</p>
          <h2 className="section-title">From weekday noodles to smoke-filled weekends</h2>
          <p className="lead">
            Browse chef-tested recipes that spotlight OISHII in stir-fries, grilled classics, and bold snacks. Each one is tuned for quick execution and maximum gloss.
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
