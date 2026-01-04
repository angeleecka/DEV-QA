/**
 * Topbar burger (safe init).
 * Button: .is-active
 * Nav:    .is-open
 */
(function initTopbarBurger() {
  const burgerBtn = document.getElementById("burgerBtn");
  const mainNav = document.getElementById("mainNav");
  if (!burgerBtn || !mainNav) return;

  function setOpen(isOpen) {
    burgerBtn.classList.toggle("is-active", isOpen);
    mainNav.classList.toggle("is-open", isOpen);

    // блокируем скролл страницы при открытом меню (как у тебя было)
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function isOpenNow() {
    return mainNav.classList.contains("is-open");
  }

  burgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!isOpenNow());
  });

  // Закрытие меню при клике на ссылку
  mainNav.querySelectorAll(".navlink").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  // Клик вне меню — закрыть
  document.addEventListener("click", (e) => {
    if (burgerBtn.contains(e.target) || mainNav.contains(e.target)) return;
    setOpen(false);
  });

  // Escape — закрыть
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  setOpen(false);
})();
