const header = document.querySelector("[data-header]");

const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Označava dio stranice koji je trenutno na ekranu (donja traka na mobitelu, gornja na računalu).
const spyLinks = [...document.querySelectorAll("[data-spy]")];

function setCurrent(id) {
  spyLinks.forEach((link) => {
    if (link.hash === `#${id}`) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}

if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  spyLinks
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean)
    .forEach((section) => spy.observe(section));
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
