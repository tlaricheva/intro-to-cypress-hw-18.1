class FuelExpensesPage {
  open() {
    cy.openApp("/panel/expenses");
  }

  clickAddExpense() {
    cy.contains("button", "Add an expense")
      .should("be.visible")
      .click();
  }


  fillExpenseForm({ mileage, liters, totalCost, date }) {

    cy.contains(".modal-title", "Add an expense")
      .should("be.visible");


    cy.get("#addExpenseDate")
      .should("be.visible")
      .clear()
      .type(date)
      .blur();


    cy.get("#addExpenseMileage")
      .clear()
      .type(String(mileage))
      .blur();

    
    cy.get("#addExpenseLiters")
      .clear()
      .type(String(liters))
      .blur();

    
    cy.get("#addExpenseTotalCost")
      .clear()
      .type(String(totalCost))
      .blur();

    
    cy.contains("label", "Vehicle")
      .parent()
      .find("select")
      .should("exist")
      .should("be.enabled")
      .then(($select) => {
        const options = [...$select[0].options];
        const validOption = options.find(
          (o) => o.value && o.value.trim() !== ""
        );

        expect(
          validOption,
          "Vehicle select has a non-empty option"
        ).to.exist;

        cy.wrap($select)
          .select(validOption.value)
          .should("have.value", validOption.value);
      });

    
    cy.contains("button", "Add")
      .should("be.enabled");
  }

  submitExpense() {
    cy.contains(".modal-title", "Add an expense")
      .parents(".modal-content")
      .within(() => {
        cy.contains("button", "Add")
          .should("be.enabled")
          .click();
      });
  }

  assertExpenseVisible(totalCost) {
    cy.contains(String(totalCost))
      .should("be.visible");
  }
  assertExpenseRow({ carName, reportedAt, mileage, liters, totalCost }) {
    cy.get("#carSelectDropdown")
    .should("be.visible")
    .click();

 cy.contains(".dropdown-menu .dropdown-item", carName)
  .then(($item) => {
    const isDisabled =
      $item.hasClass("disabled") ||
      $item.attr("aria-disabled") === "true" ||
      $item.css("pointer-events") === "none";

    if (!isDisabled) {
      cy.wrap($item).click();
    } else {
          cy.log(`Car '${carName}' is already selected`);
    }
  });

  cy.contains("app-fuel-expenses", String(totalCost))
  .should("be.visible")
  .parents("tr, .expense-item, .row, .table-row")   
  .first()                                          
  .within(() => {
    cy.contains(carName).should("exist");
    const uiDate = reportedAt.split("-").reverse().join(".");
cy.contains(uiDate).should("exist");

    cy.contains(String(mileage)).should("exist");
    cy.contains(String(liters)).should("exist");
    cy.contains(String(totalCost)).should("exist");
  });

}


}

export default new FuelExpensesPage();


