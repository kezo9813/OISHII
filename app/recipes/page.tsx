import type { Metadata } from "next";
import RecipesPageClient from "./RecipesPageClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oishii.site";

export const metadata: Metadata = {
  title: "OIISHI Recipes | Glossy Ideas for Every Meal",
  description:
    "Filter chef-tested recipes by protein, meal type, occasion, and usage to get the most out of OIISHI Japanese barbecue sauce.",
  alternates: { canonical: `${siteUrl}/recipes` },
  openGraph: {
    title: "OIISHI Recipes",
    description:
      "Discover grilling hits, weeknight noodles, and vegetarian dishes designed for OIISHI sauce.",
    url: `${siteUrl}/recipes`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "OIISHI Recipe Library",
    description: "Chef-led recipes that showcase how to glaze, marinate, and finish with OIISHI."
  }
};

export default function RecipesPage() {
  return <RecipesPageClient siteUrl={siteUrl} />;
}
