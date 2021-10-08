

describe("Stimulus autocomplete", () => {
  beforeEach(() =>{
    cy.visit("/")
  })

  it("shows results", () => {
    cy.enterTerm("bird")
    cy.assertResultsVisible()
  })

  it("selects result with the keyboard", () => {
    cy.enterTerm("bird")
    cy.assertResultsVisible()

    cy.typeDownTwice()
    cy.assertSecondResultActive()
    cy.typeEnter()

    cy.assertSecondResultSelected()
  })

  it("selects result with the mouse", () => {
    cy.enterTerm("bird")
    cy.assertResultsVisible()

    cy.clickSecondResult()

    cy.assertSecondResultSelected()
  })
})


