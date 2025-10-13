"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type Recipe = {
  id: string;
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
  uses: string[];
  tags: string[];
  chefTip: string;
};

const RECIPES: Recipe[] = [
  {
    id: "charred-short-rib",
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
    uses: ["marinade", "finish"],
    tags: ["Most Loved", "Entertaining"],
    chefTip: "Toss your lettuce with ice water before serving for extra crunch."
  },
  {
    id: "glazed-miso-eggplant",
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
    uses: ["finish", "dip"],
    tags: ["Weeknight", "Vegetarian"],
    chefTip: "Score the flesh in a cross-hatch to help the sauce seep in."
  },
  {
    id: "midnight-yaki-udon",
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
    uses: ["stir-fry", "finish"],
    tags: ["Quick", "Most Loved"],
    chefTip: "Warm the sauce before tossing so it coats evenly without cooling the noodles."
  },
  {
    id: "crispy-rice-salmon",
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
    uses: ["finish", "dip"],
    tags: ["Entertaining"],
    chefTip: "Brush the rice with neutral oil before pan-frying for even browning."
  },
  {
    id: "karaage-sliders",
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
    chefTip: "Double fry the chicken for extra crunch that stands up to the glaze."
  },
  {
    id: "yuzu-tofu-bowls",
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
    uses: ["finish"],
    tags: ["Weeknight", "Vegetarian"],
    chefTip: "Press tofu for 10 minutes so it absorbs more sauce."
  },
  {
    id: "smokehouse-burnt-ends",
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
    uses: ["marinade", "finish"],
    tags: ["Showstopper"],
    chefTip: "Rest the meat covered for 20 minutes so juices redistribute before saucing."
  },
  {
    id: "yakitori-skewers",
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
    uses: ["marinade", "finish"],
    tags: ["Most Loved", "Grilling"],
    chefTip: "Glaze during the final two turns to avoid burning the sugars."
  }
];

const ALL_OPTION = "all";

const toTitle = (value: string) => value.replace(/(^|\s)\w/g, (match) => match.toUpperCase());

const optionify = (value: string) => ({ value, label: toTitle(value) });

type RecipesPageClientProps = {
  siteUrl: string;
};

