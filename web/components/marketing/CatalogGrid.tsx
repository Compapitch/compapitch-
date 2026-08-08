"use client";

import { useMemo, useState } from "react";
import { IconChevronDown, IconSearch } from "@/components/ui/icons";
import { CatalogCard, type CatalogCardCta } from "./CatalogCard";

export type CatalogItem = {
  slug: string;
  name: string;
  description: string;
  category: string;
  iconKey: string;
  iconBg: string;
  iconColor: string;
  checkmarks: string[];
  cta: CatalogCardCta;
};

export function CatalogGrid({
  items,
  searchPlaceholder,
}: {
  items: CatalogItem[];
  searchPlaceholder: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))),
    [items]
  );

  const filtered = items.filter((item) => {
    const matchesQuery =
      query.trim() === "" ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="relative min-w-[240px] flex-1">
          <IconSearch
            width={18}
            height={18}
            className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-pill border border-border bg-surface py-3.5 pl-12 pr-5 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div className="relative min-w-[220px]">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full appearance-none rounded-pill border border-border bg-surface py-3.5 pl-5 pr-11 text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <IconChevronDown
            width={16}
            height={16}
            className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 text-ink-secondary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((item) => (
          <CatalogCard
            key={item.slug}
            iconKey={item.iconKey}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
            name={item.name}
            category={item.category}
            description={item.description}
            checkmarks={item.checkmarks}
            cta={item.cta}
          />
        ))}
      </div>
    </div>
  );
}
