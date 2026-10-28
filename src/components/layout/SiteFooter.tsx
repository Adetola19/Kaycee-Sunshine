import Link from "next/link";
import { footerNav, site, socialList } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer on-ground">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link className="wordmark" href="/">
              {site.name}
            </Link>
            <p className="t-small">{site.titles.join(" · ")}</p>
          </div>

          <div className="site-footer__cols">
            {footerNav.map((group) => (
              <nav key={group.title} aria-labelledby={`footer-${group.title}`}>
                <h2 id={`footer-${group.title}`} className="t-eyebrow">
                  {group.title}
                </h2>
                <ul role="list">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="t-eyebrow">Follow</h2>
              <ul role="list">
                {socialList.map((s) => (
                  <li key={s.key}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                      <Icon name="arrow-up-right" />
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom t-meta">
          <p>
            © {year} {site.fullName}
          </p>
          <p>
            <Link href="/privacy">Privacy policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
