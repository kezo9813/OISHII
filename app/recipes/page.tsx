"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Recipe = {
  id: string;
  title: string;
  product: string;
  protein: string;
  mealType: string;
  occasion: string;
  prep: number;
  cook: number;
  serves: number;
  description: string;
  featured?: boolean;
};

const RECIPES: Recipe[] = [
  {
    id: "charred-short-rib",
    title: "Charred Short Rib Lettuce Cups",
    product: "Original",
    protein: "Beef",
    mealType: "Dinner",
    occasion: "Grilling",
    prep: 15,
    cook: 20,
    serves: 4,
    description: "Caramelized short ribs glossed with OISHII, tucked into crisp lettuce, and finished with pickled scallions.",
    featured: true
  },
  {
    id: "glazed-miso-eggplant",
    title: "Glazed Miso Eggplant",
    product: "Original",
    protein: "Vegetarian",
    mealType: "Dinner",
    occasion: "Meatless Monday",
    prep: 10,
    cook: 25,
    serves: 2,
    description: "Broiled eggplant brushed with miso and OISHII for a sticky, smoky finish.",
    featured: true
  },
  {
    id: "midnight-yaki-udon",
    title: "Midnight Yaki Udon",
    product: "Spicy",
    protein: "Seafood",
    mealType: "Late Night",
    occasion: "Quick & Easy",
    prep: 10,
    cook: 12,
    serves: 2,
    description: "Chewy udon, butter-seared shrimp, and a splash of sauce for a glossy, late-night slurp.",
    featured: true
  },
  {
    id: "crispy-rice-salmon",
    title: "Crispy Rice with Glazed Salmon",
    product: "Original",
    protein: "Seafood",
    mealType: "Appetizer",
    occasion: "Entertaining",
    prep: 20,
    cook: 18,
    serves: 6,
    description: "Crisped rice squares crowned with OISHII-glazed salmon and yuzu mayo.",
    featured: false
  },
  {
    id: "karaage-sliders",
    title: "Karaage Sliders",
    product: "Spicy",
    protein: "Poultry",
    mealType: "Lunch",
    occasion: "Gameday",
    prep: 25,
    cook: 15,
    serves: 8,
    description: "Fried chicken thighs tossed in OISHII sauce, stacked on milk bread with pickled daikon.",
    featured: false
  },
  {
    id: "yuzu-tofu-bowls",
    title: "Yuzu Glazed Tofu Bowls",
    product: "Yuzu",
    protein: "Vegetarian",
    mealType: "Dinner",
    occasion: "Weeknight",
    prep: 15,
    cook: 20,
    serves: 3,
    description: "Crispy tofu cubes glazed with the citrus batch, served over sesame rice and crunchy veg.",
    featured: false
  },
  {
    id: "smokehouse-burnt-ends",
    title: "Smokehouse Burnt Ends",
    product: "Smoked",
    protein: "Beef",
    mealType: "Dinner",
    occasion: "Competition",
    prep: 30,
    cook: 240,
    serves: 6,
    description: "Low-and-slow brisket ends lacquered in sauce, finished with a final flame-kissed glaze.",
    featured: false
  },
  {
    id: "yakitori-skewers",
    title: "OISHII Yakitori Skewers",
    product: "Original",
    protein: "Poultry",
    mealType: "Dinner",
    occasion: "Street Food",
    prep: 20,
    cook: 15,
    serves: 4,
    description: "Char-grilled chicken skewers repeatedly glazed for layers of sheen and smoke.",
    featured: false
  }
];

const ALL_OPTION = "all";

const buildOption = (label: string) => ({
  value: label,
  label
});

export default function RecipesPage() {
  const [productFilter, setProductFilter] = useState(ALL_OPTION);
  const [proteinFilter, setProteinFilter] = useState(ALL_OPTION);
  const [mealFilter, setMealFilter] = useState(ALL_OPTION);
  const [occasionFilter, setOccasionFilter] = useState(ALL_OPTION);

  const productOptions = useMemo(() => [
    { value: ALL_OPTION, label: "All products" },
    ...Array.from(new Set(RECIPES.map((recipe) => recipe.product))).map(buildOption)
  ], []);

  const proteinOptions = useMemo(() => [
    { value: ALL_OPTION, label: "All proteins" },
    ...Array.from(new Set(RECIPES.map((recipe) => recipe.protein))).map(buildOption)
  ], []);

  const mealOptions = useMemo(() => [
    { value: ALL_OPTION, label: "All meal types" },
    ...Array.from(new Set(RECIPES.map((recipe) => recipe.mealType))).map(buildOption)
  ], []);

  const occasionOptions = useMemo(() => [
    { value: ALL_OPTION, label: "All occasions" },
    ...Array.from(new Set(RECIPES.map((recipe) => recipe.occasion))).map(buildOption)
  ], []);

  const filteredRecipes = useMemo(
    () =>
      RECIPES.filter((recipe) => {
        const matchesProduct = productFilter === ALL_OPTION || recipe.product === productFilter;
        const matchesProtein = proteinFilter === ALL_OPTION || recipe.protein === proteinFilter;
        const matchesMeal = mealFilter === ALL_OPTION || recipe.mealType === mealFilter;
        const matchesOccasion = occasionFilter === ALL_OPTION || recipe.occasion === occasionFilter;
        return matchesProduct && matchesProtein && matchesMeal && matchesOccasion;
      }),
    [productFilter, proteinFilter, mealFilter, occasionFilter]
  );

  const featured = useMemo(() => RECIPES.filter((recipe) => recipe.featured), []);

  const resetFilters = () => {
    setProductFilter(ALL_OPTION);
    setProteinFilter(ALL_OPTION);
    setMealFilter(ALL_OPTION);
    setOccasionFilter(ALL_OPTION);
  };

  return (
    <>
      <section className="recipes-hero">
        <p className="section-heading">Recipes</p>
        <h1 className="section-title">Find your next glossy obsession</h1>
        <p className="lead">
          Filter by product, protein, meal type, and occasion to surface recipes tailored to your cook and your crowd.
          Every dish is built around OISHII&apos;s smoky-sweet glaze.
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
              <Link href={`/recipes/${recipe.id}`} className="subtle-link">
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
        <button type="button" className="secondary-action" onClick={resetFilters}>
          Reset filters
        </button>
      </section>

      <section className="recipes-results" aria-live="polite">
        <div className="recipes-results__header">
          <h2 className="section-title">{filteredRecipes.length} recipes</h2>
          <p className="lead">
            Combine multiple filters to dial in exactly what you crave. Try pairing Original with Dinner and Grilling to see summer-ready hits.
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
                <p>{recipe.description}</p>
                <div className="recipes-grid__meta">
                  <span>Product: {recipe.product}</span>
                  <span>{recipe.protein}</span>
                  <span>Prep {recipe.prep}m · Cook {recipe.cook}m · Serves {recipe.serves}</span>
                </div>
                <Link href={`/recipes/${recipe.id}`} className="subtle-link">
                  Get recipe →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
