# Handball club websites – research notes

*Researched 2026-10-20 for RK Sedmerac Karlovac. Every homepage was fingerprinted from its raw HTML (CMS, plugins, scripts, navigation), and the most relevant youth and enrollment pages were read in full.*

## Sample

| Group | Sites |
|---|---|
| **Croatia (16)** | RK Zagreb, RK Nexe, ŽRK Podravka, RK Lokomotiva, RK Zamet, RK Poreč, RK Osijek, RK Dubrava, RK Požega, RK Spačva Vinkovci, RK Rudar Labin, RK Rudar (Rude), RK Bjelovar, RK Ivanić, RK Zelina, RK Split |
| **Slovenia (8)** | RK Celje, RK Krim, RK Gorenje, RK Maribor Branik, MRK Krka, RK Slovenj Gradec, RK Olimpija, ŽRD Litija |
| **Rest of Europe (9)** | THW Kiel, SG Flensburg-Handewitt, Füchse Berlin, Fivers Margareten, GOG, Aalborg, Kolstad, Elverum, BM Granollers |
| Federations (context) | HRS, RZS (Slovenia), handball.net (DHB) |

About 100 likely domains for other Croatian clubs (Karlovac, Dubovac, Varaždin, Metalac, Umag, Trogir, Kozala, Sesvete…) returned nothing. **Most small and youth clubs in Croatia have no website at all, only a Facebook page**, so even a simple, well-made site stands out locally.

## 1. Tech stack

| | Croatia | Slovenia | Rest of Europe |
|---|---|---|---|
| WordPress | 10 / 16 | 7 / 8 | 7 / 9 |
| Other | Joomla 2, Next.js 2 (Nexe = headless WP on Vercel, Bjelovar), Framer 1 (Split) | 1 custom | TYPO3 1, 1 custom |

