class GaragePage {
  open() {
    cy.openApp("/panel/garage");
  }

  clickAddCar() {
    cy.contains("button", "Add car")
      .should("be.visible")
      .click();

    cy.get(".modal-dialog").should("be.visible");
  }

  fillCarForm({ brand, model, mileage }) {
    // BRAND
    cy.get("#addCarBrand").select(brand);
  cy.get("#addCarModel").select(model);
  cy.get("#addCarMileage").clear().type(String(mileage));
}

     submitCar() {
  cy.get(".modal-dialog").should("be.visible").within(() => {
    cy.contains("button", "Add")
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  });
}

 



  assertCarVisible(model) {
  cy.contains(".car-item", String(model)).should("be.visible");
}
}

export default new GaragePage();



