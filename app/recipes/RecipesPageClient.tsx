"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { recipes, type Recipe } from "../../data/recipes";

type FilterValue = string;

const ALL_OPTION = "all";

const toTitle = (value: string) => value.replace(/(^|\s)\w/g, (match) => match.toUpperCase());

const optionify = (value: string) => ({ value, label: toTitle(value) });

type FilterState = {
  product: FilterValue;
  protein: FilterValue;
  meal: FilterValue;
  occasion: FilterValue;
  use: FilterValue;
  pair: FilterValue;
  tag: FilterValue;
};

const DEFAULT_FILTERS: FilterState = {
  product: ALL_OPTION,
  protein: ALL_OPTION,
  meal: ALL_OPTION,
  occasion: ALL_OPTION,
  use: ALL_OPTION,
  pair: ALL_OPTION,
  tag: ALL_OPTION
};

const getInitialFilters = (): FilterState => {
  if (typeof window === "undefined") return DEFAULT_FILTERS;
  const params = new URLSearchParams(window.location.search);
  return {
    product: params.get("product") ?? ALL_OPTION,
    protein: params.get("protein") ?? ALL_OPTION,
    meal: params.get("meal") ?? ALL_OPTION,
    occasion: params.get("occasion") ?? ALL_OPTION,
    use: params.get("use")?.toLowerCase() ?? ALL_OPTION,
    pair: params.get("pair") ?? ALL_OPTION,
    tag: params.get("tag") ?? ALL_OPTION
  };
};

const useOptions = Array.from(new Set(recipes.flatMap((recipe) => recipe.uses))).map(optionify);
const pairOptions = Array.from(new Set(recipes.flatMap((recipe) => recipe.pairs))).map(optionify);
const tagOptions = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags))).map((tag) => ({
  value: tag,
  label: tag
}));

const productOptions = Array.from(new Set(recipes.map((recipe) => recipe.product))).map((product) => ({
  value: product,
  label: product
}));

const proteinOptions = Array.from(new Set(recipes.map((recipe) => recipe.protein))).map((protein) => ({
  value: protein,
  label: protein
}));

const mealOptions = Array.from(new Set(recipes.map((recipe) => recipe.mealType))).map((meal) => ({
  value: meal,
  label: meal
}));

const occasionOptions = Array.from(new Set(recipes.map((recipe) => recipe.occasion))).map((occasion) => ({
  value: occasion,
  label: occasion
}));

function matchesFilterValue(value: FilterValue, target: string | string[] | undefined): boolean {
  if (value === ALL_OPTION) return true;
  if (!target) return false;
  if (Array.isArray(target)) {
    return target.includes(value as never);
  }
  return target === value;
}

export default function RecipesPageClient({ siteUrl }: { siteUrl: string }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sharedRecipeId, setSharedRecipeId] = useState<string | null>(null);

  useEffect(() => {
    setFilters(getInitialFilters());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (filters.product !== ALL_OPTION) params.set("product", filters.product);
    if (filters.protein !== ALL_OPTION) params.set("protein", filters.protein);
    if (filters.meal !== ALL_OPTION) params.set("meal", filters.meal);
    if (filters.occasion !== ALL_OPTION) params.set("occasion", filters.occasion);
    if (filters.use !== ALL_OPTION) params.set("use", filters.use);
    if (filters.pair !== ALL_OPTION) params.set("pair", filters.pair);
    if (filters.tag !== ALL_OPTION) params.set("tag", filters.tag);
    const next = params.toString();
    const url = next ? `${window.location.pathname}?${next}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [filters]);

  const filteredRecipes = useMemo(
    () =>
      recipes.filter((recipe) => {
        const matchesProduct = matchesFilterValue(filters.product, recipe.product);
        const matchesProtein = matchesFilterValue(filters.protein, recipe.protein);
        const matchesMeal = matchesFilterValue(filters.meal, recipe.mealType);
        const matchesOccasion = matchesFilterValue(filters.occasion, recipe.occasion);
        const matchesUse = matchesFilterValue(filters.use, recipe.uses);
        const matchesPair = matchesFilterValue(filters.pair, recipe.pairs);
        const matchesTag = matchesFilterValue(filters.tag, recipe.tags);
        return matchesProduct && matchesProtein && matchesMeal && matchesOccasion && matchesUse && matchesPair && matchesTag;
      }),
    [filters]
  );

  const featured = useMemo(() => recipes.filter((recipe) => recipe.featured), []);

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
    window.open(`${recipe.href}?print=1`, "_blank");
  }, []);

  const structuredData = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": recipes.map((recipe) => ({
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

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: structuredData }} />
      <section className="recipes-hero">
        <p className="section-heading">Recipes</p>
        <h1 className="section-title">Find your next glossy obsession</h1>
        <p className="lead">
          Filter by product, protein, meal type, occasion, usage, and pairing to surface recipes tailored to your cook and your crowd.
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
            value={filters.product}
            onChange={(event) => setFilters((prev) => ({ ...prev, product: event.target.value }))}
          >
            {[{ value: ALL_OPTION, label: "All products" }, ...productOptions].map((option) => (
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
            value={filters.protein}
            onChange={(event) => setFilters((prev) => ({ ...prev, protein: event.target.value }))}
          >
            {[{ value: ALL_OPTION, label: "All proteins" }, ...proteinOptions].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="meal-filter">Meal Type</label>
          <select
            id="meal-filter"
            value={filters.meal}
            onChange={(event) => setFilters((prev) => ({ ...prev, meal: event.target.value }))}
          >
            {[{ value: ALL_OPTION, label: "All meal types" }, ...mealOptions].map((option) => (
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
            value={filters.occasion}
            onChange={(event) => setFilters((prev) => ({ ...prev, occasion: event.target.value }))}
          >
            {[{ value: ALL_OPTION, label: "All occasions" }, ...occasionOptions].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="use-filter">Usage</label>
          <select
            id="use-filter"
            value={filters.use}
            onChange={(event) => setFilters((prev) => ({ ...prev, use: event.target.value }))}
          >
            {[{ value: ALL_OPTION, label: "All uses" }, ...useOptions].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="pair-filter">Pairing</label>
          <select
            id="pair-filter"
            value={filters.pair}
            onChange={(event) => setFilters((prev) => ({ ...prev, pair: event.target.value }))}
          >
            {[{ value: ALL_OPTION, label: "All pairings" }, ...pairOptions].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="tag-filter">Highlight</label>
          <select
            id="tag-filter"
            value={filters.tag}
            onChange={(event) => setFilters((prev) => ({ ...prev, tag: event.target.value }))}
          >
            {[{ value: ALL_OPTION, label: "All highlights" }, ...tagOptions].map((option) => (
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
                {recipe.chefTips ? <p className="recipes-grid__tip">Chef tip: {recipe.chefTips}</p> : null}
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
