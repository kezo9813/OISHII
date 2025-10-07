"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const PACK_OPTIONS = [
  {
    id: "solo",
    label: "Single Bottle",
    price: 18,
    description: "Perfect for first pours and gifting a fellow grill obsessive.",
    badge: "New"
  },
  {
    id: "trio",
    label: "3-Pack",
    price: 48,
    description: "Our most popular bundle for weeknight cooks and weekend hosts.",
    badge: "Most Popular"
  },
  {
    id: "case",
    label: "6-Pack",
    price: 90,
    description: "Best value for restaurants, supper clubs, or the seriously hooked.",
    badge: "Best Value"
  }
] as const;

const SUBSCRIPTION_DISCOUNT = 0.15;

const FREQUENCIES = [
  { value: "14", label: "Every 2 weeks" },
  { value: "30", label: "Every 30 days" },
  { value: "60", label: "Every 2 months" },
  { value: "90", label: "Every 3 months" }
] as const;

const REVIEWS = [
  {
    id: 1,
    name: "Mai L.",
    rating: 5,
    title: "Instant flavor bomb",
    body:
      "One brush of OISHII turned grilled short ribs into a glossy, caramelized showpiece. Perfect balance of sweet heat.",
    date: "May 2024"
  },
  {
    id: 2,
    name: "Chris T.",
    rating: 4,
    title: "Weeknight hero",
    body:
      "Tossed ramen noodles with it, added seared mushrooms, and dinner was done in 10. Could use a touch more citrus for me personally.",
    date: "April 2024"
  },
  {
    id: 3,
    name: "Hana S.",
    rating: 5,
    title: "Subscribers, do it",
    body:
      "The subscription keeps me stocked without thinking about reorders. I go through bottles fast because every friend asks for a taste.",
    date: "March 2024"
  }
];

