export default function AboutPage() {
  return (
    <>
      <section className="page-intro">
        <p className="section-heading">About</p>
        <h1 className="section-title">An origin in progress</h1>
        <p className="lead">
          Use this page to narrate the recipe’s heritage, ingredient sourcing, and the artisans behind each batch. Everything here is placeholder copy awaiting your final words.
        </p>
      </section>

      <section className="grid">
        <article className="product-card">
          <h2 className="card-title">Culturally rooted</h2>
          <p>
            Reserve paragraphs for the ritual of yakiniku, the glow of the grill, and why this sauce wants to be poured with intent. Think short, evocative sentences that paint scenes.
          </p>
          <p className="card-meta">Prompt: mention the convivial fire, the stainless tongs, the first sear.</p>
        </article>
        <article className="product-card">
          <h2 className="card-title">Modern craft</h2>
          <p>
            Outline the clean label promise, the balance of sweetness, smoke, and heat, and the discipline behind small-batch bottling. The goal: show precision and luxury.
          </p>
          <p className="card-meta">Prompt: reference mirin, rice vinegar, ginger, and time.</p>
        </article>
        <article className="product-card">
          <h2 className="card-title">Future timeline</h2>
          <p>
            Sketch the roadmap—seasonal drops, collaborations, journal features. Keep it aspirational so readers know the bottle is a collectible object, not a commodity.
          </p>
          <p className="card-meta">Prompt: hint at limited releases, numbered caps, and tasting notes.</p>
        </article>
      </section>
    </>
  );
}
