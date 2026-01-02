/**
 * Simple portfolio site app:
 * - hash routing (#/qa, #/dev, ...)
 * - EN/ES i18n with data-i18n attributes
 * - fills placeholder content for featured items, QA services, QA cases, Dev projects
 * - simple carousel for Dev gallery
 */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const PAGES = ["/", "/qa", "/dev", "/about", "/contact"];

const i18n = {
  en: {
    "brand.subtitle": "QA Lead • Dev Projects",
    "nav.home": "Home",
    "nav.qa": "QA",
    "nav.dev": "Dev Projects",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cta.hireQA": "Hire me as QA",

    "home.hero.title": "QA Lead who helps teams ship stable releases.",
    "home.hero.subtitle":
      "Release validation, regression testing, cross-browser/mobile checks, and crisp ticket verification. Strong front-end troubleshooting (HTML/CSS/JS). Clear communication across time zones.",
    "home.hero.cta1": "Hire me as QA",
    "home.hero.cta2": "See Dev Projects",

    "home.how.title": "How I work",
    "home.how.step1": "Align scope (what “done” means)",
    "home.how.step2": "Test + document (steps, evidence, priority)",
    "home.how.step3": "Verify fixes + regression (release-ready)",

    "home.cards.qa.title": "QA Portfolio",
    "home.cards.qa.text":
      "Case studies, bug reports, checklists, and release workflows.",
    "home.cards.qa.btn": "Explore QA",
    "home.cards.dev.title": "Dev Projects (Maker)",
    "home.cards.dev.text":
      "UI-heavy web tools and small apps — built for real use and learning.",
    "home.cards.dev.btn": "View projects",

    "home.note.title": "Ukrainian localization QA (add-on)",
    "home.note.text":
      "I can validate Ukrainian translations and UI layout issues (long strings, consistency, language quality).",

    "home.featured.title": "Featured highlights",

    "qa.title":
      "QA support that reduces rework and makes releases predictable.",
    "qa.subtitle":
      "I plug into your workflow (agency or product team) to validate releases, prevent regressions, and keep communication clean.",
    "qa.cta": "Book a quick call",
    "qa.services.title": "Services",
    "qa.samples.title": "Work samples (examples)",
    "qa.samples.note":
      "We’ll add real samples together: Jira-style bug reports, smoke checklist, and a 1-page test plan.",
    "qa.samples.bug": "Sample bug report",
    "qa.samples.smoke": "Smoke checklist",
    "qa.samples.plan": "Mini test plan (1 page)",
    "qa.cases.title": "Case studies",
    "qa.cases.note":
      "Each case includes: Context → Scope → Tools → Findings → Impact → Samples.",
    "qa.uaAddon.title": "Add-on: Ukrainian localization QA",
    "qa.uaAddon.text":
      "I can help validate Ukrainian translations, layout issues (long strings), and language consistency.",

    "dev.title": "UI-focused web projects and small apps.",
    "dev.subtitle":
      "I build clean, usable interfaces and practical tools — from prototypes to production-ready small systems.",
    "dev.gallery.title": "Project gallery",
    "dev.labels.role": "My role",
    "dev.labels.tech": "Tech",
    "dev.labels.features": "Key features",
    "dev.cta": "Ask about this project",
    "dev.next": "Next project →",
    "dev.disclaimer":
      "I build UI-heavy web projects and small apps. For heavy backend work, I collaborate with dedicated backend specialists.",
    "dev.list.title": "Projects list",
    "dev.list.note":
      "Add/replace items here as you publish demos. Gallery can show only images if a live link isn’t available.",

    "about.title": "About",
    "about.subtitle":
      "QA-first mindset, product thinking, and clear communication.",
    "about.qa.title": "QA focus",
    "about.qa.text":
      "I help teams ship confidently by validating releases, preventing regressions, and making issues reproducible and easy to fix.",
    "about.dev.title": "Dev projects",
    "about.dev.text":
      "I build UI-heavy tools and small apps for real use and learning — this also strengthens my QA by understanding how systems are built.",

    "contact.title": "Contact",
    "contact.subtitle":
      "Tell me about your workflow and what “done” means for your team.",
    "contact.form.title": "Send a message",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Create email draft",
    "contact.form.note":
      "This form creates an email draft using your default mail app (no backend yet).",
    "contact.details.title": "Details",
    "contact.details.location": "Location",
    "contact.details.work": "Work",
    "contact.details.workText":
      "White-label QA • Release validation • Cross-browser/mobile",
    "contact.details.ua": "Add-on",
    "contact.details.uaText":
      "Ukrainian localization QA (language + UI layout checks)",
    "contact.note":
      "Prefer a quick start? A 1-week trial sprint works well: smoke + regression + ticket verification with clear reporting.",

    "footer.note": "QA Portfolio & Dev Projects",
    "footer.langNote":
      "Languages: EN / ES • Ukrainian localization QA available as an add-on",
  },

  es: {
    "brand.subtitle": "QA Lead • Proyectos Dev",
    "nav.home": "Inicio",
    "nav.qa": "QA",
    "nav.dev": "Proyectos Dev",
    "nav.about": "Sobre mí",
    "nav.contact": "Contacto",
    "cta.hireQA": "Contrátame como QA",

    "home.hero.title":
      "QA Lead que ayuda a equipos a lanzar releases estables.",
    "home.hero.subtitle":
      "Validación de releases, pruebas de regresión, checks cross-browser/móvil y verificación clara de tickets. Buen troubleshooting front-end (HTML/CSS/JS). Comunicación clara entre husos horarios.",
    "home.hero.cta1": "Contrátame como QA",
    "home.hero.cta2": "Ver Proyectos Dev",

    "home.how.title": "Cómo trabajo",
    "home.how.step1": "Alinear alcance (qué significa “hecho”)",
    "home.how.step2": "Probar y documentar (pasos, evidencia, prioridad)",
    "home.how.step3": "Verificar fixes + regresión (listo para release)",

    "home.cards.qa.title": "Portafolio QA",
    "home.cards.qa.text":
      "Casos, bug reports, checklists y flujo de validación de releases.",
    "home.cards.qa.btn": "Ver QA",
    "home.cards.dev.title": "Proyectos Dev (Maker)",
    "home.cards.dev.text":
      "Herramientas web centradas en UI y apps pequeñas — para uso real y aprendizaje.",
    "home.cards.dev.btn": "Ver proyectos",

    "home.note.title": "QA de localización al ucraniano (extra)",
    "home.note.text":
      "Puedo validar traducciones al ucraniano y problemas de UI (textos largos, consistencia, calidad lingüística).",

    "home.featured.title": "Destacados",

    "qa.title": "QA que reduce retrabajo y hace los releases predecibles.",
    "qa.subtitle":
      "Me integro en tu flujo (agencia o equipo de producto) para validar releases, prevenir regresiones y mantener comunicación clara.",
    "qa.cta": "Agendar una llamada",
    "qa.services.title": "Servicios",
    "qa.samples.title": "Ejemplos de trabajo",
    "qa.samples.note":
      "Añadiremos ejemplos reales: bug reports estilo Jira, checklist de smoke y un plan de pruebas (1 página).",
    "qa.samples.bug": "Ejemplo de bug report",
    "qa.samples.smoke": "Checklist de smoke",
    "qa.samples.plan": "Plan de pruebas (1 página)",
    "qa.cases.title": "Casos",
    "qa.cases.note":
      "Cada caso incluye: Contexto → Alcance → Herramientas → Hallazgos → Impacto → Ejemplos.",
    "qa.uaAddon.title": "Extra: QA de localización al ucraniano",
    "qa.uaAddon.text":
      "Puedo ayudar a validar traducciones, problemas de maquetación (textos largos) y consistencia del idioma.",

    "dev.title": "Proyectos web centrados en UI y apps pequeñas.",
    "dev.subtitle":
      "Construyo interfaces limpias y herramientas prácticas — desde prototipos hasta sistemas pequeños listos para producción.",
    "dev.gallery.title": "Galería de proyectos",
    "dev.labels.role": "Mi rol",
    "dev.labels.tech": "Tecnologías",
    "dev.labels.features": "Funciones clave",
    "dev.cta": "Preguntar por este proyecto",
    "dev.next": "Siguiente proyecto →",
    "dev.disclaimer":
      "Desarrollo proyectos web centrados en UI y apps pequeñas. Para backend complejo, colaboro con especialistas de backend.",
    "dev.list.title": "Lista de proyectos",
    "dev.list.note":
      "Añade/reemplaza elementos aquí al publicar demos. La galería puede mostrar solo imágenes si no hay enlace en vivo.",

    "about.title": "Sobre mí",
    "about.subtitle":
      "Mentalidad QA-first, visión de producto y comunicación clara.",
    "about.qa.title": "Enfoque QA",
    "about.qa.text":
      "Ayudo a equipos a lanzar con confianza validando releases, evitando regresiones y haciendo los issues fáciles de reproducir y arreglar.",
    "about.dev.title": "Proyectos Dev",
    "about.dev.text":
      "Construyo herramientas centradas en UI y apps pequeñas para uso real y aprendizaje — esto también fortalece mi QA al entender cómo se construyen los sistemas.",

    "contact.title": "Contacto",
    "contact.subtitle":
      "Cuéntame tu flujo de trabajo y qué significa “hecho” para tu equipo.",
    "contact.form.title": "Enviar un mensaje",
    "contact.form.name": "Nombre",
    "contact.form.email": "Email",
    "contact.form.message": "Mensaje",
    "contact.form.submit": "Crear borrador de email",
    "contact.form.note":
      "Este formulario crea un borrador en tu app de correo (sin backend por ahora).",
    "contact.details.title": "Detalles",
    "contact.details.location": "Ubicación",
    "contact.details.work": "Trabajo",
    "contact.details.workText":
      "QA white-label • Validación de releases • Cross-browser/móvil",
    "contact.details.ua": "Extra",
    "contact.details.uaText":
      "QA de localización al ucraniano (idioma + maquetación UI)",
    "contact.note":
      "¿Quieres empezar rápido? Un sprint de prueba de 1 semana funciona muy bien: smoke + regresión + verificación de tickets con reporting claro.",

    "footer.note": "Portafolio QA & Proyectos Dev",
    "footer.langNote":
      "Idiomas: EN / ES • QA de localización ucraniana disponible como extra",
  },
};

