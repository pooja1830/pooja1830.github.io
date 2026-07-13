/* ============================================================
   Pooja Singh — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Theme: respect saved choice, else system preference ---- */
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) {
    root.setAttribute("data-theme", saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  const toggle = document.getElementById("themeToggle");
  toggle && toggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---- Sticky nav shadow ---- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  const burger = document.getElementById("burger");
  const links = document.querySelector(".nav__links");
  burger && burger.addEventListener("click", function () {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  links && links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = Math.min(i * 40, 160) + "ms";
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Lightbox: click any [data-lightbox] image to enlarge ---- */
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<button class="lightbox__close" aria-label="Close">×</button><img alt="" />';
  document.body.appendChild(box);
  const boxImg = box.querySelector("img");
  const closeBox = () => {
    box.classList.remove("is-open");
    boxImg.removeAttribute("src");
    document.body.style.overflow = "";
  };
  box.addEventListener("click", (e) => { if (e.target !== boxImg) closeBox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBox(); });
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.matches && t.matches("img[data-lightbox]")) {
      if (t.style.display === "none" || !t.getAttribute("src")) return; // skip missing images
      boxImg.src = t.currentSrc || t.src;
      boxImg.alt = t.alt || "";
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  });

  /* ---- Footer year ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
