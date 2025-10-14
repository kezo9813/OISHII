"use client";

export function PrintButton() {
  return (
    <button type="button" className="ghost-button" onClick={() => window.print()}>
      Print
    </button>
  );
}
