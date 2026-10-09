"use client";

import { useEffect, useRef, useState } from "react";
import { type Dict, fill, tel } from "../i18n";
import { useExperience } from "./Experience";

export default function ContactDrawer({ t }: { t: Dict }) {
  const contacts = t.contacts;
  const d = t.drawer;
  const { contactOpen, closeContact, play } = useExperience();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!contactOpen) return;
    opener.current = document.activeElement as HTMLElement;
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
      // Keep Tab inside the dialog
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a, button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      opener.current?.focus?.();
    };
  }, [contactOpen, closeContact]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      play("success");
      setTimeout(() => setCopied((c) => (c === text ? null : c)), 1800);
    } catch {}
  };

  const Row = ({ label, href, value }: { label: string; href: string; value: string }) => (
    <div className="d-row">
      <a href={href} className="d-link" onClick={() => play("tick")}>
        <span className="mono">{label}</span>
        <span className="d-value" dir="ltr">
          {value}
        </span>
      </a>
      <button className={`d-copy ${copied === value ? "is-done" : ""}`} onClick={() => copy(value)} aria-label={fill(d.copyAria, value)}>
        <span className="mono">{copied === value ? d.copied : d.copy}</span>
      </button>
    </div>
  );

  return (
    <div className={`drawer ${contactOpen ? "is-open" : ""}`} inert={!contactOpen}>
      <div className="drawer-scrim" onClick={closeContact} />
      <div ref={panel} className="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" data-lenis-prevent>
        <div className="drawer-top">
          <span className="mono">{d.kicker}</span>
          <button className="drawer-close" onClick={closeContact} data-autofocus aria-label={d.close}>
            <span />
            <span />
          </button>
        </div>
        <h2 id="drawer-title" className="display">
          {d.l1}
          <br />
          {d.l2}
          <em>{d.em}</em>
        </h2>
        <p className="drawer-lede">{d.lede}</p>

        {contacts.people
          .slice()
          .reverse()
          .map((p) => (
            <div className="d-card" key={p.name}>
              <div className="d-who">
                <span className="d-name">{p.name}</span>
                <span className="mono d-role">{p.role}</span>
              </div>
              <Row label={d.call} href={tel(p.phone)} value={p.phone} />
              {p.email && <Row label={d.email} href={`mailto:${p.email}`} value={p.email} />}
            </div>
          ))}

        {contacts.emails.length > 0 && (
          <div className="d-card">
            <div className="d-who">
              <span className="d-name">{d.general}</span>
            </div>
            {contacts.emails.map((e) => (
              <Row key={e} label={d.email} href={`mailto:${e}`} value={e} />
            ))}
          </div>
        )}

        <p className="mono drawer-foot">
          {contacts.address.join(" · ")} — {contacts.registry}
        </p>
        <span className="sr-only" aria-live="polite">
          {copied ? fill(d.copiedLive, copied) : ""}
        </span>
      </div>
    </div>
  );
}
