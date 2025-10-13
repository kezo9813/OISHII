import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oishii.site";

export const metadata: Metadata = {
  title: "Contact OIISHI",
  description:
    "Reach the OIISHI team for wholesale, press, and partnership inquiries or book a private tasting.",
  alternates: { canonical: `${siteUrl}/contact` }
};

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
            hello@oishii.site
            <br /> +1 (415) 555-0117
          </p>
          <ul className="contact-details">
            <li>Response within 24 hours</li>
            <li>English · 日本語</li>
            <li>Wholesale allocations · press · events</li>
          </ul>
        </div>

        <form
          className="product-card contact-form"
          action="mailto:hello@oishii.site"
          method="post"
          encType="text/plain"
        >
          <h2 className="card-title">Send a note</h2>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="contact-topic">Topic</label>
          <select id="contact-topic" name="topic" defaultValue="wholesale">
            <option value="wholesale">Wholesale / retail</option>
            <option value="press">Press / media</option>
            <option value="events">Events / private tastings</option>
            <option value="general">General question</option>
          </select>
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows={5} required />
          <button type="submit" className="primary-action">
            Send message
          </button>
        </form>
      </section>
    </>
  );
}
