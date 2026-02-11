import LoginPage from "../pages/LoginPage";

describe("Login smoke", () => {
  it("logs in successfully", () => {
    const email = "test@example.com";
    const password = "123456";

    LoginPage.open();
    LoginPage.login(email, password);

    cy.contains("Garage").should("be.visible");
  });
});
