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

  /* ---- Animated diamond mesh (hero background) ---- */
  const mesh = (function () {
    const canvas = document.getElementById("facets");
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, DPR = 1, cols = 0, rows = 0, cell = 0, pts = [], rnd = [];

    const hex2rgb = (h) => {
      h = h.trim().replace("#", "");
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const mix = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];

    function palette() {
      const cs = getComputedStyle(document.documentElement);
      return {
        f1: hex2rgb(cs.getPropertyValue("--facet-1")),
        f2: hex2rgb(cs.getPropertyValue("--facet-2")),
        f3: hex2rgb(cs.getPropertyValue("--facet-3")),
        edge: cs.getPropertyValue("--facet-edge").trim(),
        glint: cs.getPropertyValue("--facet-glint").trim(),
        shade: parseFloat(cs.getPropertyValue("--facet-shade")) || 16
      };
    }
    let P = palette();
    const seeded = (i) => { const x = Math.sin(i * 127.1) * 43758.5453; return x - Math.floor(x); };

    function build() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return false;   // not laid out yet
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cell = W < 700 ? 92 : 128;
      cols = Math.ceil(W / cell) + 3;
      rows = Math.ceil(H / cell) + 3;
      pts = []; rnd = [];
      let k = 0;
      for (let i = 0; i < cols; i++) {
        pts[i] = [];
        for (let j = 0; j < rows; j++) {
          const jx = (seeded(k++) - .5) * cell * .55;
          const jy = (seeded(k++) - .5) * cell * .55;
          pts[i][j] = {
            bx: (i - 1) * cell + jx,
            by: (j - 1) * cell + jy,
            ph: seeded(k++) * Math.PI * 2,
            am: 12 + seeded(k++) * 20,      // drift amplitude
            sp: 0.6 + seeded(k++) * 0.85,   // per-point speed: the mesh breathes
            x: 0, y: 0
          };
        }
      }
      for (let i = 0; i < cols * rows * 2; i++) rnd[i] = seeded(i * 3.77);
      return true;
    }

    function tri(a, b, c, idx) {
      const cx = (a.x + b.x + c.x) / 3, cy = (a.y + b.y + c.y) / 3;
      let t = (cx / W) * 0.62 + (cy / H) * 0.38;
      t = Math.max(0, Math.min(1, t));
      const col = t < 0.5 ? mix(P.f1, P.f2, t / 0.5) : mix(P.f2, P.f3, (t - 0.5) / 0.5);
      const v = (rnd[idx % rnd.length] - .5) * P.shade;
      const cl = (n) => Math.max(0, Math.min(255, n + v)) | 0;
      ctx.fillStyle = `rgb(${cl(col[0])},${cl(col[1])},${cl(col[2])})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y); ctx.closePath();
      ctx.fill();
      const glint = rnd[(idx * 7) % rnd.length] > 0.94;   // gold hairlines, never fills
      ctx.strokeStyle = glint ? P.glint : P.edge;
      ctx.lineWidth = glint ? 0.9 : 0.6;
      ctx.stroke();
    }

    function draw(time) {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      const t = time * 0.00048;
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++) {
          const p = pts[i][j];
          p.x = p.bx + Math.sin(t * p.sp + p.ph) * p.am;
          p.y = p.by + Math.cos(t * p.sp * 0.82 + p.ph * 1.3) * p.am;
        }
      let idx = 0;
      for (let i = 0; i < cols - 1; i++)
        for (let j = 0; j < rows - 1; j++) {
          tri(pts[i][j], pts[i + 1][j], pts[i][j + 1], idx++);
          tri(pts[i + 1][j], pts[i + 1][j + 1], pts[i][j + 1], idx++);
        }
    }

    function loop(time) { draw(time); requestAnimationFrame(loop); }

    build();
    if (reduce) draw(0); else requestAnimationFrame(loop);
    if ("ResizeObserver" in window) {
      new ResizeObserver(() => { if (build() && reduce) draw(0); }).observe(canvas);
    } else {
      let rt;
      window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (build() && reduce) draw(0); }, 150); });
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (build() && reduce) draw(0); });

    return { repaint() { P = palette(); draw(performance.now()); } };
  })();

  const toggle = document.getElementById("themeToggle");
  toggle && toggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    mesh && mesh.repaint();          // repaint facets in the new palette
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

  /* ---- Lightbox: click any [data-lightbox] image, then browse with ← → ---- */
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML =
    '<button class="lightbox__close" aria-label="Close (Esc)">×</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image">‹</button>' +
    '<img alt="" />' +
    '<button class="lightbox__nav lightbox__nav--next" aria-label="Next image">›</button>' +
    '<p class="lightbox__cap"></p><span class="lightbox__count"></span>';
  document.body.appendChild(box);

  const boxImg   = box.querySelector("img");
  const boxCap   = box.querySelector(".lightbox__cap");
  const boxCount = box.querySelector(".lightbox__count");
  const btnPrev  = box.querySelector(".lightbox__nav--prev");
  const btnNext  = box.querySelector(".lightbox__nav--next");

  let group = [], gi = 0;

  // only images that actually loaded belong in the group
  const usable = (img) => img.style.display !== "none" && !!img.getAttribute("src") && img.naturalWidth > 0;

  function show(i) {
    if (!group.length) return;
    gi = (i + group.length) % group.length;          // wrap around
    const img = group[gi];
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt || "";
    boxCap.textContent = img.alt || "";
    boxCount.textContent = (gi + 1) + " / " + group.length;
    const many = group.length > 1;
    btnPrev.style.display = btnNext.style.display = many ? "grid" : "none";
    boxCount.style.display = many ? "" : "none";
  }
  const closeBox = () => {
    box.classList.remove("is-open");
    boxImg.removeAttribute("src");
    document.body.style.overflow = "";
  };

  btnPrev.addEventListener("click", (e) => { e.stopPropagation(); show(gi - 1); });
  btnNext.addEventListener("click", (e) => { e.stopPropagation(); show(gi + 1); });
  box.addEventListener("click", (e) => {
    if (e.target === boxImg || e.target.closest(".lightbox__nav")) return;  // don't close on image/arrows
    closeBox();
  });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") closeBox();
    else if (e.key === "ArrowRight") show(gi + 1);
    else if (e.key === "ArrowLeft") show(gi - 1);
  });

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t && t.matches && t.matches("img[data-lightbox]"))) return;
    if (!usable(t)) return;
    // browse within the clicked image's own gallery
    const scope = t.closest(".gallery") || document;
    group = Array.prototype.filter.call(scope.querySelectorAll("img[data-lightbox]"), usable);
    show(group.indexOf(t));
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });

  /* ---- Footer year ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
