import Link from "next/link";

const storySections = [
  {
    eyebrow: "Roots",
    title: "Tradition taught us that flavor is a love language.",
    copy:
      "OISHII began at a crowded family table where lacquered ribs were brushed with OISHII secret glaze.",
    quote: '"OISHII means delicious and ours means business."',
    imageAlt: "Vintage family photo with a grill",
    imageLabel: "Family archives, 1989",
    theme: "warm"
  },
  {
    eyebrow: "Craft",
    title: "Small batches. Overbuilt precision.",
    copy:
      "We ferment tamari, toast sesame seeds, and simmer aromatics in micro-batches before finishing with a flash of yuzu peel. Every bottle is numbered, oxygen-flushed, and sealed within 24 hours to lock in that velvety sheen.",
    quote: '"A tradition of bold, fresh, umami flavor"',
    imageAlt: "Bottling line with sauce being sealed",
    imageLabel: "Batch 07 coming off the line",
    theme: "dark"
  },
  {
    eyebrow: "Community",
    title: "Built for grills, noodles, and midnight experiments.",
    copy:
      "From Tokyo yakitori alleys to pop-up supper clubs in Los Angeles, OISHII travels with chefs, pitmasters, and curious home cooks. Recipes evolve in collaboration with our community, and every drop funds cultural storytelling through our journal.",
    quote: '"Share the bottle, tell the story."',
    imageAlt: "Communal table with friends sharing grilled food",
    imageLabel: "Pop-up supper club, DTLA",
    theme: "light"
  }
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero__copy">
          <p className="section-heading">Our Story</p>
          <h1 className="section-title">From our family fire to your table</h1>
          <p className="lead">
            OISHII is a modern take on a Japanese barbecue heirloom crafted with reverence for the past and engineered for the future of flavor.
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

      {storySections.map((section, index) => (
        <section
          key={section.title}
          className={`about-story ${index % 2 ? "about-story--reverse" : ""} about-story--${section.theme}`}
        >
          <div className="about-story__media" role="img" aria-label={section.imageAlt}>
            <span className="about-story__media-label">{section.imageLabel}</span>
          </div>
          <div className="about-story__content">
            <p className="eyebrow">{section.eyebrow}</p>
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
            <blockquote>{section.quote}</blockquote>
          </div>
        </section>
      ))}

      <section className="about-timeline">
        <h2 className="section-title">Milestones</h2>
        <ul>
          <li>
            <span>2012</span>
            <p>First bottled batch shared with extended family-hand-labeled, wrapped in wax paper.</p>
          </li>
          <li>
            <span>2019</span>
            <p>Chef collective forms to translate the recipe for supper clubs, ramen pop-ups, and market stalls.</p>
          </li>
          <li>
            <span>2024</span>
            <p>Launch of OISHII worldwide with carbon-neutral shipping and journal pairings.</p>
          </li>
        </ul>
      </section>

      <section className="about-cta">
        <div className="about-cta__content">
          <h2>Ready to fire up your grill?</h2>
          <p>
            Join the newsletter for batch drops, behind-the-scenes stories, and recipes crafted by our chef partners.
          </p>
          <div className="about-cta__actions">
            <Link href="/shop" className="primary-action">
              Shop OISHII
            </Link>
            <Link href="/contact" className="secondary-link">
              Contact us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
