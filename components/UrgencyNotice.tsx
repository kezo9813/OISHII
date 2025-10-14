"use client";

import { useMemo } from "react";

type UrgencyNoticeProps = {
  inventoryCount?: number;
  nextBatchDate?: string;
};

function getRelativeTimeLabel(nextBatchDate: string | undefined) {
  if (!nextBatchDate) return null;
  const target = new Date(nextBatchDate).getTime();
  if (Number.isNaN(target)) return null;
  const diffMs = target - Date.now();
  if (diffMs <= 0) return "Bottling now";

  const hours = Math.round(diffMs / (1000 * 60 * 60));
  if (hours < 24) {
    return `Bottling next batch in ${hours} hour${hours === 1 ? "" : "s"}`;
  }
  const days = Math.round(hours / 24);
  return `Bottling next batch in ${days} day${days === 1 ? "" : "s"}`;
}

export function UrgencyNotice({ inventoryCount, nextBatchDate }: UrgencyNoticeProps) {
  const label = useMemo(() => {
    if (typeof inventoryCount === "number") {
      return `Only ${inventoryCount} bottles left.`;
    }
    const relative = getRelativeTimeLabel(nextBatchDate);
    return relative ?? null;
  }, [inventoryCount, nextBatchDate]);

  if (!label) return null;

  return <div className="urgency-notice" role="status">{label}</div>;
}
