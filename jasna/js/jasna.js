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

// Tražilica grupe prema godištu.
// TODO: raspodjelu godišta po grupama mora potvrditi klub za sezonu 2026./27.
const REFERENCE_YEAR = 2026;
const GROUPS = [
  { id: "mini", code: "Mini", name: "Škola rukometa", maxAge: 8 },
  { id: "u11", code: "U11", name: "Mlađi uzrast", maxAge: 10 },
  { id: "u13", code: "U13", name: "Srednji uzrast", maxAge: 12 },
  { id: "u15", code: "U15", name: "Najstariji", maxAge: 14 },
];

const finder = document.querySelector("[data-finder]");
const finderSelect = document.querySelector("[data-finder-select]");
const finderResult = document.querySelector("[data-finder-result]");
const groupItems = document.querySelectorAll("[data-group]");
const enrollYear = document.querySelector("[data-enroll-year]");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function showGroup(year) {
  finderResult.replaceChildren();
  groupItems.forEach((item) => item.classList.remove("is-match"));
  if (!year) return;

  const age = REFERENCE_YEAR - year;
  const group = GROUPS.find((g) => age <= g.maxAge);

  if (!group) {
    finderResult.append(
      el("p", "finder-group", "Javite nam se"),
      el("p", "", `Dijete rođeno ${year}. u ${REFERENCE_YEAR}. puni ${age} godina, što je iznad naše najstarije kategorije U15. Nazovite nas pa ćemo zajedno vidjeti što možemo ponuditi.`),
    );
    const call = el("a", "btn btn-outline", "Nazovi 098 797 760");
    call.href = "tel:+38598797760";
    finderResult.append(call);
    return;
  }

  const title = el("p", "finder-group");
  title.append(el("span", "group-code", group.code), document.createTextNode(group.name));
  finderResult.append(
    el("p", "finder-label", "Okvirna grupa"),
    title,
    el("p", "", `Dijete rođeno ${year}. u ${REFERENCE_YEAR}. puni ${age} godina.`),
  );
  if (age < 6) {
    finderResult.append(el("p", "", "Djecu primamo od prvih razreda osnovne škole – javite nam se pa ćemo dogovoriti kada je pravo vrijeme za početak."));
  }
  finderResult.append(el("p", "", "Točnu grupu i termin potvrdit ćemo vam telefonom."));
  const cta = el("a", "btn btn-primary", "Prijavi dijete na probni trening");
  cta.href = "#prijava";
  finderResult.append(cta);

  document.querySelector(`[data-group="${group.id}"]`)?.classList.add("is-match");
}

if (finder) {
  finder.hidden = false;
  finderSelect.addEventListener("change", () => {
    const year = Number.parseInt(finderSelect.value, 10) || 0;
    showGroup(year);
    if (year && enrollYear && !enrollYear.value) enrollYear.value = year;
  });
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

// Donja traka na mobitelu ne smije prekrivati obrazac ni podnožje.
const mobileCta = document.querySelector("[data-mobile-cta]");
if (mobileCta && "IntersectionObserver" in window) {
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    mobileCta.classList.toggle("is-hidden", visible.size > 0);
  });
  [form, document.querySelector(".footer")].forEach((target) => target && observer.observe(target));
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});
