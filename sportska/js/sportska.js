const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.getElementById(toggle.getAttribute("aria-controls"));

function setNavOpen(open) {
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
}

toggle.addEventListener("click", () => {
  setNavOpen(toggle.getAttribute("aria-expanded") !== "true");
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setNavOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    setNavOpen(false);
    toggle.focus();
  }
});

const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Traka koja se sama pomiče mora se moći zaustaviti (WCAG 2.2.2).
const ticker = document.querySelector("[data-ticker]");
const tickerToggle = ticker.querySelector("[data-ticker-toggle]");

tickerToggle.addEventListener("click", () => {
  const paused = ticker.classList.toggle("is-paused");
  tickerToggle.setAttribute("aria-pressed", String(paused));
  tickerToggle.querySelector("use").setAttribute("href", paused ? "#i-play" : "#i-pause");
});

// Sadržaj ispod prvog ekrana pojavljuje se pri pomicanju; bez JS-a sve je odmah vidljivo.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("is-pending");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add("is-pending");
    revealObserver.observe(el);
  });
}

// Donja traka na mobitelu skriva se dok je obrazac za upis na ekranu.
const mobileCta = document.querySelector("[data-mobile-cta]");
const enrollSection = document.getElementById("upisi");

if ("IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    mobileCta.classList.toggle("is-hidden", entry.isIntersecting);
  }).observe(enrollSection);
}

// Bez poslužitelja: prijava se šalje kao pripremljeni e-mail klubu.
const form = document.querySelector("[data-enroll-form]");
const labels = {
  dijete: "Ime i prezime djeteta",
  godiste: "Godište",
  roditelj: "Ime i prezime roditelja",
  telefon: "Telefon",
  email: "E-mail",
  poruka: "Poruka",
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = Object.entries(labels)
    .map(([name, label]) => `${label}: ${(data.get(name) || "").toString().trim()}`)
    .join("\r\n");
  const subject = `Prijava za probni trening – ${data.get("dijete")}`;
  const to = form.action.replace(/^mailto:/, "").split("?")[0];
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + "\r\n\r\nPrivola za obradu podataka: da")}`;
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