export default function ShopPage() {
  const [selectedPack, setSelectedPack] = useState<(typeof PACK_OPTIONS)[number]["id"]>(PACK_OPTIONS[1].id);
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscribe">("one-time");
  const [frequency, setFrequency] = useState<typeof FREQUENCIES[number]["value"]>(FREQUENCIES[1].value);
  const [reviewSort, setReviewSort] = useState("recent");
  const [ratingFilter, setRatingFilter] = useState("all");

  const pack = useMemo(
    () => PACK_OPTIONS.find((item) => item.id === selectedPack) ?? PACK_OPTIONS[0],
    [selectedPack]
  );

  const oneTimePrice = pack.price;
  const subscriptionPrice = useMemo(() => {
    const discounted = oneTimePrice * (1 - SUBSCRIPTION_DISCOUNT);
    return Math.round(discounted * 100) / 100;
  }, [oneTimePrice]);

  const formattedOneTimePrice = `$${oneTimePrice.toFixed(2)}`;
  const formattedSubscriptionPrice = `$${subscriptionPrice.toFixed(2)}`;
  const savingsLabel = `${Math.round(SUBSCRIPTION_DISCOUNT * 100)}%`;

  const sortedReviews = useMemo(() => {
    const list = [...REVIEWS];
    if (reviewSort === "recent") {
      return list;
    }
    if (reviewSort === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [reviewSort]);

  const displayedReviews = useMemo(() => {
    if (ratingFilter === "all") {
      return sortedReviews;
    }
    const rating = Number(ratingFilter);
    return sortedReviews.filter((review) => review.rating === rating);
  }, [ratingFilter, sortedReviews]);

  return (
    <>
      <section className="product-hero">
        <div className="product-viewer">
          <div className="product-visual" role="img" aria-label="OISHII sauce bottle in motion">
            <div className="product-visual__future">360° experience loading soon</div>
          </div>
          <div className="product-visual__note">
            Scroll-triggered rotation coming soon. We designed this space to host an interactive 3D render or video loop.
          </div>
        </div>
        <aside className="product-summary" aria-labelledby="product-title">
          <p className="section-heading">OISHII Japanese Barbecue Sauce</p>
          <h1 id="product-title" className="product-title">
            Limited Batch Original
          </h1>
          <div className="product-rating">
            <span aria-hidden="true">★★★★★</span>
            <span>
              4.9 out of 5 stars <span className="product-rating__meta">(2,680+ reviews)</span>
            </span>
          </div>
          <p className="product-subtitle">
            Smoky-sweet lacquer built for yakiniku nights, midnight noodles, and every crispy bite between.
          </p>

          <div className="purchase-module">
            <fieldset className="purchase-switch" aria-label="Purchase type">
              <legend className="sr-only">Choose purchase type</legend>
              <label className={purchaseType === "one-time" ? "is-active" : ""}>
                <input
                  type="radio"
                  name="purchase-type"
                  value="one-time"
                  checked={purchaseType === "one-time"}
                  onChange={() => setPurchaseType("one-time")}
                />
                <span>One-time · {formattedOneTimePrice}</span>
              </label>
              <label className={purchaseType === "subscribe" ? "is-active" : ""}>
                <input
                  type="radio"
                  name="purchase-type"
                  value="subscribe"
                  checked={purchaseType === "subscribe"}
                  onChange={() => setPurchaseType("subscribe")}
                />
                <span>Subscribe &amp; Save {savingsLabel} · {formattedSubscriptionPrice}</span>
              </label>
            </fieldset>

            <fieldset className="pack-options">
              <legend>Choose your pack</legend>
              {PACK_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`pack-option ${selectedPack === option.id ? "is-active" : ""}`}
                >
                  <input
                    type="radio"
                    name="pack"
                    value={option.id}
                    checked={selectedPack === option.id}
                    onChange={() => setSelectedPack(option.id)}
                  />
                  <div className="pack-option__header">
                    <span>{option.label}</span>
                    <span className="pack-option__price">${option.price.toFixed(2)}</span>
                  </div>
                  <p>{option.description}</p>
                  {option.badge ? <span className="pack-option__badge">{option.badge}</span> : null}
                </label>
              ))}
            </fieldset>

            {purchaseType === "subscribe" ? (
              <div className="subscription-details">
                <label htmlFor="frequency">Delivery frequency</label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(event) =>
                    setFrequency(event.target.value as (typeof FREQUENCIES)[number]["value"])
                  }
                >
                  {FREQUENCIES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ul className="subscription-perks">
                  <li>✔ Save {savingsLabel} on every drop</li>
                  <li>✔ Free shipping on subscription orders</li>
                  <li>✔ Pause or cancel anytime</li>
                </ul>
              </div>
            ) : null}

            <button type="button" className="primary-action primary-action--wide">
              {purchaseType === "subscribe" ? "Subscribe &amp; Save" : "Add to Cart"}
            </button>
            <p className="purchase-note">Ships cold from California. Carbon-neutral delivery.</p>
          </div>
        </aside>
      </section>

      <section className="product-info">
        <div>
          <h2 className="section-title">Built for obsessive glazing</h2>
          <p className="lead">
            Cold-aged tamari, aromatic ginger, and a raisin-like sweetness from mirin create depth, while smoked onions and yuzu brighten each bite.
          </p>
          <ul className="info-list">
            <li>Small-batch brewed · bottled within 24 hours</li>
            <li>Only 7 ingredients · no artificial preservatives</li>
            <li>Pairs with beef, poultry, seafood, tofu, and vegetables</li>
          </ul>
        </div>
        <div className="usage-ideas">
          <h3>How to Use / Pair With</h3>
          <ul>
            <li>Marinate wagyu, portobello caps, or cauliflower steaks before grilling</li>
            <li>Glaze yakitori, broiled salmon, or crispy tofu in the final minute</li>
            <li>Stir into fried rice, yakisoba, or roasted vegetables for instant umami</li>
            <li>Mix with mayo or chili crunch for a quick dipping sauce</li>
          </ul>
        </div>
      </section>

      <section className="product-recipes">
        <div className="recipes-header">
          <p className="section-heading">Recipes using OISHII</p>
          <h2 className="section-title">Put it to work tonight</h2>
          <p className="lead">
            These chef-developed recipes spotlight the sauce across proteins, vegetables, and snacks. Tap through for step-by-steps.
          </p>
        </div>
        <div className="recipes-carousel" role="list">
          {[{
            title: "Charred Short Rib Lettuce Cups",
            tag: "Most Loved",
            href: "/recipes/charred-short-rib",
            time: "Cook 20 min"
          }, {
            title: "Glazed Miso Eggplant",
            tag: "Vegetarian",
            href: "/recipes/glazed-miso-eggplant",
            time: "Cook 25 min"
          }, {
            title: "Midnight Yaki Udon",
            tag: "Quick",
            href: "/recipes/midnight-yaki-udon",
            time: "Cook 12 min"
          }, {
            title: "Crispy Rice with Salmon",
            tag: "Entertaining",
            href: "/recipes/crispy-rice-salmon",
            time: "Cook 18 min"
          }].map((recipe) => (
            <article key={recipe.title} className="carousel-card" role="listitem">
              <div className="carousel-card__media" aria-hidden="true" />
              <span className="carousel-card__tag">{recipe.tag}</span>
              <h3>{recipe.title}</h3>
              <p>{recipe.time}</p>
              <Link href={recipe.href} className="subtle-link">
                Get recipe →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="reviews">
        <div className="reviews-header">
          <h2 className="section-title">Customer Reviews</h2>
          <p className="lead">Trusted by thousands of home cooks, pitmasters, and midnight snackers.</p>
        </div>
        <div className="reviews-controls">
          <label htmlFor="review-sort" className="sr-only">
            Sort reviews
          </label>
          <select
            id="review-sort"
            value={reviewSort}
            onChange={(event) => setReviewSort(event.target.value)}
          >
            <option value="recent">Most recent</option>
            <option value="rating">Highest rating</option>
          </select>
          <label htmlFor="rating-filter" className="sr-only">
            Filter by rating
          </label>
          <select
            id="rating-filter"
            value={ratingFilter}
            onChange={(event) => setRatingFilter(event.target.value)}
          >
            <option value="all">All ratings</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
          </select>
          <button type="button" className="secondary-action">
            Write a review
          </button>
        </div>
        <div className="reviews-list">
          {displayedReviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-card__header">
                <span className="review-card__stars" aria-label={`${review.rating} out of 5 stars`}>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
                <span className="review-card__meta">{review.name} · {review.date}</span>
              </div>
              <h3>{review.title}</h3>
              <p>{review.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="sticky-buy-bar">
        <div className="sticky-buy-bar__content">
          <span>OISHII Original</span>
          <span>{purchaseType === "subscribe" ? formattedSubscriptionPrice : formattedOneTimePrice}</span>
          <button type="button" className="primary-action">
            {purchaseType === "subscribe" ? "Subscribe" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
}
