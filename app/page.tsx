import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="section-heading">Modern yakiniku sauce</p>
          <h1>White heat. Pure umami.</h1>
          <p className="lead">
            Placeholder storytelling for a limited sauce crafted in small batches. Imagine billowing steam, lacquered grill marks, and a bottle that belongs on a minimalist table.
          </p>
          <Link href="/shop" className="primary-action">
            Placeholder CTA
          </Link>
        </div>
        <div className="placeholder-visual">Hero Visual</div>
      </section>

      <section>
        <p className="section-heading">What to expect</p>
        <div className="grid">
          <h2 className="section-title">Culture meets precision</h2>
          <p className="lead">
            Use this space to hint at sourcing transparency, seasonal batches, and the convivial moments the sauce is built for. Keep copy sharp, visual, and aspirational.
          </p>
        </div>
      </section>

      <section>
        <div className="product-grid">
          {[
            {
              title: "Marinade",
              note: "Let the bottle suggest glossy steaks and smoky vegetables.",
              prompt: "Add a short line about heat meeting sweetness."
            },
            {
              title: "Topping",
              note: "Placeholder for that final lacquer across rice, noodles, or tofu.",
              prompt: "Mention the umami snap in three or four words."
            },
            {
              title: "Dip",
              note: "A reminder that yakiniku rituals are social and generous.",
              prompt: "Invite guests to reach for the bottle first."
            }
          ].map((item) => (
            <article className="product-card" key={item.title}>
              <h3 className="card-title">{item.title}</h3>
              <p>{item.note}</p>
              <p className="card-meta">{item.prompt}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="section-heading">Journal teaser</p>
        <div className="grid">
          <h2 className="section-title">Stories around the grill</h2>
          <p className="lead">
            Reserve room for chef interviews, quick recipes, and cultural dispatches inspired by yakiniku nights. Everything here is placeholder copy so you can write with confidence later.
          </p>
          <div className="product-card">
            <h3 className="card-title">Upcoming article slot</h3>
            <p>
              Imagine a macro shot of a glistening skewer, a splash of bright red accent, and sharp typography. Link readers toward the shop after they finish the story.
            </p>
            <Link href="/shop" className="subtle-link">
              Placeholder link →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
