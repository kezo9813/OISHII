import type { Metadata } from "next";
import ShopPageClient from "./ShopPageClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oishii.site";

export const metadata: Metadata = {
  title: "Shop OIISHI Sauce | Limited Batch Original",
  description:
    "Choose single bottles, tri-packs, or cases of OIISHI Japanese barbecue sauce. Subscribe and save on every limited bottling run.",
  alternates: { canonical: `${siteUrl}/shop` },
  openGraph: {
    title: "Shop OIISHI Sauce",
    description:
      "Limited batches of Japanese barbecue sauce with seven ingredients, no gums, and chef-level gloss.",
    url: `${siteUrl}/shop`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/hero-steak.jpg`,
        width: 1200,
        height: 900,
        alt: "OIISHI sauce glazing grilled short ribs"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop OIISHI",
    description:
      "Grab the latest bottling of OIISHI Japanese barbecue sauce with subscribe + save perks.",
    images: [`${siteUrl}/images/hero-steak.jpg`]
  }
};

export default function ShopPage() {
  return <ShopPageClient siteUrl={siteUrl} />;
}