const data = {
  featured: [
    {
      tag: "QA",
      title: {
        en: "Release validation workflow",
        es: "Flujo de validación de releases",
      },
      text: {
        en: "How I keep releases predictable with smoke + regression + verification.",
        es: "Cómo hago releases predecibles con smoke + regresión + verificación.",
      },
      href: "#/qa",
    },
    {
      tag: "DEV",
      title: {
        en: "Responsive gallery format",
        es: "Formato de galería responsive",
      },
      text: {
        en: "Portfolio presentation with device mockups and short case notes.",
        es: "Presentación con mockups de dispositivos y notas del caso.",
      },
      href: "#/dev",
    },
    {
      tag: "ADD-ON",
      title: {
        en: "Ukrainian localization QA",
        es: "QA de localización al ucraniano",
      },
      text: {
        en: "Language + UI layout checks (long strings, consistency).",
        es: "Idioma + maquetación UI (textos largos, consistencia).",
      },
      href: "#/qa",
    },
  ],

  qaServices: [
    {
      en: "Release validation (smoke + sanity on staging/production)",
      es: "Validación de releases (smoke + sanity en staging/producción)",
    },
    {
      en: "Regression testing (focused, risk-based)",
      es: "Pruebas de regresión (enfocadas en riesgos)",
    },
    {
      en: "Ticket verification (clear pass/fail, evidence attached)",
      es: "Verificación de tickets (pass/fail claro, evidencia adjunta)",
    },
    {
      en: "Cross-browser & responsive testing",
      es: "Testing cross-browser y responsive",
    },
    {
      en: "Bug reports that developers can fix fast",
      es: "Bug reports que los devs pueden arreglar rápido",
    },
  ],

  qaCases: [
    {
      title: { en: "Case Study #1 (placeholder)", es: "Caso #1 (placeholder)" },
      meta: {
        en: "Context • Scope • Tools",
        es: "Contexto • Alcance • Herramientas",
      },
      note: {
        en: "We’ll replace this with a real project and samples.",
        es: "Lo reemplazaremos por un proyecto real con ejemplos.",
      },
    },
    {
      title: { en: "Case Study #2 (placeholder)", es: "Caso #2 (placeholder)" },
      meta: {
        en: "Findings • Impact • Samples",
        es: "Hallazgos • Impacto • Ejemplos",
      },
      note: {
        en: "Add a Jira-style bug report + smoke checklist screenshot.",
        es: "Añade un bug report estilo Jira + captura del checklist de smoke.",
      },
    },
    {
      title: { en: "Case Study #3 (placeholder)", es: "Caso #3 (placeholder)" },
      meta: { en: "Release readiness", es: "Preparación para release" },
      note: {
        en: "Short, concrete, and reproducible — that’s the goal.",
        es: "Corto, concreto y reproducible — ese es el objetivo.",
      },
    },
  ],

  devProjects: [
    {
      tag: "UI / Responsive",
      title: {
        en: "Portfolio + File Manager (Admin)",
        es: "Portafolio + Gestor de Archivos (Admin)",
      },
      desc: {
        en: "Responsive admin UI with split views and media preview patterns.",
        es: "UI admin responsive con split views y patrones de preview de media.",
      },
      role: { en: "Builder • UX + UI", es: "Builder • UX + UI" },
      tech: { en: "HTML/CSS/JS", es: "HTML/CSS/JS" },
      features: {
        en: "Split panes, selection patterns, preview/lightbox groundwork",
        es: "Paneles divididos, selección, base para preview/lightbox",
      },
      links: [
        { label: { en: "Case notes", es: "Notas del caso" }, href: "#/dev" },
      ],
    },
    {
      tag: "Product tool",
      title: {
        en: "Planner side panel (prototype)",
        es: "Panel Planner (prototipo)",
      },
      desc: {
        en: "A modular planner UI meant to integrate with a bigger ecosystem.",
        es: "UI modular de planner para integrarse con un ecosistema mayor.",
      },
      role: { en: "Builder", es: "Builder" },
      tech: { en: "UI architecture", es: "Arquitectura UI" },
      features: {
        en: "Cards, lists, navigation",
        es: "Tarjetas, listas, navegación",
      },
      links: [],
    },
    {
      tag: "Gallery-first",
      title: {
        en: "Responsive showcase layout",
        es: "Layout de showcase responsive",
      },
      desc: {
        en: "A visual portfolio format based on device mockups + short descriptions.",
        es: "Formato visual basado en mockups + descripciones cortas.",
      },
      role: { en: "Designer/Builder", es: "Diseño/Builder" },
      tech: { en: "CSS layout", es: "Layout CSS" },
      features: {
        en: "Carousel, cards, routing",
        es: "Carrusel, cards, routing",
      },
      links: [],
    },
  ],
};

