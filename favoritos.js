document.addEventListener('DOMContentLoaded', function () {
 
  const dogGrid = document.querySelector('.dog-grid');
  const favorites = JSON.parse(localStorage.getItem('pinthedogs_favorites') || '[]');
 
  // Limpa os cards estáticos do HTML
  dogGrid.innerHTML = '';
 
  if (favorites.length === 0) {
    dogGrid.innerHTML = '<p style="color:#6b3b1f; font-size:18px; grid-column: 1/-1; text-align:center; margin-top:40px;">Nenhum favorito ainda!</p>';
    return;
  }
 
  favorites.forEach(function (fav) {
    const card = document.createElement('div');
    card.classList.add('dog-card');
 
    const img = document.createElement('img');
    img.src = fav.url;
    img.alt = fav.name;
    img.style.cssText = 'width:100%; height:100%; object-fit:cover; border-radius:14px;';
 
    // Botão de remover favorito
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '&#10006;';
    removeBtn.title = 'Remover dos favoritos';
    removeBtn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(0,0,0,0.45);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 26px;
      height: 26px;
      cursor: pointer;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
 
    removeBtn.addEventListener('click', function () {
      // Remove do localStorage
      const updated = JSON.parse(localStorage.getItem('pinthedogs_favorites') || '[]')
        .filter(f => f.url !== fav.url);
      localStorage.setItem('pinthedogs_favorites', JSON.stringify(updated));
 
      // Remove o card da tela
      card.remove();
 
      // Mostra mensagem se ficou vazio
      if (dogGrid.querySelectorAll('.dog-card').length === 0) {
        dogGrid.innerHTML = '<p style="color:#6b3b1f; font-size:18px; grid-column: 1/-1; text-align:center; margin-top:40px;">Nenhum favorito ainda!</p>';
      }
    });
 
    card.appendChild(img);
    card.appendChild(removeBtn);
    dogGrid.appendChild(card);
  });
 
});
