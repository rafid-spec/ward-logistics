"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { type Dict, hrefFor } from "../i18n";
import { useExperience } from "./Experience";
import { Magnetic, Roll } from "./ui";

const ids = ["about", "services", "corridor", "trust", "faq"] as const;

export default function Nav({ t }: { t: Dict }) {
  const links = ids.map((id) => ({ id, label: t.nav[id] }));
  const otherLang = t.lang === "en" ? "ar" : "en";
  const { scrollTo, openContact, soundOn, toggleSound, play } = useExperience();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menu, setMenu] = useState(false);
  const pill = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 400 && y > last + 2 ? true : y < last - 2 ? false : (h) => h);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id === "home" ? "" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["home", ...ids].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Slide the indicator under the active link
  useEffect(() => {
    const p = pill.current;
    const nav = navRef.current;
    if (!p || !nav) return;
    const a = nav.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!a) {
      p.style.opacity = "0";
      return;
    }
    p.style.opacity = "1";
    p.style.width = `${a.offsetWidth}px`;
    p.style.transform = `translateX(${a.offsetLeft}px)`;
  }, [active]);

  // Mobile menu: Escape closes, focus returns to the toggle
  useEffect(() => {
    if (!menu) return;
    const btn = menuBtn.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [menu]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    play("tick");
    setMenu(false);
    scrollTo(`#${id}`);
  };

  return (
    <>
      <header className={`nav ${hidden && !menu ? "is-hidden" : ""} ${solid ? "is-solid" : ""} ${menu ? "is-menu" : ""}`}>
        <a href="#home" className="nav-logo" onClick={(e) => go(e, "home")} aria-label={t.nav.logo}>
          <Image src={logo} alt="" priority sizes="140px" />
        </a>

        <nav className="nav-links" ref={navRef} aria-label={t.nav.primary}>
          <span className="nav-pill" ref={pill} aria-hidden="true" />
          {links.map((l) => (
            <a
              key={l.id}
              data-id={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              aria-current={active === l.id ? "true" : undefined}
            >
              <Roll>{l.label}</Roll>
            </a>
          ))}
        </nav>

        <div className="nav-end">
          <a
            className="lang-switch"
            href={hrefFor(otherLang)}
            hrefLang={otherLang}
            lang={otherLang}
            aria-label={t.nav.switchAria}
            onClick={(e) => {
              e.preventDefault();
              play("tick");
              window.location.href = hrefFor(otherLang) + window.location.hash;
            }}
          >
            <Roll>{t.nav.switchLabel}</Roll>
          </a>
          <button
            className={`sound ${soundOn ? "is-on" : ""}`}
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? t.nav.soundOnAria : t.nav.soundOffAria}
          >
            <span className="sound-bars" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="mono">{soundOn ? t.nav.soundOn : t.nav.soundOff}</span>
          </button>
          <Magnetic>
            <button className="btn btn-sm" onClick={openContact}>
              <Roll>{t.nav.contact}</Roll>
            </button>
          </Magnetic>
          <button
            ref={menuBtn}
            className="burger"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => {
              setMenu((m) => !m);
              play(menu ? "close" : "open");
            }}
          >
            <span />
            <span />
          </button>
        </div>
        <span className="nav-progress" aria-hidden="true" />
      </header>

      <div id="mobile-menu" className={`menu ${menu ? "is-open" : ""}`} inert={!menu}>
        <nav aria-label={t.nav.mobile}>
          {[{ id: "home", label: t.nav.home }, ...links].map((l, i) => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)} style={{ ["--i" as string]: i }}>
              <span className="mono">0{i + 1}</span>
              <span className="display">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="menu-foot" style={{ ["--i" as string]: 6 }}>
          <button
            className="btn btn-block"
            onClick={() => {
              setMenu(false);
              openContact();
            }}
          >
            <Roll>{t.nav.contact}</Roll>
          </button>
          <div className="menu-meta">
            <span className="mono">{t.nav.place}</span>
            <a className="mono link" href={hrefFor(otherLang)} hrefLang={otherLang} lang={otherLang} aria-label={t.nav.switchAria}>
              {t.nav.switchLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