let currentLang = "en";
let carIndex = 0;

function getHashRoute() {
  const raw = (location.hash || "#/").slice(1);
  if (!raw.startsWith("/")) return "/";
  const route = raw.split("?")[0].replace(/\/+$/, "") || "/";
  return PAGES.includes(route) ? route : "/";
}

function showRoute(route) {
  // pages
  $$("[data-page]").forEach((sec) => {
    sec.hidden = sec.getAttribute("data-page") !== route;
  });

  // nav active
  $$(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("data-route") === route);
  });

  // update <html lang="">
  document.documentElement.lang = currentLang;
}

function t(key) {
  return i18n[currentLang]?.[key] ?? i18n.en[key] ?? key;
}

function applyI18n() {
  $$("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  // Update dynamic lists
  renderFeatured();
  renderQAServices();
  renderQACases();
  renderDevList();
  renderCarousel();
}

function setLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem("site_lang", lang);

  $$(".lang-btn").forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.setAttribute("aria-pressed", String(isActive));
  });

  applyI18n();
}

function renderFeatured() {
  const grid = $("#featuredGrid");
  if (!grid) return;
  grid.innerHTML = "";

  data.featured.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    const pill = document.createElement("div");
    pill.className = "pill";
    pill.textContent = item.tag;

    const h = document.createElement("h3");
    h.className = "card-title";
    h.textContent = item.title[currentLang] || item.title.en;

    const p = document.createElement("p");
    p.className = "card-text";
    p.textContent = item.text[currentLang] || item.text.en;

    const a = document.createElement("a");
    a.className = "btn btn-secondary";
    a.href = item.href;
    a.textContent = currentLang === "es" ? "Abrir" : "Open";

    card.append(pill, h, p, a);
    grid.appendChild(card);
  });
}