- **WordPress plus a sports theme is the default.** Two ThemeForest club themes recur: **Splash** (Podravka, Poreč) and **Alchemists** (Rudar Labin, Krka, Slovenj Gradec). Both are paired with the **SportsPress** plugin for fixtures, results, tables and rosters. Page builders used are Elementor, WPBakery and Avada.
- Several sites carry bloat and maintenance risk: one site runs PHP 7.0 and WordPress 6.3 with 14 small plugins (including background music), and another runs PHP 5.6. *Lesson: an old WordPress install that nobody updates is the most common failure mode.*
- Newer builds move to **custom or headless** setups (Nexe on Next.js + Vercel, Olimpija's custom 2026 theme, Split on Framer).

## 2. Information architecture (navigation)

Most common top-level items across the Croatian sites: **Vijesti/Novosti** (14/16), **Rezultati/Natjecanja** (13), **Kontakt** (12), **Mlađe kategorije** (11), **Dokumenti** (10), **Škola rukometa** (10), **Treninzi** (9), **Povijest** (9), **Treneri/Stručni stožer** (9), **Sponzori/Partneri** (8), **Upisi** (7).

Typical shape:

```
Naslovna | Novosti | Klub ▾ (O klubu, Povijest, Uspjesi, Uprava, Treneri, Dokumenti)
        | Momčadi ▾ (Prva ekipa, U17, U15, U13, U11, U9, Škola rukometa)
        | Utakmice ▾ (Raspored, Rezultati, Tablice – per league)
        | Kontakt | [Upiši se]  ← highlighted CTA button
```

- Youth teams are listed **by U-age** (Zagreb U18→U11, Zamet U17→U9, Podravka U14→U8, Maribor M20→M10). Poreč lists each league its youth teams play (1. HRL U15/U13/U11, Županijska liga U13/U11).
- **Small clubs with good IA:**
  - **RK Požega** (Joomla): Momčadi | Utakmice | Tablice | Treninzi | O klubu | Dokumenti | Novosti | Partneri | Škola rukometa | Kontakt | *Učlani se*.
  - **RK Olimpija** (SI): just 7 items – O klubu | Selekcije | Tekme | Treningi | Mladi | Sponzorji | Kontakt.

## 3. Youth-club features worth copying

| Feature | Seen at | Notes |
|---|---|---|
| **"Kutak za roditelje"** (parents' corner) | RK Zamet | Welcome letter, medical-check process (every 6 months, Google Form to upload the certificate, PDFs), list of sports-medicine specialists, **fee rules** (€40 U9 / €50 U11–U17 monthly, 50 % off 2nd child, 3rd free, IBAN payment, fees paused Jul–Aug), **parent code of conduct** with a "golden rule", nutrition links, question form |
| **Enrollment page** | Zamet, Požega, Olimpija | "Why handball" benefits → venues → year-round enrollment → equipment for the first session → no-obligation trial session → fees → CTA. Olimpija's form fields: child name, birth year, guardian, phone, email, message, **GDPR consent checkbox**, and *"first training is free"* |
| **Training schedule with birth years and halls** | Požega ("Treninzi 2026/27"), Dubrava ("Raspored treninga 26/27") | Weekly table: time · group (birth years) · hall. Coaches listed by group |
| **QR code to the enrollment form** | Požega | Works on posters and flyers too |
| **Recruiting in schools** | Podravka ("animacija za upis" in primary schools), Olimpija ("Rokomet v osnovne šole"), HRS ("Vrtko" for kindergartens) | Sedmerac already did this with *Rukometno sutra* and should show it |
| **Own tournament page** | Dubrava (Vepar Cup), Spačva (Aurelia Cibalae), Rudar Labin (LHC) | Brings visitors back every year |
| **Mascot-led enrollment** | Dubrava: "Postani veprić – upiši školu rukometa" | Playful branding for the youngest |
| **Camps and holiday schools** | Füchse (Füchsecamp, Handballschule), Kolstad (autumn-break handball school) | |
| **Volunteering and parents' involvement** | GOG, Granollers, Elverum | "Bliv frivillig", "Voluntariat" |
| **Become a donor / partner** | Zamet ("Postani donator"), Gorenje ("Postanite partner"), Granollers ("Patrocina el BMG") | Sponsor pitch page, separate from the logo wall |
| **Documents / transparency** | Zagreb (Statuti i pravilnici), Nexe, Podravka, Zamet, Požega, Krka ("Dokumenti in obrazci" – incl. forms), Granollers ("Transparència") | Statut, assembly decisions, financial reports, forms |

## 4. Integrations

| Need | What clubs use | Fit for Sedmerac |
|---|---|---|
| **Membership / enrollment / fees** | **Relago** "Članstvo" portal (Zamet – online enrollment and member portal), **Sportimus** (Požega – online application form, attendance, communication; Slovenian startup), SAITO (Rijeka sports federation app, free pilot), e-klub (SI, from €19/month) | Worth a demo call later. Until then a simple form works |
| **Results / tables** | **SportsPress** (WP), **Sofascore standings widgets** (Lokomotiva, Nexe), links to HRS match/competition pages (`hrs.hr/utakmica/?utakmica=…`, `hrs.hr/natjecanja/`), RZS Livestat (SI), nuLiga/SIS (AT/DE) | Link to HRS; Sofascore embed if the youth league is covered |
| **Live streams** | HRS YouTube channel (`@HRSmediacentar/streams`), EHF TV, club YouTube channels | Link HRS streams for finals |
| **Social feeds on site** | Smash Balloon (Instagram/FB feed plugin), Elfsight, FB Page plugin | Avoid: Meta tracking needs consent. Link out instead |
| **Tickets** | **Ticklio** (Lokomotiva, `ulaznice.` subdomain), **mojekarte.hr** (Nexe), **Entrio** (Krim), Eventim/Ticketmaster (big clubs) | Not needed (youth) |
| **Shop** | WooCommerce (Lokomotiva, Nexe, Zamet, Podravka, Maribor) | Later: kits/fan gear via a print-on-demand or local supplier |
| **Forms** | Contact Form 7, Gravity Forms, Google Forms (medical certificate upload) | Formspree/Netlify Forms or the membership platform |
| **Newsletter** | Mailchimp (Rudar Labin, GOG), custom (Maribor) | Optional; parents live on WhatsApp/Viber |
| **Analytics** | GA4/GTM dominant, Matomo (Požega), MS Clarity, Hotjar | Cookieless analytics (Plausible, Matomo without cookies, Cloudflare Web Analytics) avoids a cookie banner |
| **Cookie consent** | Cookiebot (Zagreb, Füchse, GOG, Flensburg), Complianz (Krim), CookieYes, EU Cookies Bar (Poreč), CookieAdmin (Ivanić) | |

**Compliance gap:** among the Croatian sites, only 3 of 16 showed a cookie-consent tool in their HTML (Zagreb, Poreč, Ivanić). Lokomotiva, Nexe and Rudar Labin load Google Analytics with no consent tool visible. (A banner loaded later through Tag Manager wouldn't show up in this check.) *Sedmerac's site currently sets no cookies and loads no third-party scripts, which is worth keeping.*

## 5. Design patterns (professional sites)

- **Type:** condensed uppercase display fonts for headings – Oswald (Zagreb), Roboto Condensed (Podravka), Anton (Osijek), Barlow Condensed (Olimpija), Rajdhani (Ivanić) – with Montserrat, Roboto or Open Sans for body text.
- **Layout:** full-width hero with a dark overlay and a single CTA; a **match/score strip** (Osijek shows recent scores in the header); news grid with category tags; teams as cards; sponsor logo wall above the footer; a footer with address, OIB, IBAN, contacts and socials (Zamet).
- **Colour:** club colours on a dark neutral base (navy or black), with one accent reserved for CTAs.
- **Trends:** TikTok links are now common (Podravka, Zamet, Nexe, most of the rest of Europe). Bilingual HR/EN or SL/EN is common only at clubs playing in European competitions.

## 6. Legal / compliance notes (verify with the club's accountant)

- **Financial reports:** annual financial statements of non-profits are already published through the *Registar neprofitnih organizacija*. Posting them on the club's **own website** is mandatory only for non-profits that are subject to audit (larger revenue), by 30 June ([TEB](https://www.teb.hr/novosti/2023/javna-objava-financijskih-i-revizorskih-izvjestaja-neprofitnih-organizacija/), [gov.hr](https://gov.hr/hr/racunovodstvo-udruga/590?lang=hr), [Zakon NN 121/14](https://narodne-novine.nn.hr/clanci/sluzbeni/2014_10_121_2300.html)). For Sedmerac a "Dokumenti" section is good practice, not an obligation.
- **Children's photos and data:** enrollment forms collect minors' data, so they need a consent checkbox and a short privacy notice (Olimpija does this well). Photos need parental consent.
- **Cookies:** no analytics or embeds means no banner is needed.

## 7. Recommendations for Sedmerac (priority order)

1. **Upisi + Kutak za roditelje**: the single biggest gap versus good youth clubs. Training schedule with birth years and halls, fees (and sibling discount, if any), first-session checklist, trial session, medical check, parent code of conduct, FAQ, enrollment form with GDPR consent, and a QR code for posters.
2. **Novosti** with categories (Natjecanja, Škola rukometa, Kamp, Klub), fed by the CMS and syndicated to Facebook/Instagram (see the earlier CMS plan).
3. **Momčadi by U-age** (Mini, U9/U11, U13, U15), each with coach, training times and league link (HRS).
4. **Uspjesi** (2025 U11 national title) and **Projekti** (Rukometno sutra) as proof of quality for parents and sponsors.
5. **Partneri + "Postanite partner"** pitch; **Dokumenti** (Statut, reports, forms).
6. Later: membership platform (Relago / Sportimus / SAITO demo), an own tournament page if the club runs one, and a camp page.

## Sources

- Club homepages listed above (fetched 2026-10-20); Wikidata (official-website property) for the seed list
- [RK Zamet – Kutak za roditelje](https://rk-zamet.hr/kutak-za-roditelje/), [RK Zamet – Upisi](https://rk-zamet.hr/upisi/)
- [RK Požega – Škola rukometa](https://rkpozega.hr/skola-rukometa), [RK Olimpija – Mladi](https://rkolimpija.si/mladi/), [RK Dubrava](https://www.rk-dubrava.hr/web/)
- [HRS – Natjecanja](https://hrs.hr/natjecanja/), [HRS Kalendar turnira klubova](https://hrs.hr/dokumenti-lige/kalendar-turnira/)
- [Sportimus (startup.si)](https://startup.si/en-us/startup-map/startups-scaleups/sportimus), [SAITO – Novi list](https://www.novilist.hr/?p=1748118), [e-klub (PDF)](https://www.mojaobcina.si/prenosi/dogodki/slovenj-gradec/26909_e-klub.pdf)
- [KAportal – ljetni kamp (4. 7. 2026.)](https://kaportal.net.hr/kas/1397612/vise-od-pedeset-djece-iz-rk-sedmerac-s-trenerima-boravilo-u-tradicionalnom-kampu-sportovi-igre-na-vodi-druzenje-i-animacijski-program/)
