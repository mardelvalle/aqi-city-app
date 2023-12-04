/// <reference types="cypress" />

context('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('renders loading state', () => {
    cy.get('[data-testid=loading]').should('exist')
  })

  it('changes city details when city is selected', () => {
    cy.get('[data-testid=tokyo').click()
    cy.get('[data-testid=city-name').should('contain', 'Tokyo')
  })

  it('does not show legend by default', () => {
    cy.get('[data-testid=aqi-table').should('not.exist')
    cy.get('[data-testid=aqi-link').should('not.exist')
  })

    it('can have legend visible by toggling a switch', () => {
    cy.get('[data-testid=aqi-scale-switch').click()
    cy.get('[data-testid=aqi-table').should('exist')
    cy.get('[data-testid=aqin-link').should('exist')
    cy.get('[data-testid=aqi-scale-switch').click()
    cy.get('[data-testid=aqi-table').should('not.exist')
    cy.get('[data-testid=aqi-aqin-link').should('not.exist')
  })
})
