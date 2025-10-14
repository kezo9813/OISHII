export type ProductBadge = "vegan" | "no-preservatives" | "7-ingredients" | "gluten-free" | "small-batch";

export type ProductPair = "yakitori" | "gyoza" | "noodles" | "grilling" | "snacks";

export type ProductUpsell = {
  title: string;
  description: string;
  price: string;
  href: string;
};

export type ProductTestimonial = {
  id: number;
  quote: string;
  handle: string;
};

export type ProductData = {
  name: string;
  sku: string;
  description: string;
  heroImage: string;
  inventoryCount?: number;
  nextBatchDate?: string;
  ingredients: string[];
  badges: ProductBadge[];
  pairs: ProductPair[];
  testimonials: ProductTestimonial[];
  upsells: ProductUpsell[];
  subscribeBenefits: string[];
};

export const product: ProductData = {
  name: "OIISHI Limited Batch Original Sauce",
  sku: "OIISHI-OG-260",
  description:
    "Small-batch Japanese barbecue sauce layered with cold-aged tamari, toasted sesame, and a final flash of yuzu.",
  heroImage: "/images/hero-steak.jpg",
  inventoryCount: 123,
  nextBatchDate: "2024-08-18T18:00:00.000Z",
  ingredients: [
    "Cold-aged tamari",
    "Toasted sesame oil",
    "Black garlic",
    "Yuzu zest",
    "Mirin",
    "Rice vinegar",
    "Sea salt"
  ],
  badges: ["vegan", "no-preservatives", "7-ingredients", "small-batch"],
  pairs: ["yakitori", "gyoza", "noodles", "grilling", "snacks"],
  testimonials: [
    {
      id: 1,
      quote: "Glossiest tare I've ever brushed onto wagyu. Instant umami halo.",
      handle: "@grillandglaze"
    },
    {
      id: 2,
      quote: "Midnight noodles hit different with a spoonful of OIISHI.",
      handle: "@midnightnoodles"
    },
    {
      id: 3,
      quote: "Vegetarian skewers suddenly get seconds. That's the sauce.",
      handle: "@plantbasedhiro"
    }
  ],
  upsells: [
    {
      title: "Limited canvas tote",
      description: "Transport bottles in a heavyweight tote with gloss-black type.",
      price: "$18",
      href: "/shop/tote"
    },
    {
      title: "Smoked Chili Drop",
      description: "Add a 6 oz smoked chili tare for layered heat and sweetness.",
      price: "$14",
      href: "/shop/smoked-chili"
    }
  ],
  subscribeBenefits: ["Skip or cancel anytime", "Early access to limited releases"]
};
