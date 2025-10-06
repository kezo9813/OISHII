const products = [
  {
    title: "Solo bottle",
    description:
      "Placeholder description for a single 260ml bottle. Highlight rarity, clarity of ingredients, and upcoming batch date.",
    details: [
      "Clean label ingredients",
      "Matte white packaging",
      "Ships fresh, limited run"
    ]
  },
  {
    title: "Trio set",
    description:
      "Three-bottle set for weeknight grills or gifting. Invite copy about rituals, shared tables, and precise heat.",
    details: [
      "Bundle pricing placeholder",
      "Ideal for gatherings",
      "Story card included"
    ]
  },
  {
    title: "Six pack",
    description:
      "Restaurant or collector allocation. Emphasise seasonal releases and numbered batches for a luxury feel.",
    details: [
      "Batch number placeholder",
      "Priority dispatch",
      "Journal access teaser"
    ]
  }
];

export default function ShopPage() {
  return (
    <>
      <section className="page-intro">
        <p className="section-heading">Shop</p>
        <h1 className="section-title">Choose your future drop</h1>
        <p className="lead">
          Everything below is a placeholder. Swap in photography, pricing, and checkout links when the product line is finalised.
        </p>
      </section>

      <section className="product-grid">
        {products.map((product) => (
          <article key={product.title} className="product-card">
            <h2 className="card-title">{product.title}</h2>
            <p>{product.description}</p>
            <ul>
              {product.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <span className="primary-action" aria-disabled="true" role="button">
              Coming Soon
            </span>
          </article>
        ))}
      </section>

      <section>
        <div className="grid">
          <h2 className="section-title">How to frame it</h2>
          <p>
            Use this space to articulate sourcing, pairings, or a suggested ritual. Keep the tone sharp and evocative, with short lines to mirror the product positioning.
          </p>
        </div>
      </section>
    </>
  );
}
