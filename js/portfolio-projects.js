/**
 * Portfolio Projects Slider
 * Safe init: script does nothing on pages where required DOM doesn't exist.
 */
(function initPortfolioProjectsSlider() {
  const track = document.getElementById("track");
  if (!track) return; // ✅ нет трека -> это не страница "Our works", выходим тихо

  const dots = document.getElementById("dots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const qaOverlay = document.getElementById("qaOverlay");
  const closeQa = document.getElementById("closeQa");
  const closeAllWins = document.getElementById("closeAllWins");
  const docList = document.getElementById("docList");

  // ✅ если хоть чего-то из основного слайдера нет — тихо выходим
  if (!track || !dots) return;

  const PROJECTS = [
    {
      id: "portfolio-filemanager",
      title:
        "Portfolio website with built-in file manager for content management",

      teaserTitle: "Portfolio + MiniCMS", // ✅ коротко для тизера

      links: {
        demo: "https://splitmanager.alevito.es/",
        admin: "https://splitmanager.alevito.es/admin-portfolio.html",
        laptop: "https://splitmanager.alevito.es/services.html",
        phone: "https://splitmanager.alevito.es/portfolio.html",
      },
      images: {
        desktop: "assets/mock/desktop.jpg",
        admin: "assets/mock/admin.jpg",
        laptop: "assets/mock/laptop.jpg",
        phone: "assets/mock/phone.jpg",
      },
      media: {
        desktopVideo: "assets/mock/desktop.webm",
        laptopVideo: "assets/mock/laptop.webm",

        // КЛЮЧ: делаем idle loop = весь ролик, чтобы он крутился плавно
        idleStart: 0,
        idleEnd: 999, // автоматически возьмёт duration видео

        // scrub = та же зона (весь ролик доступен для прокрутки)
        scrubStart: 0,
        scrubEnd: 999,

        wheelSpeed: 0.004, // чуть быстрее для удобства
      },

      callouts: {
        leftTitle: "Built-in mini CMS",
        leftText:
          "Upload media in admin — it appears on the public portfolio instantly.",

        midTitle: "Full control",
        midText:
          "You manage content yourself.\nNo builders. No code. No third-party help.",

        rightTitle: "Try it like a file manager",
        rightText: "Folders feel familiar.\nFast actions.\nClean workflow.",
      },

      qaDocs: [
        {
          title: "test-summary.md",
          description: "summary report and requirements",
          url: "data/QA-projects/split-manager/test-summary.md",
        },
        {
          title: "rtm.md",
          description: "traceability requirements/tests/bugs/status",
          url: "data/QA-projects/split-manager/rtm.md",
        },
        {
          title: "test-cases.md",
          description: "manual test cases + automation plan",
          url: "data/QA-projects/split-manager/test-cases.md",
        },
        {
          title: "security-report.md",
          description: "basic security checks and results",
          url: "data/QA-projects/split-manager/security-report.md",
        },
        {
          title: "bug-report.md",
          description: "bug report samples + real fixed defects",
          url: "data/QA-projects/split-manager/bug-report.md",
        },
      ],
    },

    {
      id: "tab-harbor",
      title: "Tab Harbor — link manager",
      teaserTitle: "Tab Harbor", // ✅ коротко для тизера

      links: {
        demo: "#",
        admin: "#",
        download: "https://spaceharbor.online/",
      },
      images: {
        desktop: "assets/tabHarbor/desktop.png",
        admin: "assets/tabHarbor/tablet.png",
        laptop: "assets/tabHarbor/laptop.png",
        phone: "assets/tabHarbor/phone.png",
      },
      callouts: {
        leftTitle: "Organize your web",
        leftText:
          "Save links into Pages → Sections → Buttons.\nKeep resources structured and easy to revisit.",

        // показываем на планшете/мобиле, скрываем на десктопе CSS-ом (или не рендерим — как решишь)
        midTitle: "Browser, relax.",
        midText:
          "Stop keeping dozens of tabs open “just in case”.\nSave everything in Tab Harbor — and come back anytime.",

        rightTitle: "Offline-first workflow",
        rightText:
          "Tiles / Rows.\nDrag & drop.\nLocal JSON storage.\nFast search & navigation.",
      },

      qaDocs: [{ title: "Architecture Notes", url: "docs/qa/architecture.md" }],
    },
  ];

  /* -------------------- Slider state -------------------- */
  let index = 0;

  /* -------------------- Helpers -------------------- */
  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }
  function safeText(s) {
    return String(s ?? "");
  }

  function openUrl(url) {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  /* -------------------- Build slides -------------------- */
  function buildSlides() {
    track.innerHTML = "";
    dots.innerHTML = "";

    PROJECTS.forEach((p, i) => {
      const slide = document.createElement("section");
      slide.className = "slide";
      slide.dataset.index = String(i);

      const prevP = PROJECTS[mod(i - 1, PROJECTS.length)];
      const nextP = PROJECTS[mod(i + 1, PROJECTS.length)];

      const prevTeaser = safeText(prevP.teaserTitle || prevP.title || "—");
      const nextTeaser = safeText(nextP.teaserTitle || nextP.title || "—");

      const desktopMedia = p.media?.desktopVideo
        ? `<video class="shot" muted playsinline preload="metadata" data-preview="desktop">
         <source src="${safeText(p.media.desktopVideo)}" type="video/webm">
       </video>`
        : `<img class="shot" src="${safeText(
            p.images?.desktop
          )}" alt="Desktop preview" />`;

      const laptopMedia = p.media?.laptopVideo
        ? `<video class="shot" muted playsinline preload="metadata" data-preview="laptop">
       <source src="${safeText(p.media.laptopVideo)}" type="video/webm">
     </video>`
        : `<img class="shot" src="${safeText(
            p.images?.laptop
          )}" alt="Laptop preview" />`;

      const demoUrl = safeText(p.links?.demo ?? "#");
      const adminUrl = safeText(p.links?.admin ?? "#");
      const laptopUrl = safeText(p.links?.laptop ?? demoUrl);
      const phoneUrl = safeText(p.links?.phone ?? demoUrl);

      // считаем "download" включённым, если ключ вообще есть (даже если ссылка пока "#")
      const hasDownloadKey = Object.prototype.hasOwnProperty.call(
        p.links ?? {},
        "download"
      );
      const downloadUrl = safeText(p.links?.download ?? "#");
      const hasDownload = !!downloadUrl && downloadUrl !== "#";

      const secondCtaKey = hasDownload ? "download" : "demo";
      const secondCtaLabel = hasDownload ? "Download app" : "Demo try";

      // если download пока "#", кнопку делаем disabled (чтобы не было пустого клика)
      const secondCtaDisabled =
        hasDownloadKey && (!downloadUrl || downloadUrl === "#");

      slide.innerHTML = `
  <div class="slide-title">
    <h2>${safeText(p.title)}</h2>

    <div class="mini-links">
      <button type="button" data-cta="qa-pack">QA Evidence Pack</button>
      <button
  type="button"
  data-cta="${secondCtaKey}"
  ${secondCtaDisabled ? 'disabled aria-disabled="true"' : ""}
>
  ${secondCtaLabel}
</button>
    </div>

    <button class="next-teaser" type="button" data-nav="prev" aria-label="Previous project">
      <span class="label">PREV:</span>
      <span class="title" data-prev-title>—</span>
    </button>

    <button class="next-teaser" type="button" data-nav="next" aria-label="Next project">
      <span class="label">NEXT:</span>
      <span class="title" data-next-title>—</span>
    </button>
  </div>

  <div class="stage" aria-label="Project stage">
    <div class="stage-content">

      <!-- DEVICES STACK (центр) -->
      <div class="devices-stack" aria-label="Devices stack">
      <!-- LEFT CALLOUT -->
      <div class="callout callout--left" aria-hidden="true">
        <h4>${safeText(p.callouts?.leftTitle ?? "").replaceAll(
          "\n",
          "<br>"
        )}</h4>
        <p>${safeText(p.callouts?.leftText ?? "").replaceAll("\n", "<br>")}</p>
      </div>

      ${
        p.callouts?.midTitle || p.callouts?.midText
          ? `
            <div class="callout callout--mid" aria-hidden="true">
              <h4>${safeText(p.callouts?.midTitle ?? "").replaceAll(
                "\n",
                "<br>"
              )}</h4>
              <p>${safeText(p.callouts?.midText ?? "").replaceAll(
                "\n",
                "<br>"
              )}</p>
            </div>
          `
          : ""
      }
      

       <!-- RIGHT CALLOUT -->
      <div class="callout callout--right" aria-hidden="true">
        <h4>${safeText(p.callouts?.rightTitle ?? "")}</h4>
        <p>${safeText(p.callouts?.rightText ?? "").replaceAll("\n", "<br>")}</p>
      </div>

        <button
          class="device device--desktop"
          data-url="${demoUrl}"
          type="button"
          data-open="demo"
          aria-label="Open demo"
        >
          <span class="device-addon device-addon--monitor-stand" aria-hidden="true"></span>
          <div class="screen">${desktopMedia}</div>
        </button>

        <button
          class="device device--admin"
          data-url="${adminUrl}"
          type="button"
          data-open="admin"
          aria-label="Open admin"
        >
          <div class="screen">
            <img class="shot" src="${safeText(
              p.images?.admin
            )}" alt="Admin preview" />
          </div>
        </button>

        <button
          class="device device--laptop"
          data-url="${laptopUrl}"
          type="button"
          data-open="demo"
          aria-label="Open demo (laptop)"
        >
          <span class="device-addon device-addon--laptop-base" aria-hidden="true"></span>
          <div class="screen">${laptopMedia}</div>
        </button>

        <div class="phone-wrap" aria-hidden="false">
  <span class="phone-plaque" aria-hidden="true"></span>
  <span class="phone-occlusion" aria-hidden="true"></span>

  <button
    class="device device--phone"
    data-url="${phoneUrl}"
    type="button"
    data-open="demo"
    aria-label="Open demo (phone)"
  >
    <div class="screen">
      <img class="shot" src="${safeText(
        p.images?.phone
      )}" alt="Phone preview" />
    </div>
  </button>
</div>

      </div>

    </div>
  </div>

`;

      const prevTitleNode = slide.querySelector("[data-prev-title]");
      const nextTitleNode = slide.querySelector("[data-next-title]");
      if (prevTitleNode) prevTitleNode.textContent = prevTeaser;
      if (nextTitleNode) nextTitleNode.textContent = nextTeaser;

      const prevTeaserBtn = slide.querySelector(
        '.next-teaser[data-nav="prev"]'
      );
      const nextTeaserBtn = slide.querySelector(
        '.next-teaser[data-nav="next"]'
      );

      prevTeaserBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        goTo(index - 1);
      });

      nextTeaserBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        goTo(index + 1);
      });

      track.appendChild(slide);
      setupPreviewVideosForSlide(slide, p);

      const dot = document.createElement("button");
      dot.className = "dot";
      dot.type = "button";
      dot.addEventListener("click", () => goTo(i));
      dots.appendChild(dot);
    });

    updateUI();
  }

  /* ==================== FIXED: smooth idle loop ==================== */

  const previewControllers = new Map();

  function setupPreviewVideosForSlide(slideEl, project) {
    const vids = slideEl.querySelectorAll("video[data-preview]");
    vids.forEach((v) => {
      const ctrl = createPreviewController(v, project.media);
      previewControllers.set(v, ctrl);

      const deviceBtn = v.closest(".device");
      if (!deviceBtn) return;

      deviceBtn.addEventListener("pointerenter", () =>
        ctrl.setInteractive(true)
      );
      deviceBtn.addEventListener("pointerleave", () =>
        ctrl.setInteractive(false)
      );

      deviceBtn.addEventListener(
        "wheel",
        (e) => {
          if (!ctrl.isInteractive) return;
          e.preventDefault();
          ctrl.onWheel(e.deltaY);
        },
        { passive: false }
      );
    });
  }

  function createPreviewController(videoEl, mediaCfg = {}) {
    let actualDuration = 0;

    const cfg = {
      idleStart: mediaCfg.idleStart ?? 0,
      idleEnd: mediaCfg.idleEnd ?? 999,
      scrubStart: mediaCfg.scrubStart ?? 0,
      scrubEnd: mediaCfg.scrubEnd ?? 999,
      wheelSpeed: mediaCfg.wheelSpeed ?? 0.004,
    };

    let raf = 0;
    let isActive = false;
    let isInteractive = false;
    let targetTime = cfg.idleStart;

    // Ждём загрузки метаданных, чтобы узнать реальную длину
    videoEl.addEventListener("loadedmetadata", () => {
      actualDuration = videoEl.duration || 10;

      // Если idleEnd/scrubEnd = 999 (авто), подставляем duration
      if (cfg.idleEnd >= 999) cfg.idleEnd = actualDuration;
      if (cfg.scrubEnd >= 999) cfg.scrubEnd = actualDuration;

      targetTime = cfg.idleStart;
    });

    function clampLocal(n, a, b) {
      return Math.max(a, Math.min(b, n));
    }

    function stopRAF() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function startIdleLoop() {
      stopRAF();
      videoEl.muted = true;
      videoEl.playbackRate = 1.0;

      // КЛЮЧ: play() БЕЗ loop, контролируем вручную
      videoEl.loop = false;
      videoEl.play().catch(() => {});

      const tick = () => {
        if (!isActive || isInteractive) return;

        const cur = videoEl.currentTime;

        // Плавный возврат на начало БЕЗ резкого прыжка
        if (cur >= cfg.idleEnd - 0.1) {
          videoEl.currentTime = cfg.idleStart;
        }

        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    }

    function pause() {
      stopRAF();
      videoEl.pause();
    }

    function setActive(on) {
      isActive = on;
      if (!isActive) {
        pause();
        return;
      }

      setInteractive(false);
      try {
        videoEl.currentTime = cfg.idleStart;
      } catch {}
      startIdleLoop();
    }

    function setInteractive(on) {
      isInteractive = on;
      if (!isActive) return;

      if (!isInteractive) {
        targetTime = cfg.idleStart;
        startIdleLoop();
        return;
      }

      // Interactive: пауза, управление колесом
      stopRAF();
      videoEl.pause();
      targetTime = clampLocal(
        videoEl.currentTime,
        cfg.scrubStart,
        cfg.scrubEnd
      );
    }

    function onWheel(deltaY) {
      targetTime = clampLocal(
        targetTime + deltaY * cfg.wheelSpeed,
        cfg.scrubStart,
        cfg.scrubEnd
      );

      stopRAF();
      const smooth = () => {
        if (!isActive || !isInteractive) return;

        const cur = videoEl.currentTime;
        const diff = targetTime - cur;

        if (Math.abs(diff) < 0.02) {
          try {
            videoEl.currentTime = targetTime;
          } catch {}
          return;
        }

        try {
          videoEl.currentTime = cur + diff * 0.18;
        } catch {}
        raf = requestAnimationFrame(smooth);
      };
      raf = requestAnimationFrame(smooth);
    }

    return {
      cfg,
      get isInteractive() {
        return isInteractive;
      },
      setActive,
      setInteractive,
      onWheel,
    };
  }

  function onTrackClick(e) {
    const device = e.target.closest(".device[data-url]");
    if (device) {
      const url = device.dataset.url;
      if (!url || url === "#") return;
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    const t = e.target.closest("[data-open],[data-cta],[data-nav]");
    if (!t) return;

    const slideEl = e.target.closest(".slide");
    const slideIndex = slideEl ? Number(slideEl.dataset.index) : index;
    const p = PROJECTS[slideIndex];

    if (t.dataset.nav === "next") {
      next();
      return;
    }

    // мини-линки можно менять в зависимости от проекта - посмотреть/загрузить
    /**Что получится
На всех проектах кнопка остаётся Demo try, пока нет links.download.
На Tab Harbor (и любом будущем проекте, где добавишь links.download) кнопка станет Download app и будет открывать p.links.download.
Средний коллаут больше не захардкожен: у каждого проекта может быть свой midTitle/midText, а если не задан — блока просто нет.*/

    if (t.dataset.cta === "download") {
      openUrl(p.links?.download || "#");
      return;
    }

    if (t.dataset.cta === "demo") {
      openUrl(p.links?.demo || "#");
      return;
    }

    if (t.dataset.cta === "qa" || t.dataset.cta === "qa-pack") {
      openQa(slideIndex);
      return;
    }

    if (t.dataset.cta === "website") {
      alert(
        "Website request — connect this button to your Contact form / mailto."
      );
      return;
    }
  }

  /* -------------------- Slider navigation -------------------- */
  function goTo(i) {
    index = mod(i, PROJECTS.length);
    track.style.transform = `translateX(${-index * 100}%)`;
    updateUI();
  }

  function prev() {
    goTo(index - 1);
  }
  function next() {
    goTo(index + 1);
  }

  function updateUI() {
    track.style.transform = `translateX(${-index * 100}%)`;

    [...track.querySelectorAll("video[data-preview]")].forEach((v) => {
      const slideEl = v.closest(".slide");
      if (!slideEl) return;

      const si = Number(slideEl.dataset.index);
      const ctrl = previewControllers.get(v);
      if (!ctrl) return;

      ctrl.setActive(si === index);
    });

    [...dots.children].forEach((d, i) => {
      d.classList.toggle("is-active", i === index);
    });

    const activeSlide = track.children[index];
    if (activeSlide) {
      const prevIndex = mod(index - 1, PROJECTS.length);
      const nextIndex = mod(index + 1, PROJECTS.length);

      const prevTitle =
        PROJECTS[prevIndex]?.teaserTitle || PROJECTS[prevIndex]?.title || "—";
      const nextTitle =
        PROJECTS[nextIndex]?.teaserTitle || PROJECTS[nextIndex]?.title || "—";

      const prevNode = activeSlide.querySelector("[data-prev-title]");
      const nextNode = activeSlide.querySelector("[data-next-title]");

      if (prevNode) prevNode.textContent = prevTitle;
      if (nextNode) nextNode.textContent = nextTitle;
    }
  }

  /* -------------------- Keyboard -------------------- */
  window.addEventListener("keydown", (e) => {
    if (qaOverlay?.classList.contains("is-open")) return;
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  /* -------------------- Buttons -------------------- */
  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);

  /* ==================== QA Overlay + Windows ==================== */
  let winZ = 260;
  const openWins = new Set();

  function openQa(projectIndex) {
    if (!qaOverlay) return; // ✅ SAFE
    const p = PROJECTS[projectIndex];
    buildDocList(p);

    const titleEl = qaOverlay.querySelector("#qaTitle");
    if (titleEl) titleEl.textContent = "Index";

    const descEl = qaOverlay.querySelector(".modal-title .muted");
    if (descEl) {
      descEl.textContent =
        "You can open all files at once right here to compare the data in them. You can also move them from place to place for convenient viewing of content.";
    }

    qaOverlay.classList.add("is-open");
    qaOverlay.setAttribute("aria-hidden", "false");
  }

  function closeQaOverlay() {
    if (!qaOverlay) return; // ✅ SAFE
    qaOverlay.classList.remove("is-open");
    qaOverlay.setAttribute("aria-hidden", "true");

    for (const w of openWins) w.remove();
    openWins.clear();
  }

  closeQa?.addEventListener("click", closeQaOverlay);
  qaOverlay?.addEventListener("click", (e) => {
    if (e.target === qaOverlay) closeQaOverlay();
  });
  closeAllWins?.addEventListener("click", () => {
    for (const w of openWins) w.remove();
    openWins.clear();
  });

  // ✅ хранит список документов текущего проекта (чтобы обработчик был один)
  let currentDocs = [];

  // ✅ один обработчик на весь проект (НЕ внутри buildDocList!)
  if (docList) {
    docList.addEventListener("click", (e) => {
      const btn = e.target.closest(".doc-action-btn");
      if (!btn) return;

      const action = btn.dataset.action;
      const i = Number(btn.dataset.index);
      const doc = currentDocs[i];
      if (!doc) return;

      if (action === "window") openDocWindow(doc, i);
      if (action === "tab")
        window.open(doc.url, "_blank", "noopener,noreferrer");
    });
  }

  function buildDocList(p) {
    if (!docList) return;

    currentDocs = p.qaDocs || []; // ✅ обновляем список для обработчика
    docList.innerHTML = "";

    const docs = currentDocs; // чтобы дальше твой код почти не менять

    docs.forEach((d, i) => {
      const row = document.createElement("div");
      row.className = "docbtn";

      row.innerHTML = `
      <div class="docbtn-info">
        <div class="docbtn-title">${safeText(d.title)}</div>
        <div class="docbtn-desc">${safeText(d.description || d.url)}</div>
      </div>
      <div class="docbtn-actions">
        <button class="doc-action-btn" data-action="window" data-index="${i}" type="button">Window</button>
        <button class="doc-action-btn" data-action="tab" data-index="${i}" type="button">Tab</button>
      </div>
    `;
      if (!docList) return;
      docList.appendChild(row);
    });

    if (!docs.length) {
      docList.innerHTML = `<div class="muted">No QA docs linked for this project yet.</div>`;
    }
  }

  /* -------------------- Markdown renderer -------------------- */
  function escHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function renderMarkdown(mdRaw) {
    const blocks = [];
    let md = String(mdRaw || "");
    md = md.replace(/```([\s\S]*?)```/g, (_, code) => {
      const key = `@@CODE_${blocks.length}@@`;
      blocks.push(`<pre><code>${escHtml(code.trim())}</code></pre>`);
      return key;
    });

    md = md
      .replace(/^###\s+(.*)$/gm, "<h3>$1</h3>")
      .replace(/^##\s+(.*)$/gm, "<h2>$1</h2>")
      .replace(/^#\s+(.*)$/gm, "<h1>$1</h1>");

    md = md.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    md = md.replace(/\*(.+?)\*/g, "<i>$1</i>");

    md = md.replace(
      /\[(.+?)\]\((.+?)\)/g,
      `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`
    );

    md = md.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
    md = md.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>");

    md = md
      .split(/\n{2,}/)
      .map((chunk) => {
        const c = chunk.trim();
        if (!c) return "";
        if (c.startsWith("<h") || c.startsWith("<ul") || c.startsWith("<pre"))
          return c;
        return `<p>${c.replaceAll("\n", "<br>")}</p>`;
      })
      .join("");

    blocks.forEach((html, i) => {
      md = md.replaceAll(`@@CODE_${i}@@`, html);
    });

    return md;
  }

  function rectsOverlap(a, b) {
    return !(
      a.right <= b.left ||
      a.left >= b.right ||
      a.bottom <= b.top ||
      a.top >= b.bottom
    );
  }

  function clampRectToViewport(left, top, w, h, pad = 10) {
    const maxL = Math.max(pad, window.innerWidth - w - pad);
    const maxT = Math.max(pad, window.innerHeight - h - pad);
    return {
      left: clamp(left, pad, maxL),
      top: clamp(top, pad, maxT),
    };
  }

  function getDocWindowPlacement(orderIndex, winW = 560, winH = 520) {
    const modal = qaOverlay.querySelector(".modal");
    const r = modal?.getBoundingClientRect();

    if (!r) {
      const baseX = window.innerWidth * 0.55;
      const baseY = 80;
      return clampRectToViewport(
        baseX + orderIndex * 18,
        baseY + orderIndex * 18,
        winW,
        winH
      );
    }

    const gap = 14;
    const slots = [
      { left: r.right + gap, top: r.top },
      { left: r.right + gap, top: r.bottom - winH },
      { left: r.left - gap - winW, top: r.top },
      { left: r.left - gap - winW, top: r.bottom - winH },
    ];

    const slot = slots[orderIndex % slots.length];
    const step = 18;
    let left = slot.left + Math.floor(orderIndex / slots.length) * step;
    let top = slot.top + Math.floor(orderIndex / slots.length) * step;

    let p = clampRectToViewport(left, top, winW, winH);

    const testRect = {
      left: p.left,
      top: p.top,
      right: p.left + winW,
      bottom: p.top + winH,
    };
    const modalRect = {
      left: r.left,
      top: r.top,
      right: r.right,
      bottom: r.bottom,
    };
    if (rectsOverlap(testRect, modalRect)) {
      p = clampRectToViewport(r.right + gap, p.top, winW, winH);
      const test2 = {
        left: p.left,
        top: p.top,
        right: p.left + winW,
        bottom: p.top + winH,
      };
      if (rectsOverlap(test2, modalRect)) {
        p = clampRectToViewport(r.left - gap - winW, p.top, winW, winH);
      }
    }

    return p;
  }

  async function openDocWindow(doc, orderIndex) {
    const win = document.createElement("div");
    win.className = "docwin";
    win.style.zIndex = String(++winZ);

    // 1. Устанавливаем стартовые размеры (одинаковые для всех)
    const winW = 560;
    const winH = 520;
    // 2. Получаем позицию (твоя функция getDocWindowPlacement уже учитывает отступы)
    const { left, top } = getDocWindowPlacement(orderIndex, winW, winH);

    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
    win.style.width = `${winW}px`;
    win.style.height = `${winH}px`;

    win.innerHTML = `
    <div class="docwin-head">
      <div class="docwin-title">${safeText(doc.title)}</div>
      <button class="docwin-close" type="button" aria-label="Close">✕</button>
    </div>
    <div class="docwin-body"><div class="muted">Loading…</div></div>
   `;

    document.body.appendChild(win);
    openWins.add(win);

    win.addEventListener("mousedown", () => {
      win.style.zIndex = String(++winZ);
    });

    win.querySelector(".docwin-close").addEventListener("click", () => {
      openWins.delete(win);
      win.remove();
    });

    // Добавляем возможность перетаскивания (у тебя уже есть эта функция)
    enableDrag(win, win.querySelector(".docwin-head"));

    // Подгружаем контент
    try {
      const res = await fetch(doc.url, { cache: "no-store" });
      const text = await res.text();
      win.querySelector(".docwin-body").innerHTML = renderMarkdown(text);
    } catch (err) {
      win.querySelector(
        ".docwin-body"
      ).innerHTML = `<div class="muted">Error: ${escHtml(String(err))}</div>`;
    }
  }

  function enableDrag(win, handle) {
    let startX = 0,
      startY = 0,
      startLeft = 0,
      startTop = 0,
      dragging = false;

    const onDown = (e) => {
      dragging = true;
      win.style.zIndex = String(++winZ);

      const r = win.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      startLeft = r.left;
      startTop = r.top;

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    };

    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const left = clamp(startLeft + dx, 6, window.innerWidth - 60);
      const top = clamp(startTop + dy, 6, window.innerHeight - 60);

      win.style.left = `${left}px`;
      win.style.top = `${top}px`;
    };

    const onUp = () => {
      dragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    handle.addEventListener("mousedown", onDown);
  }

  /* -------------------- Init -------------------- */
  track.addEventListener("click", onTrackClick);
  buildSlides();
})();
