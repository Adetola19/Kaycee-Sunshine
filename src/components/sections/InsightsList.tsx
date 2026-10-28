"use client";

import { useState } from "react";
import { articleCategories, type Article, type ArticleCategory } from "@/content/articles";
import { ArticleCard } from "./ArticleCards";

/** Category filter + card grid for the Insights journal. Only rendered when articles exist. */
export function InsightsList({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState<ArticleCategory | null>(null);
  const present = articleCategories.filter((c) => articles.some((a) => a.category === c));
  const shown = category ? articles.filter((a) => a.category === category) : articles;

  return (
    <div className="stack stack-lg">
      {present.length > 1 && (
        <div className="chip-row" role="group" aria-label="Filter by category">
          <button type="button" className="kc-chip" aria-pressed={category === null} onClick={() => setCategory(null)}>
            All
          </button>
          {present.map((c) => (
            <button key={c} type="button" className="kc-chip" aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      )}
      <p className="visually-hidden" role="status" aria-live="polite">
        {shown.length} {shown.length === 1 ? "article" : "articles"}
        {category ? ` in ${category}` : ""}
      </p>
      <ul className="card-grid card-grid--3" role="list">
        {shown.map((a) => (
          <li key={a.slug}>
            <ArticleCard article={a} />
          </li>
        ))}
      </ul>
    </div>
  );
}
