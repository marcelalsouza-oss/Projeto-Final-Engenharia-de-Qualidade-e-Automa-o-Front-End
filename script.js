// PinTheDogs JS - Busca e Interatividade
document.addEventListener('DOMContentLoaded', function() {
const searchInput = document.querySelector('.search-box input');
const dogCards = document.querySelectorAll('.dog-card');

  // Função para filtrar dogs pela busca
function filterDogs() {
    const term = searchInput.value.toLowerCase().trim();
    dogCards.forEach(card => {
    const name = card.dataset.dogName.toLowerCase();
    if (term === '' || name.includes(term)) {
        card.style.display = '';
    } else {
        card.style.display = 'none';
    }
    });
}

  // Evento de busca
searchInput.addEventListener('input', filterDogs);
});
