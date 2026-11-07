// Every string and content block on the site, per language. English is the source; Arabic mirrors its shape.

export const langs = ["en", "ar"] as const;
export type Lang = (typeof langs)[number];
export const isLang = (v: string): v is Lang => (langs as readonly string[]).includes(v);

export type SceneKey = "blueprint" | "crane" | "globe" | "customs" | "refinery";

const scenes: SceneKey[] = ["blueprint", "crane", "globe", "customs", "refinery"];
const phones = { md: "+968 99494253", sales: "+968 99433000" };
const emails: string[] = ["Rafeeck@abuward.com", "abuwardforbusiness@gmail.com", "wardlogisticsoman@gmail.com"];

const en = {
  lang: "en" as Lang,
  dir: "ltr" as "ltr" | "rtl",
  name: "Ward Logistics",
  legalName: "Ward Logistics Services",
  meta: {
    title: "Ward Logistics — Oversized Cargo & Project Logistics Across the GCC",
    description:
      "Ward Logistics Services is a Sohar-based logistics company moving oversized machinery, project cargo and petroleum across the GCC, with in-house customs clearance, real-time GPS tracking and all-inclusive flat-rate pricing.",
    keywords: [
      "oversized cargo logistics",
      "heavy lift transport Oman",
      "project cargo GCC",
      "customs clearance Oman",
      "GCC freight forwarding",
      "petroleum transport Oman",
      "oil and gas logistics GCC",
      "Ward Logistics",
    ],
    ogLocale: "en_US",
  },
  skip: "Skip to content",
  nav: {
    about: "Company",
    services: "Capabilities",
    corridor: "Corridor",
    trust: "Ledger",
    faq: "FAQ",
    home: "Arrival",
    contact: "Contact sales",
    soundOn: "Sound on",
    soundOff: "Sound off",
    soundOnAria: "Turn interface sound off",
    soundOffAria: "Turn interface sound on",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    logo: "Ward Logistics — back to top",
    place: "Sohar · Sultanate of Oman",
    primary: "Primary",
    mobile: "Mobile",
    switchLabel: "العربية",
    switchAria: "عرض الموقع باللغة العربية",
  },
  intro: "Ward Logistics — Manifest loading",
  hero: {
    meta1: "Expert logistics across the GCC",
    meta2: "HQ — Sohar, Sultanate of Oman",
    l1: "Shipping the",
    em: "im",
    rest: "possible",
    sub: "Delivering certainty.",
    lede: "From oversized machinery to delicate customs clearance — we handle the complex logistics that others can't.",
    cta: "Contact sales",
    cursor: "Talk",
    scroll: "Scroll to depart",
  },
  about: {
    label: "( 01 ) — The company",
    srTitle: "About Ward Logistics",
    statement:
      "Ward Logistics Services is redefining logistics in the Middle East — the backbone of industrial growth, moving what others call impossible safely, efficiently and on time.",
    band: ["Oversized cargo", "Customs brokerage", "Project logistics", "Petroleum transport", "Route engineering", "GCC-wide"],
    figAria: "Illustration of a racked warehouse aisle with a forklift moving a crate",
    stamp: "Commitment · Every mile · Every load ·",
    caption: "Fig. 01 — Capacity, organised.",
    mission: {
      title: "Our mission",
      body: "To deliver excellence in every mile — the most reliable logistics for complex cargo, keeping business moving for our industrial partners.",
    },
    vision: {
      title: "Our vision",
      body: "To become the leading specialised logistics provider in the GCC — known for tackling the impossible and setting new standards for safety and efficiency.",
    },
  },
  services: {
    label: "( 02 ) — Capabilities",
    title1: "Five ways we move",
    title2: "what shouldn't move.",
    lede: "Tailored solutions for complex shipping — five disciplines, one accountable team.",
    items: [
      {
        title: "Customized Solutions",
        kicker: "Engineered per load",
        body: "No two shipments are alike. We engineer tailored shipping plans for unique dimensions, heavy loads and hazardous materials — analysing every route and regulation so the plan fits your cargo exactly.",
        points: ["Project Cargo Planning", "Route Survey & Feasibility"],
      },
      {
        title: "Safe Delivery",
        kicker: "Zero-damage philosophy",
        body: "Specialised handling equipment, shock-absorbent packaging and real-time monitoring — so high-value assets arrive exactly as they left.",
        points: ["Specialized Rigging", "Real-time IoT Monitoring"],
      },
      {
        title: "Global Partnerships",
        kicker: "120+ countries",
        body: "Deep relationships with major carriers and local agents in over 120 countries give you priority access and local expertise wherever the cargo goes next.",
        points: ["Priority Carrier Access", "Door-to-Door Coordination"],
      },
      {
        title: "Customs Clearance",
        kicker: "In-house brokers",
        body: "Our own customs brokers handle every document, keeping you compliant with GCC regulations and moving at the border instead of waiting at it.",
        points: ["Duty & Tax Optimization", "Compliance Consulting"],
      },
      {
        title: "Petroleum Services",
        kicker: "Oil & gas transport",
        body: "Transportation of oil and gas for public and private businesses — managing every part of the operation from tanker to site.",
        points: ["Tanker & Transport Operations", "Maintenance, Operation & Lodging"],
      },
    ],
  },
  corridor: {
    label: "( 03 ) — The corridor",
    l1: "One HQ.",
    em: "Every",
    rest: " border.",
    mapAria: "Map of routes from Sohar to nine cities across the GCC",
    hq: "SOHAR · HQ",
    cities: ["Muscat", "Dubai", "Abu Dhabi", "Doha", "Manama", "Kuwait City", "Riyadh", "Jeddah", "Salalah"],
    stats: [
      { value: "100%", unit: "commitment", label: "Every load, every mile" },
      { value: "120+", unit: "countries", label: "Carrier & agent partner network" },
      { value: "48", unit: "hours", label: "To resolve a damage claim" },
      { value: "0", unit: "hidden fees", label: "All-inclusive flat-rate pricing" },
    ],
  },
  ledger: {
    label: "( 04 ) — The ledger",
    title1: "Trust, written",
    title2: "into the terms.",
    lede: "Long-term partnerships are built on honesty. Here is how the Ward Logistics standard reads against the industry average — line by line.",
    caption: "Ward Logistics standard compared with the industry average",
    cols: ["Clause", "Ward Logistics standard", "Industry average"],
    industry: "Industry — ",
    rows: [
      { feature: "Pricing structure", ours: "All-inclusive, flat rate", theirs: "Base rate + hidden surcharges" },
      { feature: "Customs handling", ours: "In-house expert team", theirs: "Outsourced / third-party" },
      { feature: "Tracking visibility", ours: "Real-time GPS updates", theirs: "Milestone-based, delayed" },
      { feature: "Damage claims", ours: "Expedited 48-hour resolution", theirs: "Weeks of processing" },
    ],
    refuseTitle: "What we refuse",
    refuse: ["Bait-and-switch quotes", "Last-minute charges", "Conflicting communication"],
    signTitle: "What we sign",
    sign: ["Transparent pricing, no surprises", "Respectful, customer-first partnerships", "Clear documentation at every step"],
  },
  faq: {
    label: "( 05 ) — Questions",
    title: "Straight answers.",
    lede: "What clients ask before they ship with us — answered plainly.",
    items: [
      {
        q: "What does Ward Logistics do?",
        a: "Ward Logistics Services is a specialised logistics company for complex cargo across the GCC. We move oversized machinery and project cargo, handle customs clearance in-house, coordinate door-to-door through carrier partners in over 120 countries, and transport oil and gas for public and private businesses.",
      },
      {
        q: "Where is Ward Logistics based?",
        a: "Our head office is in Sohar, Al Batinah, Sultanate of Oman (Postal Code 311), registered under C.R. No. 1635804. We serve clients across the GCC.",
      },
      {
        q: "Can Ward Logistics ship oversized or heavy cargo?",
        a: "Yes. Oversized and heavy cargo is our specialty. We engineer a tailored plan for each load — project cargo planning, route survey and feasibility, and specialized rigging — for unusual dimensions, heavy loads and hazardous materials.",
      },
      {
        q: "Do you handle customs clearance?",
        a: "Yes. Our own in-house customs brokers prepare all documentation, keep shipments compliant with GCC regulations and minimise delays at the border, including duty and tax optimization and compliance consulting.",
      },
      {
        q: "Are there hidden fees?",
        a: "No. Ward Logistics quotes an all-inclusive flat rate, with no base-rate-plus-surcharge pricing and no last-minute charges.",
      },
      {
        q: "Can I track my shipment?",
        a: "Yes. Shipments are monitored in real time with GPS updates rather than delayed milestone reports, and high-value assets can be monitored with IoT sensors.",
      },
      {
        q: "How quickly are damage claims resolved?",
        a: "We operate a zero-damage philosophy, and if a claim does arise we resolve it on an expedited 48-hour basis rather than weeks of processing.",
      },
      {
        q: "Do you transport oil and gas?",
        a: "Yes. Our petroleum services cover the transportation of oil and gas for public and private businesses, including tanker and transport operations as well as maintenance, operation and lodging.",
      },
      {
        q: "How do I request a quote?",
        a: "Contact Rafeeck Vazhayil, Managing Director, on +968 99494253.",
      },
    ],
  },
  finale: {
    tag: "( 06 ) — Your move",
    l1: "Ready to ship",
    plain: "the ",
    em: "impossible?",
    body: "Oversized, overweight, over-regulated — our team handles the complex details so you don't have to.",
    orb1: "Talk to",
    orb2: "an expert",
    cursor: "Open",
  },
  footer: {
    brand: "Leading oversized cargo logistics across the GCC. Reliable, transparent, built for business.",
    hq: "Headquarters",
    people: "People",
    write: "Write to us",
    contact: "Contact sales",
    mark: "Ward Logistics",
    coords: "Sohar · 24.3460° N, 56.7075° E",
    top: "Back to top ↑",
  },
  drawer: {
    kicker: "Direct line",
    close: "Close contact panel",
    l1: "Let's plan",
    l2: "your ",
    em: "load.",
    lede: "Reach our team directly — real people, immediate answers on oversized and complex cargo.",
    general: "General enquiries",
    call: "Call",
    email: "Email",
    copy: "Copy",
    copied: "Copied",
    copyAria: "Copy {v}",
    copiedLive: "{v} copied to clipboard",
  },
  contacts: {
    people: [
      { name: "Rafeeck Vazhayil", role: "Managing Director", phone: phones.md, email: undefined as string | undefined },
      { name: "Muhammed Rafid", role: "Sales & Marketing", phone: phones.sales, email: "Rafid@abuward.com" as string | undefined },
    ],
    emails,
    registry: "C.R. No. 1635804",
    address: ["P.C. 311", "Sohar, Al Batinah", "Sultanate of Oman"],
  },
};

