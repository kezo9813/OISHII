export default function ContactPage() {
  return (
    <>
      <section className="page-intro">
        <p className="section-heading">Contact</p>
        <h1 className="section-title">Keep me posted</h1>
        <p className="lead">
          Swap this placeholder with press enquiries, wholesale requests, or private tasting invitations. The form on the right is a scaffold—connect it to your preferred CRM later.
        </p>
      </section>

      <section className="contact-grid">
        <div className="product-card">
          <h2 className="card-title">Direct line</h2>
          <p>
            hello@placeholder.studio
            <br /> +33 · 00 · 00 · 00 · 00
          </p>
          <p className="card-meta">
            Prompt: mention typical response time, preferred languages, or upcoming pop-up tastings.
          </p>
        </div>

        <div className="product-card placeholder-form" role="form" aria-label="Contact form placeholder">
          <h2 className="card-title">Placeholder form</h2>
          <div className="placeholder-field">Name</div>
          <div className="placeholder-field">Email</div>
          <div className="placeholder-textarea">Tell us about your project</div>
          <button type="button" className="primary-action" disabled>
            Submit Later
          </button>
        </div>
      </section>
    </>
  );
}
