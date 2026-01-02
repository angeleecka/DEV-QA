/**
 * Glass modals controller
 * - open by: .js-gmodal-open[data-gmodal="modalId"]
 * - close by: [data-gmodal-close] or Esc
 */
(function () {
  const OPEN_SELECTOR = ".js-gmodal-open[data-gmodal]";
  let lastActiveEl = null;

  function getModal(id) {
    return document.getElementById(id);
  }

  function setOpen(modal, isOpen) {
    if (!modal) return;

    if (isOpen) {
      lastActiveEl = document.activeElement;

      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-gmodal-open");

      // focus first focusable (close button), then dialog as fallback
      const focusable = modal.querySelector(
        "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])"
      );
      (focusable || modal.querySelector(".gmodal__dialog") || modal).focus?.();
    } else {
      modal.setAttribute("aria-hidden", "true");
      modal.hidden = true;
      document.body.classList.remove("is-gmodal-open");

      // restore focus
      if (lastActiveEl && typeof lastActiveEl.focus === "function") {
        lastActiveEl.focus();
      }
      lastActiveEl = null;
    }
  }

  function closeAnyOpen() {
    document
      .querySelectorAll(".gmodal:not([hidden])")
      .forEach((m) => setOpen(m, false));
  }

  // open clicks
  document.addEventListener("click", (e) => {
    const opener = e.target.closest(OPEN_SELECTOR);
    if (!opener) return;

    e.preventDefault();
    const id = opener.getAttribute("data-gmodal");
    const modal = getModal(id);
    setOpen(modal, true);
  });

  // close clicks (backdrop or X)
  document.addEventListener("click", (e) => {
    const closer = e.target.closest("[data-gmodal-close]");
    if (!closer) return;

    const modal = e.target.closest(".gmodal");
    if (!modal) return;

    e.preventDefault();
    setOpen(modal, false);
  });

  // Esc closes
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeAnyOpen();
  });
})();
