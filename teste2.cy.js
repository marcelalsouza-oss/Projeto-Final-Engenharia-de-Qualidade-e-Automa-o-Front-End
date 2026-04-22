describe("PintheDogs - Teste completo", () => {

  beforeEach(() => {
    cy.visit("/index.html");
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it("Página carrega corretamente", () => {
    cy.get(".header").should("be.visible");
    cy.get(".dog-grid").should("be.visible");
  });

  it("Imagens da API aparecem", () => {
    cy.get(".dog-card img", { timeout: 10000 })
      .should("have.length.at.least", 1);

    cy.get(".dog-card img").each(($img) => {
      cy.wrap($img)
        .should("be.visible")
        .and(($el) => {
          expect($el[0].src).to.not.be.empty;
        });
    });
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