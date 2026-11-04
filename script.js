// ================= MOBILE MENU =================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
  const isOpen = navMenu.classList.contains("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ================= HEADER ON SCROLL =================
const header = document.getElementById("siteHeader");

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

// ================= INTRO LOGO =================
const introScreen = document.getElementById("introScreen");

if (introScreen) {
  setTimeout(() => {
    introScreen.remove();
  }, 2600);
}

/* ==================================================
   ANIMATIONS AU SCROLL — NETYLÂ
   ================================================== */

(function () {

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Ne pas animer si l'utilisateur préfère
  // limiter les mouvements.
  if (reducedMotion.matches) return;

  // Vérifier que le navigateur prend en charge
  // les animations au défilement.
  if (!("IntersectionObserver" in window)) return;

  const elements = document.querySelectorAll(
    ".section-heading, " +
    ".project-card, " +
    ".service-card, " +
    ".why-card, " +
    ".about-content, " +
    ".process-list li, " +
    ".price-box, " +
    ".faq, " +
    ".contact-inner"
  );

  if (!elements.length) return;

  elements.forEach((element) => {
    element.classList.add("reveal");
  });

  // Activer les animations uniquement
  // après avoir préparé les éléments.
  document.documentElement.classList.add(
    "js-animations"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -25px 0px"
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

})();
