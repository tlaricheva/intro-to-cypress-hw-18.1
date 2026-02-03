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
    cy.get("#addCarBrand")
      .should("be.visible")
      .then(($select) => {
        const options = Array.from($select[0].options);
        const brandText = String(brand).trim();
        const target = options.find((o) => o.text.trim() === brandText);

        expect(target, "Brand option exists: " + brandText).to.exist;

        cy.wrap($select)
          .select(target.value)
          .should("have.value", target.value);
      });

    // MODEL options loaded
    cy.get("#addCarModel")
      .should("be.visible")
      .should("not.be.disabled")
      .find("option")
      .should(($opts) => {
        const real = Array.from($opts).filter((o) => o.value && o.value.trim() !== "");
        expect(real.length, "Model options loaded").to.be.greaterThan(0);
      });

    // MODEL select
    cy.get("#addCarModel").then(($select) => {
      const options = Array.from($select[0].options);
      const modelText = String(model).trim();
      const target = options.find((o) => o.text.trim() === modelText);

      expect(target, "Model option exists: " + modelText).to.exist;

      cy.wrap($select)
        .select(target.value)
        .should("have.value", target.value);
    });

    // MILEAGE
    cy.get("#addCarMileage")
      .clear()
      .type(String(mileage))
      .blur();

    // кнопка Add должна быть enabled
    cy.contains(".modal-dialog button", "Add")
      .should("be.enabled");
  }

 submitCar() {
  cy.intercept("POST", "**/api/cars").as("createCar");

  cy.get(".modal-dialog").within(() => {
    cy.contains("button", "Add")
      .should("be.enabled")
      .click();
  });

  cy.wait("@createCar").then((interception) => {
    const reqBody = interception.request && interception.request.body;
    const res = interception.response;

    cy.log("DEBUG request body: " + JSON.stringify(reqBody));
    cy.log("DEBUG response status: " + (res && res.statusCode));
    cy.log("DEBUG response body: " + JSON.stringify(res && res.body));

    expect(res, "createCar response exists").to.exist;
    expect([200, 201], "createCar status").to.include(res.statusCode);
  });
}


  assertCarVisible(model) {
  cy.contains(".car-item", String(model)).should("be.visible");
}
}

export default new GaragePage();



