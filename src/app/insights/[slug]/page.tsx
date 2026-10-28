import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, formatDate, getArticle, type ArticleBlock } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";
import { TextLink } from "@/components/ui/TextLink";
import { ClosingInvitation } from "@/components/sections/ClosingInvitation";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  // Articles hosted elsewhere (externalUrl) have no page on this site.
  return articles.filter((a) => a.body).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const meta = pageMetadata({ title: article.title, description: article.excerpt, path: `/insights/${slug}` });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: article.date } };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="t-h2">{block.text}</h2>;
    case "h3":
      return <h3 className="t-h3">{block.text}</h3>;
    case "quote":
      return (
        <blockquote className="pull-quote">
          <p className="t-quote">{block.text}</p>
          {block.cite && <cite className="t-meta">{block.cite}</cite>}
        </blockquote>
      );
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article?.body) notFound();

  return (
    <>
      <article className="article">
        <header className="section section--ivory article__head hero-anim">
          <div className="container article__narrow">
            <nav aria-label="Breadcrumb" className="hero-follow">
              <ol className="breadcrumb t-meta">
                <li>
                  <Link href="/insights">Insights</Link>
                </li>
                <li>{article.category}</li>
              </ol>
            </nav>
            <h1 className="t-display-l">
              <span className="line-mask">
                <span>{article.title}</span>
              </span>
            </h1>
            <p className="t-lede muted hero-follow">{article.excerpt}</p>
            <p className="t-meta hero-follow" style={{ ["--i" as string]: 1 }}>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {article.readingMinutes ? ` · ${article.readingMinutes} min read` : ""}
            </p>
          </div>
        </header>
        {article.image && (
          <div className="container article__image">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              width={article.image.width}
              height={article.image.height}
              sizes="(min-width: 1320px) 1320px, 100vw"
              priority
            />
          </div>
        )}
        <div className="section section--ivory">
          <div className="container article__narrow prose">
            {article.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            <p>
              <TextLink href="/insights" arrow>
                All insights
              </TextLink>
            </p>
          </div>
        </div>
      </article>
      <ClosingInvitation />
    </>
  );
}
