describe("Stimulus autocomplete", () => {
  beforeEach(() =>{
  })

  it("shows results", () => {
    cy.loadPage()
    cy.enterTerm("bird")
    cy.assertResultsVisible()
  })

  it("selects result with the keyboard", () => {
    cy.loadPage()
    cy.enterTerm("bird")
    cy.assertResultsVisible()

    cy.typeDownTwice()
    cy.assertSecondResultActive()
    cy.typeEnter()

    cy.assertSecondResultSelected()
  })

  it("selects result with the mouse", () => {
    cy.loadPage()
    cy.enterTerm("bird")
    cy.assertResultsVisible()

    cy.clickSecondResult()

    cy.assertSecondResultSelected()
  })

  it("can extract the text value from a data attribute", () => {
    cy.loadPage("/complex.html")
    cy.enterTerm("bird")
    cy.assertResultsVisible()

    cy.typeDownTwice()
    cy.typeEnter()

    cy.assertSecondResultSelected("Bluebird (Sialia currucoides)")
  })

  it("accepts a custom selected class", () => {
    cy.loadPage("/custom-active-class.html")
    cy.enterTerm("bird")
    cy.assertResultsVisible()

    cy.typeDownTwice()
    cy.assertSecondResultActive("selected-result")
  })

  it("emits events", () => {
    cy.loadPage("/events.html")
    cy.enterTerm("bird")
    cy.assertResultsVisible()

    cy.assertEventEmitted("toggle")
    cy.assertEventEmitted("loadstart")
    cy.assertEventEmitted("load")
    cy.assertEventEmitted("loadend")

    cy.typeDownTwice()
    cy.typeEnter()

    cy.assertEventEmitted("autocomplete.change")
  })
})


