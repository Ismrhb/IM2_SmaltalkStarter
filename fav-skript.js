// Wenn favorites.html geladen ist:
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("favorites-list");
    if (!list) return;
  
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    if (favorites.length === 0) {
      list.innerHTML = "<li>Du hast noch keine Lieblingsfakten gespeichert.</li>";
      return;
    }
  
    favorites.forEach((fact) => {
      const li = document.createElement("li");
      li.textContent = fact;
      list.appendChild(li);
    });
  });

  // Seite laden
document.addEventListener('DOMContentLoaded', () => {
    const favoritenListe = document.querySelector('#favoritenListe');
    let favoriten = JSON.parse(localStorage.getItem('favoriten')) || [];
  
    favoriten.forEach(fav => {
      const li = document.createElement('li');
      li.textContent = fav.titel; // z. B. .titel, je nach deiner Struktur
      li.setAttribute('data-id', fav.id);
  
      const entfernenBtn = document.createElement('button');
      entfernenBtn.textContent = 'Entfernen';
      entfernenBtn.classList.add('entfernenBtn');
  
      entfernenBtn.addEventListener('click', () => {
        // 1. Aus dem Array löschen
        favoriten = favoriten.filter(item => item.id !== fav.id);
        // 2. Im localStorage aktualisieren
        localStorage.setItem('favoriten', JSON.stringify(favoriten));
        // 3. Aus dem DOM entfernen
        li.remove();
      });
  
      li.appendChild(entfernenBtn);
      favoritenListe.appendChild(li);
    });
  });
  