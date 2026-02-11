// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element' }, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional' }, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("openApp", (path = "/") => {
  cy.visit(path, {
    auth: {
      username: Cypress.env("basicAuthUser"),
      password: Cypress.env("basicAuthPass"),
    },
  });
});

/**
 * Create car via API.
 * Used as stable test data setup (especially when UI in qauto2 returns 500 on POST /api/cars).
 */
Cypress.Commands.add("createCarByApi", ({ brand, model, mileage }) => {
  // 1) get brands
  return cy.request("GET", "/api/cars/brands").then((brandsRes) => {
    expect(brandsRes.status).to.eq(200);

    const brands = brandsRes.body && brandsRes.body.data;
    const foundBrand = brands.find((b) => b.title === brand);
    expect(foundBrand, "Brand found by title: " + brand).to.exist;

    const carBrandId = foundBrand.id;

    // 2) get models by brand id
    return cy.request("GET", `/api/cars/models?carBrandId=${carBrandId}`).then((modelsRes) => {
      expect(modelsRes.status).to.eq(200);

      const models = modelsRes.body && modelsRes.body.data;
      const foundModel = models.find((m) => m.title === model);
      expect(foundModel, "Model found by title: " + model).to.exist;

      const carModelId = foundModel.id;

      // 3) create car
      return cy.request({
        method: "POST",
        url: "/api/cars",
        failOnStatusCode: false,
        body: {
          carBrandId,
          carModelId,
          mileage,
        },
      }).then((createRes) => {
        cy.log("DEBUG createCar API status: " + createRes.status);
        cy.log("DEBUG createCar API body: " + JSON.stringify(createRes.body));

        expect([200, 201], "createCar API status").to.include(createRes.status);
        return createRes;
      });
    });
  });
 });
 /**
 * Create expense via API
 */
Cypress.Commands.add("createExpenseApi", (expensePayload) => {
  return cy.request({
    method: "POST",
    url: "/api/expenses",
    body: expensePayload,
    failOnStatusCode: false,
  });
});

