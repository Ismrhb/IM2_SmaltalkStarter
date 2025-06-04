const url = 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=de';

async function loadFacts() {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Funktion zum Fakt anzeigen
async function zeigeFakt() {
    const fakt = await loadFacts();
    if (fakt && fakt.text) {
        document.querySelector("#fact").textContent = fakt.text;
    } else {
        document.querySelector("#fact").textContent = "Fehler beim Laden des Fakts.";
    }
}

// Klick-Events für beide Buttons
document.querySelector("#button-next").addEventListener("click", zeigeFakt);


const startBtn = document.getElementById("button-start");
const textbox = document.getElementById("textboxelement");

startBtn.addEventListener("click", () => {
  startBtn.classList.add("fade-out");
  textbox.classList.add("fade-in");
});


// === Eventlistener für Startbutton ===
document.querySelector("#button-start").addEventListener("click", async () => {
    // === Referenzen auf HTML-Elemente ===
    const button = document.querySelector("#button-start");
    const textbox = document.querySelector("#textboxelement");
    const factEl = document.querySelector("#fact");
    const header = textbox.querySelector(".text-texbox-fett");
    const herz = textbox.querySelector(".herz-icon");
    const next = document.querySelector("#button-next");

    // === Startanimation: Button wird vergrößert ===
    button.classList.add("expand");
    button.querySelector("p").style.opacity = "0"; // Text im Button ausblenden

    // === Nach kurzer Verzögerung: Textbox einblenden ===
    setTimeout(() => {
        textbox.classList.add("fade-in"); // Textbox sichtbar machen
        button.style.opacity = "0";       // Button komplett ausblenden
        button.style.pointerEvents = "none"; // Button deaktivieren

        // === Weitere Verzögerung: Inhalte der Textbox nacheinander einblenden ===
        setTimeout(async () => {
            header.classList.add("fade-delayed"); // Titel einblenden

            // Herzsymbol verzögert einblenden
            setTimeout(() => herz.classList.add("fade-delayed"), 200);

            // "Next"-Button verzögert einblenden
            setTimeout(() => {
                next.classList.add("fade-delayed");

                // Eventlistener für den "Next"-Button
                next.addEventListener("click", async () => {
                    const fact = await loadFacts();
                    if (fact && fact.text) {
                        factEl.textContent = fact.text; // Neuen Fakt anzeigen
                    }
                });
            }, 300);

            // === Ersten Fakt direkt nach Einblendung anzeigen ===
            const fact = await loadFacts();
            if (fact && fact.text) {
                factEl.textContent = fact.text;
                factEl.classList.add("fade-delayed");
            }
        }, 300); // Ende innerer Timeout
    }, 300); // Ende äußerer Timeout
});

// "Next"-Button Event
document.getElementById("button-next").addEventListener("click", async () => {
    const fact = await loadFacts();
    if (fact && fact.text) {
        document.getElementById("fact").textContent = fact.text;
    }
});

  // === JavaScript: Sprachumschaltung + Übersetzungen + Fakten laden ===

let currentLanguage = localStorage.getItem('selectedLanguage') || navigator.language.slice(0, 2);

const title = document.querySelector('.titel');
const subtitle = document.querySelector('.untertitel');
const description = document.querySelector('.text');
const startButton = document.querySelector('#button-start p');
const didYouKnow = document.querySelector('.text-texbox-fett');
const nextButton = document.querySelector('.text-button-next-fett');
const factElement = document.getElementById("fact");
const languageSwitcher = document.querySelector('.navigation-language');

// Dynamisches Hintergrundelement für aktive Sprache hinzufügen
const langBackground = document.createElement('div');
langBackground.style.position = 'absolute';
langBackground.style.backgroundColor = '#bfbfbf'; // dunkler als #D9D9D9
langBackground.style.borderRadius = '8px';
langBackground.style.transition = 'all 0.3s ease';
langBackground.style.zIndex = '-1';
languageSwitcher.style.position = 'relative';
languageSwitcher.appendChild(langBackground);

async function loadTranslations() {
  try {
    const response = await fetch('assets/translations.json');
    return await response.json();
  } catch (error) {
    console.error('Fehler beim Laden der Übersetzungen:', error);
    return {};
  }
}

function setLanguage(language, content) {
  currentLanguage = language;
  title.innerText = content[language].title;
  subtitle.innerText = content[language].subtitle;
  description.innerText = content[language].text;
  startButton.innerText = content[language].startButton;
  didYouKnow.innerText = content[language].didYouKnow;
  nextButton.innerText = content[language].next;
  localStorage.setItem('selectedLanguage', language);
  updateLanguageSwitcher(language);
}

function updateLanguageSwitcher(currentLanguage) {
  const spans = languageSwitcher.querySelectorAll('.navigation-text');
  spans.forEach(span => {
    span.style.cursor = 'pointer';
  });

  const activeSpan = Array.from(spans).find(span => span.textContent.toLowerCase() === currentLanguage);
  if (activeSpan) {
    const rect = activeSpan.getBoundingClientRect();
    const containerRect = languageSwitcher.getBoundingClientRect();
    langBackground.style.width = `${rect.width}px`;
    langBackground.style.height = `${rect.height}px`;
    langBackground.style.left = `${rect.left - containerRect.left}px`;
    langBackground.style.top = `${rect.top - containerRect.top}px`;
  }
}

async function loadFact() {
  const apiUrl = `https://uselessfacts.jsph.pl/api/v2/facts/random?language=${currentLanguage}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Fehler beim Laden des Fakts:', error);
    return "Fehler beim Laden des Fakts.";
  }
}

// Fakt anzeigen bei Klick auf Next
nextButton.parentElement.addEventListener("click", async () => {
  const fact = await loadFact();
  factElement.textContent = fact;
});

(async () => {
  const content = await loadTranslations();
  const supportedLanguages = Object.keys(content);

  if (!supportedLanguages.includes(currentLanguage)) currentLanguage = 'de';

  setLanguage(currentLanguage, content);

  languageSwitcher.addEventListener('click', async (e) => {
    const clickedLang = e.target.textContent.toLowerCase();
    if (supportedLanguages.includes(clickedLang)) {
      setLanguage(clickedLang, content);
      const fact = await loadFact();
      factElement.textContent = fact;
    }
  });
})();
