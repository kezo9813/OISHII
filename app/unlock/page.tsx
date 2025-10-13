import type { Metadata } from "next";
import { UnlockForm } from "./UnlockForm";

export const metadata: Metadata = {
  title: "Accès sécurisé — OIISHI",
  description: "Entrez le mot de passe pour accéder au site OIISHI."
};

type UnlockPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function UnlockPage({ searchParams }: UnlockPageProps) {
  const from = searchParams?.from;
  const redirectTo = Array.isArray(from) ? from[0] : from;
  const safeRedirect = redirectTo && redirectTo.startsWith("/") ? redirectTo : "/";

  return (
    <section className="unlock-page" aria-labelledby="unlock-title">
      <div className="unlock-card">
        <p className="section-heading">Authentification</p>
        <h1 id="unlock-title" className="section-title">
          Ce site est protégé par mot de passe
        </h1>
        <p className="lead">
          Merci d&apos;entrer le mot de passe fourni pour accéder à l&apos;expérience complète OIISHI.
        </p>
        <UnlockForm redirectTo={safeRedirect} />
        <p className="unlock-help">Indice&nbsp;: pensez à votre bol préféré.</p>
      </div>
    </section>
  );
}
