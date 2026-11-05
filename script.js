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

  entry.target.classList.add("is-visible");

} else {

  entry.target.classList.remove("is-visible");

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

/* ==================================================
   NETYLÂ — ENVOI DU FORMULAIRE DE CONTACT
   ================================================== */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Envoi en cours...";
    formStatus.textContent = "";

    try {

      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi");
      }

      // Confirmation uniquement après réponse positive
      formStatus.textContent =
        "Merci ! Votre demande a bien été envoyée. Je vous répondrai dès que possible.";

      formStatus.style.color = "#b9e5c5";

      contactForm.reset();

    } catch (error) {

      formStatus.textContent =
        "Votre demande n'a pas pu être envoyée. Veuillez réessayer ou me contacter à netyla.digitalweb@gmail.com.";

      formStatus.style.color = "#ffb4b4";

    } finally {

      submitButton.disabled = false;
      submitButton.textContent = originalText;

    }

  });

}
