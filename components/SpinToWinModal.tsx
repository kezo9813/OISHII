"use client";

import { useEffect, useMemo, useState } from "react";

const DISCOUNTS = [
  { label: "5%", weight: 35 },
  { label: "10%", weight: 30 },
  { label: "15%", weight: 18 },
  { label: "25%", weight: 10 },
  { label: "40%", weight: 7 }
];

const STORAGE_KEY = "oishii_spin_played";

function pickDiscount() {
  const totalWeight = DISCOUNTS.reduce((sum, item) => sum + item.weight, 0);
  const threshold = Math.random() * totalWeight;
  let running = 0;
  for (const item of DISCOUNTS) {
    running += item.weight;
    if (threshold <= running) {
      return item.label;
    }
  }
  return DISCOUNTS[0].label;
}

export function SpinToWinModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyPlayed = window.localStorage.getItem(STORAGE_KEY);
    if (!alreadyPlayed) {
      const timer = window.setTimeout(() => setIsOpen(true), 2500);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const wheelSegments = useMemo(() => DISCOUNTS.map((item) => item.label), []);

  const handleSpin = () => {
    if (!email) {
      setError("Enter your email to spin.");
      return;
    }
    const emailPattern = /.+@.+\..+/i;
    if (!emailPattern.test(email)) {
      setError("That email doesn\'t look right yet.");
      return;
    }
    setError("");
    const win = pickDiscount();
    setResult(win);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, win);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="spin-modal" role="dialog" aria-modal="true" aria-label="Spin to win a discount">
      <div className="spin-modal__card" role="presentation">
        <button type="button" className="spin-modal__close" onClick={handleClose} aria-label="Close">
          ×
        </button>
        <p className="section-heading">Spin to win</p>
        <h2 className="section-title">Unlock your launch discount</h2>
        <p className="lead">
          Join the OIISHI list for bottling alerts and chef recipes. Spin the wheel to reveal a surprise discount up to 40%. Limited spins per person.
        </p>
        <div className="spin-wheel" aria-live="polite">
          <ul>
            {wheelSegments.map((segment) => (
              <li key={segment}>{segment}</li>
            ))}
          </ul>
        </div>
        {result ? (
          <div className="spin-result" aria-live="assertive">
            <p>You just unlocked</p>
            <strong>{result} off</strong>
            <span>Use code: OIISHI{result.replace("%", "")}</span>
          </div>
        ) : null}
        <form className="spin-form">
          <label htmlFor="spin-email" className="sr-only">
            Email
          </label>
          <input
            id="spin-email"
            type="email"
            name="email"
            placeholder="email@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {error ? (
            <p className="spin-error" aria-live="assertive">
              {error}
            </p>
          ) : null}
          <button type="button" className="primary-action" onClick={handleSpin} disabled={Boolean(result)}>
            {result ? "Check your inbox" : "Spin the wheel"}
          </button>
        </form>
      </div>
    </div>
  );
}