export type Dict = typeof en;

const ar: Dict = {
  lang: "ar",
  dir: "rtl",
  name: "ورد للخدمات اللوجستية",
  legalName: "ورد للخدمات اللوجستية",
  meta: {
    title: "ورد للخدمات اللوجستية — لوجستيات البضائع الضخمة والمشاريع في دول الخليج",
    description:
      "ورد للخدمات اللوجستية شركة لوجستية مقرها صحار، سلطنة عُمان، تنقل المعدات الضخمة وبضائع المشاريع والمنتجات البترولية في دول مجلس التعاون الخليجي، مع تخليص جمركي داخلي وتتبع لحظي عبر GPS وتسعير ثابت شامل.",
    keywords: [
      "شحن البضائع الضخمة",
      "نقل المعدات الثقيلة عُمان",
      "لوجستيات المشاريع الخليج",
      "التخليص الجمركي عُمان",
      "الشحن في دول الخليج",
      "نقل المنتجات البترولية عُمان",
      "لوجستيات النفط والغاز",
      "ورد للخدمات اللوجستية",
    ],
    ogLocale: "ar_OM",
  },
  skip: "تخطَّ إلى المحتوى",
  nav: {
    about: "الشركة",
    services: "الخدمات",
    corridor: "الممر",
    trust: "السجل",
    faq: "الأسئلة",
    home: "البداية",
    contact: "تواصل مع المبيعات",
    soundOn: "الصوت مفعّل",
    soundOff: "الصوت مغلق",
    soundOnAria: "إيقاف أصوات الواجهة",
    soundOffAria: "تشغيل أصوات الواجهة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    logo: "ورد للخدمات اللوجستية — العودة إلى الأعلى",
    place: "صحار · سلطنة عُمان",
    primary: "القائمة الرئيسية",
    mobile: "قائمة الجوال",
    switchLabel: "English",
    switchAria: "View this site in English",
  },
  intro: "ورد للخدمات اللوجستية — جارٍ تحميل البيان",
  hero: {
    meta1: "خبراء اللوجستيات في دول الخليج",
    meta2: "المقر الرئيسي — صحار، سلطنة عُمان",
    l1: "نشحن",
    em: "المستحيل",
    rest: "",
    sub: "ونُسلِّم بثقة.",
    lede: "من المعدات الضخمة إلى التخليص الجمركي الدقيق — نتولى العمليات اللوجستية المعقدة التي يعجز عنها الآخرون.",
    cta: "تواصل مع المبيعات",
    cursor: "تحدّث",
    scroll: "مرّر للانطلاق",
  },
  about: {
    label: "( 01 ) — الشركة",
    srTitle: "عن ورد للخدمات اللوجستية",
    statement:
      "ورد للخدمات اللوجستية تعيد تعريف الخدمات اللوجستية في الشرق الأوسط — العمود الفقري للنمو الصناعي، تنقل ما يراه الآخرون مستحيلًا بأمان وكفاءة وفي الوقت المحدد.",
    band: ["البضائع الضخمة", "الوساطة الجمركية", "لوجستيات المشاريع", "نقل المنتجات البترولية", "هندسة المسارات", "في كل دول الخليج"],
    figAria: "رسم توضيحي لممر مستودع برفوف مرتبة ورافعة شوكية تنقل صندوقًا",
    stamp: "التزام · كل ميل · كل حمولة · التزام · كل ميل · كل حمولة ·",
    caption: "شكل 01 — سعة منظَّمة.",
    mission: {
      title: "رسالتنا",
      body: "أن نقدّم التميّز في كل ميل — أكثر الحلول اللوجستية موثوقية للبضائع المعقدة، لضمان استمرارية أعمال شركائنا الصناعيين.",
    },
    vision: {
      title: "رؤيتنا",
      body: "أن نصبح المزوّد الرائد للخدمات اللوجستية المتخصصة في دول الخليج — المعروف بتحقيق المستحيل ووضع معايير جديدة للسلامة والكفاءة.",
    },
  },
  services: {
    label: "( 02 ) — الخدمات",
    title1: "خمس طرق ننقل بها",
    title2: "ما لا يُفترض أن يُنقل.",
    lede: "حلول مصممة خصيصًا للشحنات المعقدة — خمسة تخصصات وفريق واحد مسؤول.",
    items: [
      {
        title: "حلول مخصصة",
        kicker: "هندسة لكل حمولة",
        body: "لا تتشابه شحنتان. نصمم خطط شحن مخصصة للأبعاد غير الاعتيادية والأحمال الثقيلة والمواد الخطرة — ونحلل كل مسار وكل لائحة لتلائم الخطة شحنتك تمامًا.",
        points: ["تخطيط بضائع المشاريع", "مسح المسارات ودراسة الجدوى"],
      },
      {
        title: "التسليم الآمن",
        kicker: "فلسفة صفر أضرار",
        body: "معدات مناولة متخصصة وتغليف ماصّ للصدمات ومراقبة لحظية — لتصل أصولك عالية القيمة كما غادرت تمامًا.",
        points: ["رفع وتحميل متخصص", "مراقبة لحظية عبر إنترنت الأشياء"],
      },
      {
        title: "شراكات عالمية",
        kicker: "أكثر من 120 دولة",
        body: "علاقات راسخة مع كبرى شركات النقل والوكلاء المحليين في أكثر من 120 دولة تمنحك أولوية الوصول وخبرة محلية أينما اتجهت شحنتك.",
        points: ["أولوية لدى شركات النقل", "تنسيق من الباب إلى الباب"],
      },
      {
        title: "التخليص الجمركي",
        kicker: "وسطاء جمركيون داخليون",
        body: "يتولى وسطاؤنا الجمركيون كل المستندات، ليبقيك ملتزمًا بأنظمة دول الخليج وتتحرك شحنتك عند الحدود بدل أن تنتظر عندها.",
        points: ["تحسين الرسوم والضرائب", "استشارات الامتثال"],
      },
      {
        title: "الخدمات البترولية",
        kicker: "نقل النفط والغاز",
        body: "نقل النفط والغاز للقطاعين العام والخاص — وإدارة كل جوانب العملية من الصهريج إلى الموقع.",
        points: ["عمليات الصهاريج والنقل", "الصيانة والتشغيل والإقامة"],
      },
    ],
  },
  corridor: {
    label: "( 03 ) — الممر",
    l1: "مقر واحد.",
    em: "كل",
    rest: " الحدود.",
    mapAria: "خريطة المسارات من صحار إلى تسع مدن في دول الخليج",
    hq: "صحار · المقر",
    cities: ["مسقط", "دبي", "أبوظبي", "الدوحة", "المنامة", "مدينة الكويت", "الرياض", "جدة", "صلالة"],
    stats: [
      { value: "100%", unit: "التزام", label: "كل حمولة، كل ميل" },
      { value: "+120", unit: "دولة", label: "شبكة شركاء من شركات النقل والوكلاء" },
      { value: "48", unit: "ساعة", label: "لتسوية مطالبة الأضرار" },
      { value: "0", unit: "رسوم خفية", label: "تسعير ثابت شامل" },
    ],
  },
  ledger: {
    label: "( 04 ) — السجل",
    title1: "الثقة مكتوبة",
    title2: "في الشروط.",
    lede: "تُبنى الشراكات الطويلة على الصدق. هكذا يبدو معيار ورد للخدمات اللوجستية مقارنةً بمتوسط القطاع — بندًا بندًا.",
    caption: "معيار ورد للخدمات اللوجستية مقارنةً بمتوسط القطاع",
    cols: ["البند", "معيار ورد للخدمات اللوجستية", "متوسط القطاع"],
    industry: "القطاع — ",
    rows: [
      { feature: "هيكل التسعير", ours: "سعر ثابت شامل", theirs: "سعر أساسي + رسوم إضافية خفية" },
      { feature: "المناولة الجمركية", ours: "فريق خبراء داخلي", theirs: "جهات خارجية" },
      { feature: "وضوح التتبع", ours: "تحديثات GPS لحظية", theirs: "تحديثات مرحلية متأخرة" },
      { feature: "مطالبات الأضرار", ours: "تسوية عاجلة خلال 48 ساعة", theirs: "أسابيع من المعالجة" },
    ],
    refuseTitle: "ما نرفضه",
    refuse: ["عروض أسعار مضللة", "رسوم في اللحظة الأخيرة", "تواصل متضارب"],
    signTitle: "ما نلتزم به",
    sign: ["تسعير شفاف بلا مفاجآت", "شراكات تحترم العميل وتضعه أولًا", "مستندات واضحة في كل خطوة"],
  },
  faq: {
    label: "( 05 ) — أسئلة",
    title: "إجابات مباشرة.",
    lede: "ما يسأله العملاء قبل الشحن معنا — بإجابات واضحة.",
    items: [
      {
        q: "ماذا تقدّم ورد للخدمات اللوجستية؟",
        a: "ورد للخدمات اللوجستية شركة لوجستية متخصصة في البضائع المعقدة في دول الخليج. ننقل المعدات الضخمة وبضائع المشاريع، ونتولى التخليص الجمركي داخليًا، وننسق الشحن من الباب إلى الباب عبر شركاء نقل في أكثر من 120 دولة، وننقل النفط والغاز للقطاعين العام والخاص.",
      },
      {
        q: "أين يقع مقر ورد للخدمات اللوجستية؟",
        a: "يقع مكتبنا الرئيسي في صحار، الباطنة، سلطنة عُمان (الرمز البريدي 311)، ومسجّلون بالسجل التجاري رقم 1635804. نخدم العملاء في جميع دول الخليج.",
      },
      {
        q: "هل يمكن لورد للخدمات اللوجستية شحن البضائع الضخمة أو الثقيلة؟",
        a: "نعم، فالبضائع الضخمة والثقيلة هي تخصصنا. نصمم خطة مخصصة لكل حمولة — تخطيط بضائع المشاريع، ومسح المسارات ودراسة الجدوى، والرفع والتحميل المتخصص — للأبعاد غير الاعتيادية والأحمال الثقيلة والمواد الخطرة.",
      },
      {
        q: "هل تتولّون التخليص الجمركي؟",
        a: "نعم. يُعدّ وسطاؤنا الجمركيون الداخليون جميع المستندات، ويضمنون التزام الشحنات بأنظمة دول الخليج وتقليل التأخير عند الحدود، بما في ذلك تحسين الرسوم والضرائب واستشارات الامتثال.",
      },
      {
        q: "هل توجد رسوم خفية؟",
        a: "لا. تقدّم ورد للخدمات اللوجستية سعرًا ثابتًا شاملًا، دون تسعير أساسي تُضاف إليه رسوم، ودون رسوم في اللحظة الأخيرة.",
      },
      {
        q: "هل يمكنني تتبّع شحنتي؟",
        a: "نعم. تُراقَب الشحنات لحظيًا بتحديثات GPS بدل التقارير المرحلية المتأخرة، ويمكن مراقبة الأصول عالية القيمة بأجهزة استشعار إنترنت الأشياء.",
      },
      {
        q: "ما سرعة تسوية مطالبات الأضرار؟",
        a: "نعمل وفق فلسفة صفر أضرار، وإذا نشأت مطالبة فإننا نسوّيها بشكل عاجل خلال 48 ساعة بدل أسابيع من المعالجة.",
      },
      {
        q: "هل تنقلون النفط والغاز؟",
        a: "نعم. تشمل خدماتنا البترولية نقل النفط والغاز للقطاعين العام والخاص، بما في ذلك عمليات الصهاريج والنقل، إضافةً إلى الصيانة والتشغيل والإقامة.",
      },
      {
        q: "كيف أطلب عرض سعر؟",
        a: "تواصل مع رفيق وازهايل، المدير العام، على الرقم ‎+968 99494253.",
      },
    ],
  },
  finale: {
    tag: "( 06 ) — خطوتك",
    l1: "مستعد لشحن",
    plain: "",
    em: "المستحيل؟",
    body: "ضخمة، ثقيلة، كثيرة الإجراءات — يتولى فريقنا التفاصيل المعقدة نيابةً عنك.",
    orb1: "تحدّث إلى",
    orb2: "خبير",
    cursor: "افتح",
  },
  footer: {
    brand: "رواد لوجستيات البضائع الضخمة في دول الخليج. موثوقون، شفافون، ومصممون للأعمال.",
    hq: "المقر الرئيسي",
    people: "فريقنا",
    write: "راسلنا",
    contact: "تواصل مع المبيعات",
    mark: "ورد للخدمات اللوجستية",
    coords: "صحار · 24.3460° شمالًا، 56.7075° شرقًا",
    top: "العودة إلى الأعلى ↑",
  },
  drawer: {
    kicker: "خط مباشر",
    close: "إغلاق لوحة التواصل",
    l1: "لنخطط",
    l2: "",
    em: "لحمولتك.",
    lede: "تواصل مع فريقنا مباشرة — أشخاص حقيقيون وإجابات فورية عن البضائع الضخمة والمعقدة.",
    general: "الاستفسارات العامة",
    call: "اتصال",
    email: "بريد",
    copy: "نسخ",
    copied: "تم النسخ",
    copyAria: "نسخ {v}",
    copiedLive: "تم نسخ {v}",
  },
  contacts: {
    people: [
      { name: "رفيق وازهايل", role: "المدير العام", phone: phones.md, email: undefined },
      { name: "محمد رافد", role: "المبيعات والتسويق", phone: phones.sales, email: "Rafid@abuward.com" },
    ],
    emails,
    registry: "سجل تجاري رقم 1635804",
    address: ["الرمز البريدي 311", "صحار، الباطنة", "سلطنة عُمان"],
  },
};

const dicts: Record<Lang, Dict> = { en, ar };
export const getDict = (lang: Lang) => dicts[lang];

export const serviceScenes = scenes;
export const serviceCodes = ["01", "02", "03", "04", "05"];
export const tel = (p: string) => `tel:${p.replace(/\s/g, "")}`;
export const fill = (template: string, v: string) => template.replace("{v}", v);
/** Deploy sub-path (e.g. "/ward-logistics" on GitHub Pages); empty when served from a domain root. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** Path for a language relative to the site root; English lives at the root. */
export const pathFor = (lang: Lang) => (lang === "en" ? "/" : `/${lang}/`);
/** Browser href for a language, including the deploy sub-path. */
export const hrefFor = (lang: Lang) => `${basePath}${pathFor(lang)}`;
