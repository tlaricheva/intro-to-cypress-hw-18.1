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
    // ждём модалку
    cy.contains(".modal-title", "Add an expense")
      .should("be.visible");

    // DATE — только реальный ввод
    cy.get("#addExpenseDate")
      .should("be.visible")
      .clear()
      .type(date)
      .blur();

    // MILEAGE
    cy.get("#addExpenseMileage")
      .clear()
      .type(String(mileage))
      .blur();

    // LITERS
    cy.get("#addExpenseLiters")
      .clear()
      .type(String(liters))
      .blur();

    // TOTAL COST
    cy.get("#addExpenseTotalCost")
      .clear()
      .type(String(totalCost))
      .blur();

    // VEHICLE — ключевой момент
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

    // контрольная точка — форма валидна
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
}

export default new FuelExpensesPage();