function renderQAServices() {
  const ul = $("#qaServices");
  if (!ul) return;
  ul.innerHTML = "";

  data.qaServices.forEach((row) => {
    const li = document.createElement("li");
    li.textContent = row[currentLang] || row.en;
    ul.appendChild(li);
  });
}

function renderQACases() {
  const grid = $("#qaCasesGrid");
  if (!grid) return;
  grid.innerHTML = "";

  data.qaCases.forEach((c) => {
    const card = document.createElement("article");
    card.className = "stack-item";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = c.title[currentLang] || c.title.en;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = c.meta[currentLang] || c.meta.en;

    const note = document.createElement("div");
    note.className = "muted";
    note.textContent = c.note[currentLang] || c.note.en;

    card.append(title, meta, note);
    grid.appendChild(card);
  });
}

function renderDevList() {
  const wrap = $("#devProjectsList");
  if (!wrap) return;
  wrap.innerHTML = "";

  data.devProjects.forEach((p, idx) => {
    const item = document.createElement("div");
    item.className = "stack-item";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = p.title[currentLang] || p.title.en;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${p.tag} • ${p.tech[currentLang] || p.tech.en}`;

    const desc = document.createElement("div");
    desc.className = "muted";
    desc.textContent = p.desc[currentLang] || p.desc.en;

    const actions = document.createElement("div");
    actions.className = "actions";

    const openBtn = document.createElement("button");
    openBtn.className = "btn btn-secondary";
    openBtn.type = "button";
    openBtn.textContent =
      currentLang === "es" ? "Ver en galería" : "View in gallery";
    openBtn.addEventListener("click", () => {
      carIndex = idx;
      renderCarousel();
      // scroll gallery into view
      const gallery = $(".carousel");
      gallery?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    actions.appendChild(openBtn);

    // optional links (later: Live demo, GitHub)
    (p.links || []).forEach((l) => {
      const a = document.createElement("a");
      a.className = "btn btn-ghost";
      a.href = l.href;
      a.textContent = l.label[currentLang] || l.label.en;
      actions.appendChild(a);
    });

    item.append(title, meta, desc, actions);
    wrap.appendChild(item);
  });
}

function renderCarousel() {
  const p = data.devProjects[carIndex % data.devProjects.length];
  if (!p) return;

  $("#carTag").textContent = p.tag;
  $("#carTitle").textContent = p.title[currentLang] || p.title.en;
  $("#carDesc").textContent = p.desc[currentLang] || p.desc.en;
  $("#carRole").textContent = p.role[currentLang] || p.role.en;
  $("#carTech").textContent = p.tech[currentLang] || p.tech.en;
  $("#carFeatures").textContent = p.features[currentLang] || p.features.en;

  // optional: vary mockup gradient per project index
  const mock = $("#mockup");
  if (mock) {
    mock.style.filter = `hue-rotate(${carIndex * 25}deg)`;
  }
}

function nextProject() {
  carIndex = (carIndex + 1) % data.devProjects.length;
  renderCarousel();
}
function prevProject() {
  carIndex = (carIndex - 1 + data.devProjects.length) % data.devProjects.length;
  renderCarousel();
}

function wireUI() {
  // language switch
  $$(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  // routing
  window.addEventListener("hashchange", () => showRoute(getHashRoute()));

  // carousel buttons
  $(".car-next")?.addEventListener("click", nextProject);
  $(".car-prev")?.addEventListener("click", prevProject);
  $("#carNextBtn")?.addEventListener("click", nextProject);

  // contact form -> mailto draft
  $("#contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const subject =
      currentLang === "es"
        ? "Consulta — QA / Proyectos Dev"
        : "Inquiry — QA / Dev Projects";

    const bodyLines = [
      currentLang === "es" ? "Hola Viktoria," : "Hi Viktoria,",
      "",
      message,
      "",
      "—",
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join("\n"));

    // TODO: replace with your real email
    const to = "your.email@example.com";

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
  });

  // year
  $("#year").textContent = String(new Date().getFullYear());
}

function init() {
  const saved = localStorage.getItem("site_lang");
  currentLang = saved && i18n[saved] ? saved : "en";

  wireUI();
  setLanguage(currentLang);
  showRoute(getHashRoute());
}

init();
