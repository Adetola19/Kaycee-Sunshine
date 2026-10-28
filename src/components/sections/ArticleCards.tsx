import Image from "next/image";
import Link from "next/link";
import { articleHref, formatDate, type Article, type ArticleCategory } from "@/content/articles";
import { Placeholder } from "@/components/media/Visual";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

/** ArticleCard — design/components/ArticleCard.md. The whole card is the link. */
export function ArticleCard({ article, lead, headingLevel = 3 }: { article: Article; lead?: boolean; headingLevel?: 2 | 3 }) {
  const href = articleHref(article);
  const external = Boolean(article.externalUrl);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const body = (
    <>
      <div className="kc-media">
        {article.image ? (
          <Image
            src={article.image.src}
            alt={article.image.alt}
            width={article.image.width}
            height={article.image.height}
            sizes={lead ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"}
          />
        ) : (
          <Placeholder shot="Article image" ratio="4 / 3" />
        )}
      </div>
      <div>
        <span className="kc-chip">{article.category}</span>
        <Heading className={lead ? "t-h2" : "t-h3"}>
          {article.title}
          {external && (
            <>
              {" "}
              <Icon name="arrow-up-right" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </>
          )}
        </Heading>
        {lead && <p className="t-small">{article.excerpt}</p>}
        <p className="t-meta">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          {article.readingMinutes ? ` · ${article.readingMinutes} min read` : ""}
        </p>
      </div>
    </>
  );

  const cls = lead ? "kc-card kc-card--lead" : "kc-card";
  return external ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <Link className={cls} href={href}>
      {body}
    </Link>
  );
}

/** Non-interactive stand-in until a real article is supplied. */
export function ArticlePlaceholderCard({ category, lead }: { category: ArticleCategory; lead?: boolean }) {
  return (
    <div className={lead ? "kc-card kc-card--lead" : "kc-card"}>
      <div className="kc-media">
        <Placeholder shot="Article image" ratio="4 / 3" />
      </div>
      <div>
        <span className="kc-chip">{category}</span>
        <h3 className={lead ? "t-h2" : "t-h3"}>
          <span className="pending">[OWNER TO CONFIRM: article title from a verified source]</span>
        </h3>
        <p className="t-meta">[Date] · [Read time]</p>
      </div>
    </div>
  );
}

const placeholderCategories: ArticleCategory[] = ["Leadership", "Communication", "Language Learning"];

/** One lead card across seven columns beside two stacked cards. */
export function ArticleFeature({ articles }: { articles: Article[] }) {
  const [lead, ...rest] = articles;
  const side = rest.slice(0, 2);
  return (
    <div className="article-grid">
      <Reveal>{lead ? <ArticleCard article={lead} lead /> : <ArticlePlaceholderCard category={placeholderCategories[0]} lead />}</Reveal>
      <div className="article-grid__side">
        {(side.length ? side : [undefined, undefined]).map((a, i) => (
          <Reveal key={a?.slug ?? i} index={i + 1}>
            {a ? <ArticleCard article={a} /> : <ArticlePlaceholderCard category={placeholderCategories[i + 1]} />}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
