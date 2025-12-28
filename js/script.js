/**
 * HERO slider arrows (900..560)
 * - uses native horizontal scroll + scroll-snap
 * - buttons scroll to the nearest .hero-col
 * - updates disabled state depending on active slide
 */
(function initHeroArrows() {
  const sides = document.querySelector(".hero-sides");
  if (!sides) return;

  const slides = Array.from(sides.querySelectorAll(".hero-col"));
  if (!slides.length) return;

  const btnPrev = document.querySelector(".hero-nav--prev");
  const btnNext = document.querySelector(".hero-nav--next");

  let index = 0;

  const mq = window.matchMedia("(max-width: 900px) and (min-width: 360px)");
  const isActive = () => mq.matches && slides.length > 1;

  function clamp(i) {
    return Math.max(0, Math.min(slides.length - 1, i));
  }

  function scrollToIndex(i, behavior = "smooth") {
    index = clamp(i);
    const x = slides[index].offsetLeft;
    sides.scrollTo({ left: x, behavior });
    updateButtons();
  }

  function updateButtons() {
    const active = isActive();

    if (btnPrev) btnPrev.hidden = !active;
    if (btnNext) btnNext.hidden = !active;

    if (!active) return;

    if (btnPrev) btnPrev.disabled = index === 0;
    if (btnNext) btnNext.disabled = index === slides.length - 1;
  }

  // кнопки
  btnPrev?.addEventListener("click", () => scrollToIndex(index - 1));
  btnNext?.addEventListener("click", () => scrollToIndex(index + 1));

  // определяем текущий кадр (кто виднее) через IntersectionObserver
  const io = new IntersectionObserver(
    (entries) => {
      if (!isActive()) return;

      // берем самый “видимый” элемент
      const top = entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
        )[0];

      if (!top) return;

      const newIndex = slides.indexOf(top.target);
      if (newIndex !== -1) {
        index = newIndex;
        updateButtons();
      }
    },
    { root: sides, threshold: [0.6] }
  );

  slides.forEach((s) => io.observe(s));

  // клавиатура: ← →
  sides.addEventListener("keydown", (e) => {
    if (!isActive()) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(index - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(index + 1);
    }
  });

  // при ресайзе: не даем состоянию “сломаться”
  window.addEventListener("resize", () => {
    updateButtons();
    if (isActive()) scrollToIndex(index, "auto");
  });

  updateButtons();
})();