export default function RecipesPageClient({ siteUrl }: RecipesPageClientProps) {
  const [productFilter, setProductFilter] = useState(ALL_OPTION);
  const [proteinFilter, setProteinFilter] = useState(ALL_OPTION);
  const [mealFilter, setMealFilter] = useState(ALL_OPTION);
  const [occasionFilter, setOccasionFilter] = useState(ALL_OPTION);
  const [useFilter, setUseFilter] = useState(ALL_OPTION);
  const [tagFilter, setTagFilter] = useState(ALL_OPTION);
  const [sharedRecipeId, setSharedRecipeId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const requestedUse = params.get("use");
    if (requestedUse) {
      setUseFilter(requestedUse.toLowerCase());
    }
  }, []);

  const productOptions = useMemo(
    () => [
      { value: ALL_OPTION, label: "All products" },
      ...Array.from(new Set(RECIPES.map((recipe) => recipe.product))).map((product) => ({
        value: product,
        label: product
      }))
    ],
    []
  );

  const proteinOptions = useMemo(
    () => [
      { value: ALL_OPTION, label: "All proteins" },
      ...Array.from(new Set(RECIPES.map((recipe) => recipe.protein))).map((protein) => ({
        value: protein,
        label: protein
      }))
    ],
    []
  );

  const mealOptions = useMemo(
    () => [
      { value: ALL_OPTION, label: "All meal types" },
      ...Array.from(new Set(RECIPES.map((recipe) => recipe.mealType))).map((meal) => ({
        value: meal,
        label: meal
      }))
    ],
    []
  );

  const occasionOptions = useMemo(
    () => [
      { value: ALL_OPTION, label: "All occasions" },
      ...Array.from(new Set(RECIPES.map((recipe) => recipe.occasion))).map((occasion) => ({
        value: occasion,
        label: occasion
      }))
    ],
    []
  );

  const useOptions = useMemo(
    () => [
      { value: ALL_OPTION, label: "All uses" },
      ...Array.from(new Set(RECIPES.flatMap((recipe) => recipe.uses))).map(optionify)
    ],
    []
  );

  const tagOptions = useMemo(
    () => [
      { value: ALL_OPTION, label: "All highlights" },
      ...Array.from(new Set(RECIPES.flatMap((recipe) => recipe.tags))).map((tag) => ({
        value: tag,
        label: tag
      }))
    ],
    []
  );

  const filteredRecipes = useMemo(
    () =>
      RECIPES.filter((recipe) => {
        const matchesProduct = productFilter === ALL_OPTION || recipe.product === productFilter;
        const matchesProtein = proteinFilter === ALL_OPTION || recipe.protein === proteinFilter;
        const matchesMeal = mealFilter === ALL_OPTION || recipe.mealType === mealFilter;
        const matchesOccasion = occasionFilter === ALL_OPTION || recipe.occasion === occasionFilter;
        const matchesUse = useFilter === ALL_OPTION || recipe.uses.includes(useFilter);
        const matchesTag = tagFilter === ALL_OPTION || recipe.tags.includes(tagFilter);
        return matchesProduct && matchesProtein && matchesMeal && matchesOccasion && matchesUse && matchesTag;
      }),
    [productFilter, proteinFilter, mealFilter, occasionFilter, useFilter, tagFilter]
  );

  const featured = useMemo(() => RECIPES.filter((recipe) => recipe.featured), []);

  const resetFilters = () => {
    setProductFilter(ALL_OPTION);
    setProteinFilter(ALL_OPTION);
    setMealFilter(ALL_OPTION);
    setOccasionFilter(ALL_OPTION);
    setUseFilter(ALL_OPTION);
    setTagFilter(ALL_OPTION);
  };

  const handleShare = useCallback(async (recipe: Recipe) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}${recipe.href}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: recipe.title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      setSharedRecipeId(recipe.id);
      window.setTimeout(() => setSharedRecipeId(null), 2000);
    } catch (error) {
      console.error("Share failed", error);
    }
  }, []);

  const handlePrint = useCallback((recipe: Recipe) => {
    if (typeof window === "undefined") return;
    window.open(recipe.href, "_blank");
  }, []);

  const structuredData = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": RECIPES.map((recipe) => ({
          "@type": "Recipe",
          name: recipe.title,
          description: recipe.description,
          prepTime: `PT${recipe.prep}M`,
          cookTime: `PT${recipe.cook}M`,
          totalTime: `PT${recipe.prep + recipe.cook}M`,
          recipeYield: `${recipe.serves} servings`,
          recipeCategory: recipe.mealType,
          recipeCuisine: "Japanese",
          keywords: recipe.tags.join(", "),
          recipeIngredient: ["OIISHI sauce", "Protein of choice", "Fresh herbs"],
          recipeInstructions: [
            "Prep your ingredients and heat your grill or skillet.",
            "Brush with OIISHI sauce, cook to desired doneness, and finish with extra glaze."
          ],
          url: `${siteUrl}${recipe.href}`
        }))
      }),
    [siteUrl]
  );

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: structuredData }} />
      <section className="recipes-hero">
        <p className="section-heading">Recipes</p>
        <h1 className="section-title">Find your next glossy obsession</h1>
        <p className="lead">
          Filter by product, protein, meal type, occasion, and usage to surface recipes tailored to your cook and your crowd.
          Every dish is built around OIISHI&apos;s smoky-sweet glaze.
        </p>
      </section>

      <section className="recipes-featured">
        <div className="recipes-featured__header">
          <h2 className="section-title">Popular right now</h2>
          <p className="lead">Seasonal standouts and community favorites, refreshed weekly.</p>
        </div>
        <div className="recipes-featured__carousel" role="list">
          {featured.map((recipe) => (
            <article key={recipe.id} className="recipes-featured__card" role="listitem">
              <div className="recipes-featured__media" aria-hidden="true" />
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div className="recipes-featured__meta">
                <span>Prep {recipe.prep}m</span>
                <span>Cook {recipe.cook}m</span>
              </div>
              <div className="recipes-featured__tags">
                {recipe.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link href={recipe.href} className="subtle-link">
                View recipe →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="recipes-controls">
        <div className="filter-group">
          <label htmlFor="product-filter">Product</label>
          <select
            id="product-filter"
            value={productFilter}
            onChange={(event) => setProductFilter(event.target.value)}
          >
            {productOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="protein-filter">Protein</label>
          <select
            id="protein-filter"
            value={proteinFilter}
            onChange={(event) => setProteinFilter(event.target.value)}
          >
            {proteinOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="meal-filter">Meal Type</label>
          <select id="meal-filter" value={mealFilter} onChange={(event) => setMealFilter(event.target.value)}>
            {mealOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="occasion-filter">Occasion</label>
          <select
            id="occasion-filter"
            value={occasionFilter}
            onChange={(event) => setOccasionFilter(event.target.value)}
          >
            {occasionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="use-filter">Usage</label>
          <select id="use-filter" value={useFilter} onChange={(event) => setUseFilter(event.target.value)}>
            {useOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="tag-filter">Highlight</label>
          <select id="tag-filter" value={tagFilter} onChange={(event) => setTagFilter(event.target.value)}>
            {tagOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="secondary-action" onClick={resetFilters}>
          Reset filters
        </button>
      </section>

      <section className="recipes-results" aria-live="polite">
        <div className="recipes-results__header">
          <h2 className="section-title">{filteredRecipes.length} recipes</h2>
          <p className="lead">
            Combine filters to dial in exactly what you crave. Try pairing Original with Dinner and Grilling to see summer-ready hits.
          </p>
        </div>
        {filteredRecipes.length === 0 ? (
          <p>No recipes match those filters yet. Clear a filter or check back soon for new drops.</p>
        ) : (
          <div className="recipes-grid">
            {filteredRecipes.map((recipe) => (
              <article key={recipe.id} className="recipes-grid__card">
                <div className="recipes-grid__media" aria-hidden="true" />
                <h3>{recipe.title}</h3>
                <div className="recipes-grid__tags">
                  {recipe.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <p>{recipe.description}</p>
                <div className="recipes-grid__meta">
                  <span>Product: {recipe.product}</span>
                  <span>{recipe.protein}</span>
                  <span>
                    Prep {recipe.prep}m · Cook {recipe.cook}m · Serves {recipe.serves}
                  </span>
                </div>
                <p className="recipes-grid__tip">Chef tip: {recipe.chefTip}</p>
                <div className="recipes-grid__actions">
                  <button type="button" className="ghost-button" onClick={() => handleShare(recipe)}>
                    Share
                  </button>
                  <button type="button" className="ghost-button" onClick={() => handlePrint(recipe)}>
                    Print
                  </button>
                  <Link href={recipe.href} className="secondary-link">
                    Get recipe →
                  </Link>
                </div>
                {sharedRecipeId === recipe.id ? <p className="recipes-grid__feedback">Link ready to share!</p> : null}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="recipes-seo">
        <h2 className="section-title">Master the art of glossy tare at home</h2>
        <p>
          Every recipe on this page is tested by chefs and tuned for the home cook. From weeknight noodle bowls to competition-grade barbecue,
          OIISHI layers smoke, sweetness, and umami without preservatives or fillers. Bookmark this collection, share it with your crew, and check
          back for new drops as we collaborate with grill masters, ramen pop-ups, and izakaya chefs around the world.
        </p>
      </section>
    </>
  );
}
