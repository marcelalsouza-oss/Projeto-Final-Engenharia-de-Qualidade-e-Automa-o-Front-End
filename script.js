const API_KEY = "live_7gaBlmKKZul8IM4Nv2kM0qvp2U6wMrbtqrZS5gDagmFEZYD2zTejSDatOEYPBuBO";
const cards = document.querySelectorAll(".dog-card");

function getFavorites() {
  return JSON.parse(localStorage.getItem('pinthedogs_favorites') || '[]');
}

function saveFavorites(favorites) {
  localStorage.setItem('pinthedogs_favorites', JSON.stringify(favorites));
}

function toggleFavorite(card, img, checkbox) {
  let favorites = getFavorites();

  const existingIndex = favorites.findIndex(f => f.url === img.src);

  if (checkbox.checked) {
    if (existingIndex === -1) {
      favorites.push({
        name: card.dataset.dogName,
        url: img.src
      });
    }
  } else {
    if (existingIndex !== -1) {
      favorites.splice(existingIndex, 1);
    }
  }

  saveFavorites(favorites);
}

async function carregarDogs() {
  try {
    const response = await fetch(
      `https://api.thedogapi.com/v1/images/search?limit=${cards.length}`,
      {
        headers: {
          "x-api-key": API_KEY
        }
      }
    );

    const data = await response.json();
    const favorites = getFavorites();

    cards.forEach((card, index) => {
      const img = card.querySelector("img");
      const checkbox = card.querySelector('.heart-check');

      if (data[index]) {
        img.src = data[index].url;

        // Marca se já é favorito
        const isFav = favorites.some(fav => fav.url === img.src);
        checkbox.checked = isFav;

        // Evento de curtir
        checkbox.addEventListener('change', () => {
          toggleFavorite(card, img, checkbox);
        });
      }
    });

  } catch (error) {
    console.error("Erro:", error);
  }
}

carregarDogs();
