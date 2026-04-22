describe('template spec', () => {
  it('passes', () => {
    cy.visit('file:///C:/Users/aluno.senai/Desktop/pindogs/index.html')
    cy.get('body').should('be.visible')
    cy.get('#heart1').click({force:true})
    cy.get('input[type="text"][placeholder="Pesquise seu aumigo..."]').type('Dog 1')
  })
})
