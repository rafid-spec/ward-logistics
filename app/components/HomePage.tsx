import About, { Band } from "./About";
import ContactDrawer from "./ContactDrawer";
import Corridor from "./Corridor";
import Experience from "./Experience";
import Faq from "./Faq";
import Finale from "./Finale";
import Hero from "./Hero";
import Intro from "./Intro";
import Ledger from "./Ledger";
import Nav from "./Nav";
import Services from "./Services";
import StructuredData from "./StructuredData";
import { Cursor } from "./ui";
import { getDict, type Lang } from "../i18n";

export default function HomePage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  return (
    <Experience>
      <StructuredData t={t} />
      <a className="skip" href="#about">
        {t.skip}
      </a>
      <Intro t={t} />
      <Nav t={t} />
      <main>
        <Hero t={t} />
        <div className="sheet">
          <Band t={t} />
          <About t={t} />
          <Services t={t} />
        </div>
        <Corridor t={t} />
        <Ledger t={t} />
        <Faq t={t} />
        <Finale t={t} />
      </main>
      <ContactDrawer t={t} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </Experience>
  );
}
