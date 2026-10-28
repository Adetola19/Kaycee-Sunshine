"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, navCta, secondaryNav, site, workNav } from "@/content/site";
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
          <ul className="nav-full">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link className="nav-link" href={link.href} aria-current={current(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="nav-grouped">
            <li>
              <Link className="nav-link" href="/about" aria-current={current("/about")}>
                About
              </Link>
            </li>
            <li>
              <WorkDropdown pathname={pathname} />
            </li>
            <li>
              <Link className="nav-link" href="/language" aria-current={current("/language")}>
                Language
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/insights" aria-current={current("/insights")}>
                Insights
              </Link>
            </li>
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

function WorkDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const active = workNav.some((l) => isCurrent(pathname, l.href));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className="nav-dropdown"
      ref={wrap}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        className={active ? "nav-link is-active" : "nav-link"}
        aria-expanded={open}
        aria-controls="work-menu"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => wrap.current?.querySelector<HTMLAnchorElement>("#work-menu a")?.focus());
          }
        }}
      >
        Work <Icon name="chevron-down" />
      </button>
      <div id="work-menu" className={open ? "nav-dropdown__panel is-open" : "nav-dropdown__panel"}>
        <ul role="list">
          {workNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
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

  const links = [{ label: "Home", href: "/" }, ...mainNav];

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
