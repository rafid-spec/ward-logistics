"use client";

import Image from "next/image";
import logo from "../assets/logo.png";
import { type Dict, tel } from "../i18n";
import { useExperience } from "./Experience";
import HeroScene from "./HeroScene";
import { Arrow, Magnetic, Roll } from "./ui";

export default function Finale({ t }: { t: Dict }) {
  const contacts = t.contacts;
  const { openContact, scrollTo, play } = useExperience();

  return (
    <>
      <section className="finale" data-progress aria-labelledby="finale-title">
        <div className="finale-window" aria-hidden="true">
          <HeroScene night />
        </div>
        <span className="mono finale-tag">{t.finale.tag}</span>
        <h2 id="finale-title" className="finale-title display">
          <span>{t.finale.l1}</span>
          <span>
            {t.finale.plain}
            <em>{t.finale.em}</em>
          </span>
        </h2>
        <div className="finale-cta">
          <p>{t.finale.body}</p>
          <Magnetic strength={0.45}>
            <button className="orb" onClick={openContact} data-cursor={t.finale.cursor}>
              <span className="orb-fill" aria-hidden="true" />
              <span className="orb-label">
                {t.finale.orb1}
                <br />
                {t.finale.orb2}
              </span>
              <Arrow />
            </button>
          </Magnetic>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src={logo} alt={t.legalName} sizes="200px" />
            <p>{t.footer.brand}</p>
          </div>

          <div className="footer-col">
            <h3 className="mono">{t.footer.hq}</h3>
            <p>
              {contacts.address.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </p>
            <p className="mono footer-reg">{contacts.registry}</p>
          </div>

          <div className="footer-col">
            <h3 className="mono">{t.footer.people}</h3>
            {contacts.people.map((p) => (
              <div key={p.name} className="footer-person">
                <span className="footer-name">{p.name}</span>
                <span className="mono footer-role">{p.role}</span>
                <a className="link" href={tel(p.phone)} dir="ltr">
                  {p.phone}
                </a>
                {p.email && (
                  <a className="link" href={`mailto:${p.email}`}>
                    {p.email}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="footer-col">
            {contacts.emails.length > 0 && <h3 className="mono">{t.footer.write}</h3>}
            {contacts.emails.map((e) => (
              <a key={e} className="link" href={`mailto:${e}`}>
                {e}
              </a>
            ))}
            <Magnetic>
              <button className="btn btn-sm btn-ghost" onClick={openContact}>
                <Roll>{t.footer.contact}</Roll>
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="footer-mark display" aria-hidden="true">
          {t.footer.mark}
        </div>

        <div className="footer-base mono">
          <span>© {new Date().getFullYear()} {t.legalName}</span>
          <span>{t.footer.coords}</span>
          <a
            href="#home"
            className="link"
            onClick={(e) => {
              e.preventDefault();
              play("tick");
              scrollTo(0);
            }}
          >
            {t.footer.top}
          </a>
        </div>
      </footer>
    </>
  );
}
