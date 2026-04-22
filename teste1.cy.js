describe('template spec', () => {

  // 🔹 CICLO DE VIDA
  // beforeEach: reseta o estado antes de cada teste
  beforeEach(() => {
    cy.intercept('GET', '**/api.thedogapi.com/v1/images/search*').as('getDogs');

    cy.visit("/index.html");

    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  // 🔹 ASSERÇÃO DE UI
  it('page loads correctly', () => {
    cy.get('body').should('be.visible');
  });

  // 🔹 ASSERÇÕES DE UI
  it("Página carrega corretamente", () => {
    cy.get(".header").should("be.visible");
    cy.get(".dog-grid").should("be.visible");
  });

  // 🔹 INTEGRAÇÃO + UI
  // Integração: valida dados da API
  // UI: valida renderização na tela
  it("Confirma se as imagens dos cães estão sendo exibidas corretamente", () => {
    cy.wait('@getDogs', { timeout: 10000 });

    // UI + Integração (dados da API renderizados)
    cy.get(".dog-card img", { timeout: 10000 })
      .should("have.length.at.least", 1);

    // UI (validação visual de cada imagem)
    cy.get(".dog-card img").each(($img) => {
      cy.wrap($img)
        .should("be.visible")
        .and(($el) => {
          expect($el[0].src).to.not.be.empty;
        });
    });

    cy.get(".dog-card").should("have.length.at.least", 1);
  });

  // 🔹 INTEGRAÇÃO
  it("Imagens da API aparecem", () => {
    cy.wait('@getDogs', { timeout: 10000 });

    // Integração (dados vindos da API aparecem na tela)
    cy.get(".dog-card img", { timeout: 10000 })
      .should("have.length.at.least", 1);
  });

  // 🔹 NAVEGAÇÃO + UI
  it("Navega para favoritos.html", () => {
    cy.get(".favorite-btn").click();

    // Navegação (valida mudança de URL)
    cy.url().should("include", "favoritos.html");

    // UI (conteúdo visível na nova página)
    cy.contains("Favoritos").should("be.visible");
  });

  // 🔹 ASSERÇÃO DE UI
  it("Mostra mensagem quando não há favoritos", () => {
    cy.visit("/favoritos.html");

    cy.contains("Nenhum favorito ainda!")
      .should("be.visible");
  });

  // 🔹 INTEGRAÇÃO + UI
  it("Renderiza favoritos salvos no localStorage", () => {
    cy.window().then((win) => {
      win.localStorage.setItem(
        "pinthedogs_favorites",
        JSON.stringify([
          { url: "https://example.com/dog1.jpg", name: "Dog 1" },
          { url: "https://example.com/dog2.jpg", name: "Dog 2" }
        ])
      );
    });

    cy.visit("/favoritos.html");

    // Integração (dados persistidos sendo usados)
    // UI (renderização na tela)
    cy.get(".dog-card img", { timeout: 10000 })
      .should("have.length", 2)
      .and("be.visible");
  });

});
