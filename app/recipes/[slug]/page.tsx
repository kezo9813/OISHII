import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "../../../components/PrintButton";
import { product } from "../../../data/product";
import { getRecipeBySlug, recipes } from "../../../data/recipes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oishii.site";

type RecipePageProps = {
  params: {
    slug: string;
  };
};

const toTitle = (value: string) => value.replace(/(^|\s)\w/g, (match) => match.toUpperCase());

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export function generateMetadata({ params }: RecipePageProps): Metadata {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) {
    return {
      title: "Recipe not found | OIISHI"
    };
  }

  return {
    title: `${recipe.title} | OIISHI Recipes`,
    description: recipe.description,
    alternates: {
      canonical: `${siteUrl}${recipe.href}`
    },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url: `${siteUrl}${recipe.href}`,
      type: "article"
    }
  };
}

export default function RecipeDetailPage({ params }: RecipePageProps) {
  const recipe = getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <article className="recipe-detail" aria-labelledby="recipe-title">
      <header className="recipe-detail__header">
        <div className="recipe-detail__meta">
          <p className="section-heading">Recipe</p>
          <h1 id="recipe-title" className="section-title">
            {recipe.title}
          </h1>
          <div className="recipe-detail__stats">
            <span>Prep {recipe.prep}m</span>
            <span>Cook {recipe.cook}m</span>
            <span>Serves {recipe.serves}</span>
          </div>
          <div className="recipe-detail__tags">
            {recipe.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="recipe-detail__actions">
            <PrintButton />
            <Link href="/shop" className="primary-action primary-action--outline">
              Shop the sauce
            </Link>
          </div>
        </div>
        <div className="recipe-detail__media">
          <Image
            src="/images/hero-steak.jpg"
            alt={`${recipe.title} plated with OIISHI sauce`}
            fill
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
      </header>

      <section className="recipe-detail__body">
        <p className="lead">{recipe.description}</p>
        <p className="recipe-detail__placeholder">TODO: replace with CMS-powered ingredients and steps.</p>
      </section>

      {recipe.chefTips ? (
        <section className="recipe-detail__tips" aria-label="Chef tips">
          <h2 className="section-title">Chef tips</h2>
          <p>{recipe.chefTips}</p>
        </section>
      ) : null}

      <section className="recipe-detail__try" aria-label="Suggested pairings">
        <h2 className="section-title">Try this with…</h2>
        <div className="recipe-detail__try-grid">
          <Link href="/shop" className="try-card">
            <h3>{product.name}</h3>
            <p>Stock up on the bottle that makes this recipe shine.</p>
          </Link>
          {recipe.pairs.map((pair) => (
            <Link key={pair} href={`/recipes?pair=${pair}`} className="try-card">
              <h3>{toTitle(pair)}</h3>
              <p>Explore more recipes featuring {pair} pairings.</p>
            </Link>
          ))}
        </div>
      </section>

      {recipe.seoLongform ? (
        <section className="recipe-detail__seo">
          <h2 className="section-title">Behind the glaze</h2>
          <p>{recipe.seoLongform}</p>
        </section>
      ) : null}
    </article>
  );
}
