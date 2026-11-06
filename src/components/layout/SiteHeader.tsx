"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, navCta, secondaryNav, site, type NavLink } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SocialLinks } from "./SocialLinks";

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** SiteNav — design/components/SiteNav.md */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const current = (href: string) => (isCurrent(pathname, href) ? "page" : undefined);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="container site-header__bar">
        <Link className="wordmark" href="/" aria-label={`${site.name} — home`}>
          {site.name}
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ul>
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link className="nav-link" href={link.href} aria-current={current(link.href)}>
                  <NavLabel link={link} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href={navCta.href} variant="primary" size="nav" className="site-header__cta">
          {navCta.label}
        </ButtonLink>

        <MobileMenu pathname={pathname} />
      </div>
    </header>
  );
}

/** Visible label plus its full name for assistive technology (e.g. "SFF, Speak French Fast"). */
function NavLabel({ link }: { link: NavLink }) {
  return (
    <>
      {link.label}
      {link.expansion && <span className="visually-hidden">, {link.expansion}</span>}
    </>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      setOpen(false);
      toggle.current?.focus({ preventScroll: true });
    };
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  // Close if the viewport grows past the mobile breakpoint while open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && close();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  const links: NavLink[] = [{ label: "Home", href: "/" }, ...mainNav];

  return (
    <>
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        Menu <Icon name="menu" className="kc-icon--lg" />
      </button>

      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Site menu"
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="container mobile-menu__inner">
          <div className="mobile-menu__head">
            <Link className="wordmark" href="/" onClick={close}>
              {site.name}
            </Link>
            <button type="button" className="icon-btn" onClick={close} aria-label="Close menu">
              <Icon name="close" className="kc-icon--lg" />
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className="mobile-menu__links" role="list">
              {links.map((link, i) => (
                <li key={link.href} style={{ ["--i" as string]: i }}>
                  <Link href={link.href} aria-current={isCurrent(pathname, link.href) ? "page" : undefined} onClick={close}>
                    {link.label}
                    {link.expansion && <span className="mobile-menu__expansion">{link.expansion}</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mobile-menu__sub" role="list">
              {secondaryNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu__foot">
            <ButtonLink href={navCta.href} variant="primary" arrow>
              {navCta.label}
            </ButtonLink>
            <SocialLinks />
          </div>
        </div>
      </dialog>
    </>
  );
}
