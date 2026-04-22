describe('template spec', () => {

  beforeEach(() => {
    cy.intercept('GET', '**/api.thedogapi.com/v1/images/search*').as('getDogs');

    cy.visit("/index.html");

    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('page loads correctly', () => {
    cy.get('body').should('be.visible');
  });

  it("Página carrega corretamente", () => {
    cy.get(".header").should("be.visible");
    cy.get(".dog-grid").should("be.visible");
  });

  it("Confirma se as imagens dos cães estão sendo exibidas corretamente", () => {
    cy.wait('@getDogs', { timeout: 10000 });

    cy.get(".dog-card img", { timeout: 10000 })
      .should("have.length.at.least", 1);

    cy.get(".dog-card img").each(($img) => {
      cy.wrap($img)
        .should("be.visible")
        .and(($el) => {
          expect($el[0].src).to.not.be.empty;
        });
    });

    cy.get(".dog-card").should("have.length.at.least", 1);
  });

  it("Imagens da API aparecem", () => {
    cy.wait('@getDogs', { timeout: 10000 });

    cy.get(".dog-card img", { timeout: 10000 })
      .should("have.length.at.least", 1);
  });

  it("Navega para favoritos.html", () => {
    cy.get(".favorite-btn").click();
    cy.url().should("include", "favoritos.html");
    cy.contains("Favoritos").should("be.visible");
  });

  it("Mostra mensagem quando não há favoritos", () => {
    cy.visit("/favoritos.html");

    cy.contains("Nenhum favorito ainda!")
      .should("be.visible");
  });

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

    cy.get(".dog-card img", { timeout: 10000 })
      .should("have.length", 2)
      .and("be.visible");
  });

});
