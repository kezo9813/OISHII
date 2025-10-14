export type RecipeTag = "Quick" | "Weeknight" | "Entertaining" | "Most Loved" | "Showstopper";
export type RecipeUse = "finishing" | "marinade" | "dip";
export type RecipePair = "yakitori" | "gyoza" | "noodles" | "grilling" | "snacks" | "rice";

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  href: string;
  product: string;
  protein: string;
  mealType: string;
  occasion: string;
  prep: number;
  cook: number;
  serves: number;
  description: string;
  featured?: boolean;
  uses: RecipeUse[];
  tags: RecipeTag[];
  pairs: RecipePair[];
  chefTips?: string;
  seoLongform?: string;
};

export const recipes: Recipe[] = [
  {
    id: "charred-short-rib",
    slug: "charred-short-rib",
    title: "Charred Short Rib Lettuce Cups",
    href: "/recipes/charred-short-rib",
    product: "Original",
    protein: "Beef",
    mealType: "Dinner",
    occasion: "Grilling",
    prep: 15,
    cook: 20,
    serves: 4,
    description: "Caramelized short ribs glossed with OIISHI, tucked into crisp lettuce, and finished with pickled scallions.",
    featured: true,
    uses: ["marinade", "finishing"],
    tags: ["Most Loved", "Entertaining"],
    pairs: ["yakitori", "grilling", "snacks"],
    chefTips: "Chill the lettuce in ice water so each cup stays crunchy against the warm beef.",
    seoLongform:
      "This grill-friendly lettuce cup balances rich short ribs with bright herbs and a kick of yuzu. The secret is layering OIISHI sauce through every turn on the grill, building lacquer and caramelization before finishing with a final brush for sheen."
  },
  {
    id: "glazed-miso-eggplant",
    slug: "glazed-miso-eggplant",
    title: "Glazed Miso Eggplant",
    href: "/recipes/glazed-miso-eggplant",
    product: "Original",
    protein: "Vegetarian",
    mealType: "Dinner",
    occasion: "Meatless Monday",
    prep: 10,
    cook: 25,
    serves: 2,
    description: "Broiled eggplant brushed with miso and OIISHI for a sticky, smoky finish.",
    featured: true,
    uses: ["finishing", "dip"],
    tags: ["Weeknight", "Most Loved"],
    pairs: ["yakitori", "noodles"],
    chefTips: "Score deeply so the glaze seeps into the eggplant and caramelises evenly.",
    seoLongform:
      "Inspired by Japanese nasu dengaku, this recipe layers aged miso with OIISHI sauce to create a deeply savory glaze. Finish under a high broiler for blistered edges and drizzle any remaining sauce over steamed rice."
  },
  {
    id: "midnight-yaki-udon",
    slug: "midnight-yaki-udon",
    title: "Midnight Yaki Udon",
    href: "/recipes/midnight-yaki-udon",
    product: "Spicy",
    protein: "Seafood",
    mealType: "Late Night",
    occasion: "Quick & Easy",
    prep: 10,
    cook: 12,
    serves: 2,
    description: "Chewy udon, butter-seared shrimp, and a splash of sauce for a glossy, late-night slurp.",
    featured: true,
    uses: ["finishing"],
    tags: ["Quick", "Weeknight"],
    pairs: ["noodles"],
    chefTips: "Warm the sauce in the pan before tossing so it coats without cooling the noodles.",
    seoLongform:
      "Udon noodles become midnight comfort when tossed in butter, garlic, and spicy OIISHI sauce. Keep the wok ripping hot to char the vegetables while the sauce clings and glazes."
  },
  {
    id: "crispy-rice-salmon",
    slug: "crispy-rice-salmon",
    title: "Crispy Rice with Glazed Salmon",
    href: "/recipes/crispy-rice-salmon",
    product: "Original",
    protein: "Seafood",
    mealType: "Appetizer",
    occasion: "Entertaining",
    prep: 20,
    cook: 18,
    serves: 6,
    description: "Crisped rice squares crowned with OIISHI-glazed salmon and yuzu mayo.",
    uses: ["finishing", "dip"],
    tags: ["Entertaining"],
    pairs: ["snacks", "rice"],
    chefTips: "Fry the rice until evenly golden for the perfect crunch-to-glaze ratio.",
    seoLongform:
      "This party-ready bite layers crispy sushi rice, lacquered salmon, and a citrusy mayo. OIISHI's glossy finish ensures every bite looks plated by a chef."
  },
  {
    id: "karaage-sliders",
    slug: "karaage-sliders",
    title: "Karaage Sliders",
    href: "/recipes/karaage-sliders",
    product: "Spicy",
    protein: "Poultry",
    mealType: "Lunch",
    occasion: "Gameday",
    prep: 25,
    cook: 15,
    serves: 8,
    description: "Fried chicken thighs tossed in OIISHI sauce, stacked on milk bread with pickled daikon.",
    uses: ["marinade", "dip"],
    tags: ["Entertaining", "Most Loved"],
    pairs: ["snacks", "grilling"],
    chefTips: "Double fry the chicken so it stays shatteringly crisp under the glaze.",
    seoLongform:
      "These sliders bring festival energy home. Crispy karaage gets dunked in OIISHI sauce for sheen, then layered with quick pickles on pillowy milk bread."
  },
  {
    id: "yuzu-tofu-bowls",
    slug: "yuzu-tofu-bowls",
    title: "Yuzu Glazed Tofu Bowls",
    href: "/recipes/yuzu-tofu-bowls",
    product: "Yuzu",
    protein: "Vegetarian",
    mealType: "Dinner",
    occasion: "Weeknight",
    prep: 15,
    cook: 20,
    serves: 3,
    description: "Crispy tofu cubes glazed with the citrus batch, served over sesame rice and crunchy veg.",
    uses: ["finishing"],
    tags: ["Weeknight"],
    pairs: ["noodles", "rice"],
    chefTips: "Press tofu ahead of time for maximum glaze absorption.",
    seoLongform:
      "For an easy vegetarian dinner, crisp tofu in a skillet and finish with the citrus-forward OIISHI batch. Serve over sesame rice with quick-pickled vegetables."
  },
  {
    id: "smokehouse-burnt-ends",
    slug: "smokehouse-burnt-ends",
    title: "Smokehouse Burnt Ends",
    href: "/recipes/smokehouse-burnt-ends",
    product: "Smoked",
    protein: "Beef",
    mealType: "Dinner",
    occasion: "Competition",
    prep: 30,
    cook: 240,
    serves: 6,
    description: "Low-and-slow brisket ends lacquered in sauce, finished with a final flame-kissed glaze.",
    uses: ["marinade", "finishing"],
    tags: ["Showstopper"],
    pairs: ["grilling"],
    chefTips: "Rest the meat covered so juices redistribute before the final glaze.",
    seoLongform:
      "Competition-style burnt ends become glossy crowd-pleasers with repeated brushes of OIISHI during the final smoke."
  },
  {
    id: "yakitori-skewers",
    slug: "yakitori-skewers",
    title: "OIISHI Yakitori Skewers",
    href: "/recipes/yakitori-skewers",
    product: "Original",
    protein: "Poultry",
    mealType: "Dinner",
    occasion: "Street Food",
    prep: 20,
    cook: 15,
    serves: 4,
    description: "Char-grilled chicken skewers repeatedly glazed for layers of sheen and smoke.",
    uses: ["marinade", "finishing"],
    tags: ["Most Loved", "Entertaining"],
    pairs: ["yakitori", "grilling"],
    chefTips: "Brush on glaze in multiple thin layers for lacquer that doesn't burn.",
    seoLongform:
      "Classic yakitori gets an upgrade with OIISHI sauce—glaze in layers over binchotan or a hot grill for that signature glossy finish."
  }
];

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}
