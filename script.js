(function () {
  "use strict";

  var html = document.documentElement;
  var body = document.body;
  var STORAGE_KEY = "nidhamy-lang";

  /* ---------- Language toggle ---------- */
  var btnFr = document.getElementById("btn-fr");
  var btnAr = document.getElementById("btn-ar");
  var nodes = document.querySelectorAll("[data-fr][data-ar]");

  function setLang(lang) {
    nodes.forEach(function (el) {
      el.textContent = el.getAttribute("data-" + lang);
    });

    if (lang === "ar") {
      html.setAttribute("lang", "ar");
      html.setAttribute("dir", "rtl");
      body.classList.add("lang-ar");
      btnAr.setAttribute("aria-pressed", "true");
      btnFr.setAttribute("aria-pressed", "false");
    } else {
      html.setAttribute("lang", "fr");
      html.setAttribute("dir", "ltr");
      body.classList.remove("lang-ar");
      btnFr.setAttribute("aria-pressed", "true");
      btnAr.setAttribute("aria-pressed", "false");
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable (private mode, etc.) — fail silently */
    }
  }

  btnFr.addEventListener("click", function () { setLang("fr"); });
  btnAr.addEventListener("click", function () { setLang("ar"); });

  var savedLang = null;
  try {
    savedLang = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* ignore */
  }
  if (savedLang === "ar") setLang("ar");

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
  }

  function toggleMenu() {
    var isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("open", !isOpen);
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", toggleMenu);

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (e) {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen && !mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
