// === globale variable für aktuell gewählte sprache ===
let currentLanguage =
  localStorage.getItem("selectedLanguage") || navigator.language.slice(0, 2);

// === globale API url für fakten ===
const urlBase = "https://uselessfacts.jsph.pl/api/v2/facts/random";

// === alle benötigten elemente aus dem DOM/HTML auslesen ===
const title = document.querySelector(".titel");
const subtitle = document.querySelector(".untertitel");
const description = document.querySelector(".text");
const startButtonText = document.querySelector("#button-start p");
const startButton = document.querySelector("#button-start");
const textbox = document.getElementById("textboxelement");
const didYouKnow = document.querySelector(".text-texbox-fett");
const nextButton = document.querySelector("#button-next");
const nextButtonText = document.querySelector(".text-button-next-fett");
const factElement = document.getElementById("fact");
const herz = textbox.querySelector(".herz-icon");
const languageSwitcher = document.querySelector(".navigation-language");

// === hintergrund für den aktuellen sprach-button erstellen ===
const langBackground = document.createElement("div");
langBackground.style.cssText = `
  position: absolute;
  background-color: #bfbfbf;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: -1;
`;
languageSwitcher.style.position = "relative";
languageSwitcher.appendChild(langBackground);

// === zufälligen fakt aus der API laden ===
async function loadFact() {
  try {
    const response = await fetch(`${urlBase}?language=${currentLanguage}`);
    const data = await response.json();
    return data.text;
  } catch (err) {
    console.error("Fehler beim Laden des Fakts:", err);
    return "Fehler beim Laden des Fakts.";
  }
}

// === übersetzungs-daten aus json-datei laden ===
async function loadTranslations() {
  try {
    const response = await fetch("assets/translations.json");
    return await response.json();
  } catch (err) {
    console.error("Fehler beim Laden der Übersetzungen:", err);
    return {};
  }
}

// === texte für aktuelle sprache setzen und UI aktualisieren ===
function setLanguage(lang, content) {
  currentLanguage = lang;
  title.innerText = content[lang].title;
  subtitle.innerText = content[lang].subtitle;
  description.innerText = content[lang].text;
  startButtonText.innerText = content[lang].startButton;
  didYouKnow.innerText = content[lang].didYouKnow;
  nextButtonText.innerText = content[lang].next;

  localStorage.setItem("selectedLanguage", lang);
  updateLanguageSwitcher(lang);
}

// === position des hintergrunds im sprach-switcher aktualisieren ===
function updateLanguageSwitcher(lang) {
  const spans = languageSwitcher.querySelectorAll(".navigation-text");
  spans.forEach((span) => (span.style.cursor = "pointer"));

  const activeSpan = Array.from(spans).find(
    (span) => span.textContent.toLowerCase() === lang
  );

  if (activeSpan) {
    const rect = activeSpan.getBoundingClientRect();
    const containerRect = languageSwitcher.getBoundingClientRect();

    langBackground.style.width = `${rect.width}px`;
    langBackground.style.height = `${rect.height}px`;
    langBackground.style.left = `${rect.left - containerRect.left}px`;
    langBackground.style.top = `${rect.top - containerRect.top}px`;
  }
}

// === fakt laden und im DOM anzeigen ===
async function showFact() {
  const fact = await loadFact();
  factElement.textContent = fact;
  factElement.classList.add("fade-delayed");
}

// === wenn "Start"-Button geklickt wird ===
startButton.addEventListener("click", async () => {
  // startbutton animieren
  startButton.classList.add("expand");
  startButtonText.style.opacity = "0";

  // textbox anzeigen
  setTimeout(() => {
    textbox.classList.add("visible");
    startButton.style.opacity = "0";
    startButton.style.pointerEvents = "none";

    // elemente nacheinander anzeigen (text, herz, button)
    setTimeout(async () => {
      didYouKnow.classList.add("fade-delayed");
      setTimeout(() => herz.classList.add("fade-delayed"), 200);
      setTimeout(() => nextButton.classList.add("fade-delayed"), 300);

      await showFact(); // fakt laden
    }, 300);
  }, 300);
});

// === wenn "Next"-Button geklickt wird ===
nextButton.addEventListener("click", showFact);

// === seite initial laden ===
(async () => {
  const content = await loadTranslations(); // übersetzungen laden
  const supportedLanguages = Object.keys(content);

  // falls sprache nicht unterstützt wird → fallback
  if (!supportedLanguages.includes(currentLanguage)) {
    currentLanguage = "de";
  }

  // sprache setzen und fakt anzeigen
  setLanguage(currentLanguage, content);
  await showFact();

  // auf klick im sprachmenü reagieren
  languageSwitcher.addEventListener("click", async (event) => {
    const clickedLang = event.target.textContent.toLowerCase();
    if (supportedLanguages.includes(clickedLang)) {
      setLanguage(clickedLang, content);
      await showFact();
    }
  });

// language navigation animiern
  const languageWrapper = document.querySelector(".navigation-language");
const highlight = document.querySelector(".language-highlight");

languageWrapper.addEventListener("click", (e) => {
  const clicked = e.target.closest(".navigation-text");
  if (!clicked) return;

  const lang = clicked.dataset.lang;
  if (lang === "DE") {
    highlight.style.transform = "translateX(0%)";
  } else if (lang === "EN") {
    highlight.style.transform = "translateX(100%)";
  }

  localStorage.setItem("lang", lang);
});

const navSites = document.querySelector('.navigation-sites');
const navImages = navSites.querySelectorAll('img');


// Klick-Logik zum Umschalten
navImages.forEach((img, index) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    setActiveNav(index);
    // Optional: Hier kannst du auch Seitenwechsel oder Logik auslösen
  });
});

// Favoritenfunktionen

const factElement = document.querySelector(".text-fact");

// Herz-Symbol Referenz holen
const herz = document.querySelector(".herz-icon");

if (herz) {
  herz.addEventListener("click", () => {
    const currentFact = factElement.textContent.trim();
    if (!currentFact) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Verhindern von Duplikaten
    if (!favorites.includes(currentFact)) {
      favorites.unshift(currentFact); // Neuster Fakt oben
      localStorage.setItem("favorites", JSON.stringify(favorites));
      herz.classList.add("marked"); // z. B. CSS-Effekt
    }
  });
}


})();