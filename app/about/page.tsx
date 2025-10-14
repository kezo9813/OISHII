import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oishii.site";

export const metadata: Metadata = {
  title: "About OIISHI Sauce | Obsessive Craft",
  description:
    "Learn how OIISHI Japanese barbecue sauce is brewed with seven ingredients, cold-aged tamari, and chef-level precision.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "Inside OIISHI",
    description:
      "Explore the craft, ingredients, and tradition behind OIISHI's small-batch Japanese barbecue sauce.",
    url: `${siteUrl}/about`,
    type: "website"
  }
};

const craftSteps = [
  { title: "Cold-aged tamari", description: "Fermented for 21 days, rested, and clarified for velvet umami." },
  { title: "Toasted aromatics", description: "Sesame, garlic, and ginger toasted low so the oils stay bright." },
  { title: "Yuzu flash", description: "Fresh zest folded in at bottling for a clean, citrus lift." }
];

const modernUses = [
  { title: "Marinade", copy: "Brush over wagyu, tofu, or mushrooms to build lacquered crust." },
  { title: "Finish", copy: "Glaze yakitori, ramen, or roasted veg right before plating." },
  { title: "Dip", copy: "Stir with kewpie, chili crisp, or citrus for instant table sauce." }
];

const ingredientBadges = ["Vegan", "No gums", "No preservatives", "Seven ingredients", "Small batch"];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero__copy">
          <p className="section-heading">Our Sauce</p>
          <h1 className="section-title">Every drop engineered for gloss, depth, and smoke.</h1>
          <p className="lead">
            OIISHI is brewed the way chefs wish sauce existed: sharp, slow, obsessive. It honors Japanese tare traditions while chasing
            modern grills, noodle bowls, and midnight experiments.
          </p>
          <div className="about-hero__cta">
            <Link href="/shop" className="primary-action">
              Shop the sauce
            </Link>
            <Link href="/recipes" className="secondary-link">
              Explore recipes →
            </Link>
          </div>
        </div>
        <div className="about-hero__visual" aria-hidden="true">
          <div className="about-hero__video">Watch our story film (2:10)</div>
        </div>
      </section>

      <section className="about-craft">
        <h2 className="section-title">Obsessive craft, start to finish</h2>
        <p className="lead">Three days of prep, three hours of simmer, twenty-one days of cold-aging. We obsess so the pour is effortless.</p>
        <div className="about-craft__grid">
          {craftSteps.map((step) => (
            <article key={step.title} className="about-craft__card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-modern">
        <div className="about-modern__intro">
          <h2 className="section-title">Built for the modern table</h2>
          <p className="lead">From tabletop yakitori to late-night noodles, OIISHI delivers gloss without syrupy sweetness.</p>
        </div>
        <div className="about-modern__grid">
          {modernUses.map((use) => (
            <Link key={use.title} href={`/recipes?use=${use.title.toLowerCase()}`} className="about-modern__card">
              <h3>{use.title}</h3>
              <p>{use.copy}</p>
              <span className="about-modern__cta">See recipes →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="about-tradition">
        <div className="about-tradition__copy">
          <p className="section-heading">A nod to tradition</p>
          <h2 className="section-title">Not a family recipe. A family of flavor traditions.</h2>
          <p>
            We learned from yakitori smoke in Osaka, tare-lacquered ribs in Tokyo, and izakaya counters in Los Angeles. OIISHI respects the
            tare lineage—glaze, grill, repeat—while pushing toward new plates and new palates.
          </p>
          <blockquote>
            &quot;Bachan means grandma and ours means business.&quot;
          </blockquote>
        </div>
        <div className="about-tradition__media" aria-hidden="true">
          <span>Archive image · 1994</span>
        </div>
      </section>

      <section className="about-ingredients" id="ingredients">
        <div className="about-ingredients__intro">
          <h2 className="section-title">Seven ingredients. Zero shortcuts.</h2>
          <p className="lead">No gums, no corn syrup, no preservatives. Just whole ingredients treated with precision.</p>
        </div>
        <ul className="about-ingredients__list">
          <li>
            <span className="ingredient-name">Tamari</span>
            <span className="ingredient-note">Cold-aged, clarified, and rested for velvet umami.</span>
          </li>
          <li>
            <span className="ingredient-name">Black garlic &amp; ginger</span>
            <span className="ingredient-note">Caramel depth with bright aromatics.</span>
          </li>
          <li>
            <span className="ingredient-name">Mirin &amp; rice vinegar</span>
            <span className="ingredient-note">Natural sweetness and balance—never syrupy.</span>
          </li>
          <li>
            <span className="ingredient-name">Yuzu zest</span>
            <span className="ingredient-note">Added at bottling for a sharp citrus snap.</span>
          </li>
        </ul>
        <div className="about-ingredients__badges">
          {ingredientBadges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta__content">
          <h2>Ready to glaze better?</h2>
          <p>
            Join the newsletter for batch drops, behind-the-scenes stories, and recipes crafted by our chef partners. Spin the wheel below and
            score up to 40% off your first order.
          </p>
          <div className="about-cta__actions">
            <Link href="/shop" className="primary-action">
              Shop OIISHI
            </Link>
            <Link href="/recipes" className="secondary-link">
              See how to use it →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
