import RegisterPage from "../pages/RegisterPage";
import GaragePage from "../pages/GaragePage";
import FuelExpensesPage from "../pages/FuelExpensesPage";


describe("HW 22.1 - API testing with Cypress", () => {
  it("creates car via UI and intercepts POST /api/cars", () => {
    const password = "Qauto12345!";
    const email = `tanya+api-${Date.now()}@example.com`;

    const user = {
      name: "Tanya",
      lastName: "QA",
      email,
      password,
    };

    const car = {
      brand: "Audi",
      model: "A6",
      mileage: 123,
    };

    // 1) Register + login (same flow as before)
    RegisterPage.open();
    RegisterPage.openRegistration();
    RegisterPage.fillForm(user);
    RegisterPage.submit();
    RegisterPage.assertRegistered();

    // 2) Intercept POST /api/cars
    cy.intercept("POST", "**/api/cars*").as("createCar");

    // 3) Create car via UI
    GaragePage.open();
    GaragePage.clickAddCar();
    GaragePage.fillCarForm(car);
    GaragePage.submitCar();
    
    // 4) Assert interception + save created car
cy.wait("@createCar").then(({ response }) => {
  expect(response, "response exists").to.exist;
  expect([200, 201], "status code").to.include(response.statusCode);

  const createdCar = response.body?.data ?? response.body;
  expect(createdCar, "createdCar body").to.exist;

  // 5) GET /api/cars and verify created car is in the list (HW 22.1 пункт 3)
  cy.request("GET", "/api/cars").then((carsRes) => {
    expect(carsRes.status, "GET /api/cars status").to.eq(200);

    const cars = carsRes.body?.data ?? carsRes.body;
    expect(cars, "cars list").to.be.an("array");

    const found = cars.find((c) => c.id === createdCar.id);
    expect(found, "created car is present in GET /api/cars").to.exist;
  });

  // 6) POST /api/expenses (HW 22.1 пункт 4) - create expense via API
  const today = new Date().toISOString().slice(0, 10);

  const expensePayload = {
    carId: createdCar.id,
    reportedAt: today,
    mileage: (createdCar.mileage ?? car.mileage) + 1,
    liters: 10,
    totalCost: 100,
  };

  cy.request({
    method: "POST",
    url: "/api/expenses",
    body: expensePayload,
    failOnStatusCode: false,
  }).then((expRes) => {
    cy.log("DEBUG POST /api/expenses status: " + expRes.status);
    cy.log("DEBUG POST /api/expenses body: " + JSON.stringify(expRes.body));

    expect([200, 201], "POST /api/expenses status").to.include(expRes.status);

    const createdExpense = expRes.body?.data ?? expRes.body;
    expect(createdExpense, "created expense body").to.exist;

    // 7) UI check (HW 22.1 пункт 5)
    FuelExpensesPage.open();
    FuelExpensesPage.assertExpenseVisible(expensePayload.totalCost);
  });
});

    });
  });


     