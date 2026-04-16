describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/index.html')
    cy.get('body').should('be.visible')
    cy.get('#heart1').click({force:true})
    cy.get('input[type="text"][placeholder="Pesquise seu aumigo..."]').type('Dog 1')
  })
})