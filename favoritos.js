// Página 1 — busca + curtir
document.addEventListener('DOMContentLoaded', function () {
 
  const searchInput = document.querySelector('.search-box input');
  const dogCards = document.querySelectorAll('.dog-card');
 
  // Busca
  searchInput.addEventListener('input', function () {
    const term = searchInput.value.toLowerCase().trim();
    dogCards.forEach(card => {
      const name = card.dataset.dogName.toLowerCase();
      card.style.display = (term === '' || name.includes(term)) ? '' : 'none';
    });
  });
 
  // Curtir — salva no localStorage
  dogCards.forEach(card => {
    const checkbox = card.querySelector('.heart-check');
    const breed = card.dataset.dogName.toLowerCase().replace('dog ', '');
 
    checkbox.addEventListener('change', function () {
      const favs = JSON.parse(localStorage.getItem('pinthedogs_favorites') || '[]');
 
      if (checkbox.checked) {
        if (!favs.includes(breed)) favs.push(breed);
      } else {
        const idx = favs.indexOf(breed);
        if (idx !== -1) favs.splice(idx, 1);
      }
 
      localStorage.setItem('pinthedogs_favorites', JSON.stringify(favs));
    });
  });
 
});