const API_KEY = "live_7gaBlmKKZul8IM4Nv2kM0qvp2U6wMrbtqrZS5gDagmFEZYD2zTejSDatOEYPBuBO";

const cards = document.querySelectorAll(".dog-card");

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

    cards.forEach((card, index) => {
      const img = card.querySelector("img");

      if (data[index]) {
        img.src = data[index].url;
      }
    });

  } catch (error) {
    console.error("Erro:", error);
  }
}

carregarDogs();
