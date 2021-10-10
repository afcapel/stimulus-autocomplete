const input = "input[name=birds]"
const hidden = "input[name=bird_id]"
const optionSelector = "li[role=option]"
const secondOption = "li[data-autocomplete-value='2']"

Cypress.Commands.add("loadPage", (path = "/") => {
  cy.visit(path)
  cy.get("[data-autocomplete-ready-value]").should("be.visible")
})

Cypress.Commands.add("enterTerm", (term) => {
  cy.get(input).type(term)
})

Cypress.Commands.add("assertResultsVisible", () => {
  cy.get(optionSelector).should("have.length", 3)
})

Cypress.Commands.add("typeDownTwice", () => {
  cy.get(input).type("{downarrow}{downarrow}")
})

Cypress.Commands.add("typeEnter", () => {
  cy.get(input).type("{enter}")
})

Cypress.Commands.add("clickSecondResult", () => {
  cy.get(secondOption).click()
})

Cypress.Commands.add("assertSecondResultActive", (selectedClass = "active") => {
  cy.get(secondOption).should("have.class", selectedClass)
})

Cypress.Commands.add("assertSecondResultSelected", () => {
  cy.get(input).should("have.value", "Bluebird")
  cy.get(hidden).should("have.value", "2")
})
