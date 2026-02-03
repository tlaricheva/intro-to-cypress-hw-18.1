import RegisterPage from "../pages/RegisterPage";

describe("Register smoke", () => {
  it("registers a new user", () => {
    const password = "Qauto12345!";
    const email = `tanya+${Cypress.env("appName") || "app"}-${Date.now()}@example.com`;

    const user = {
      name: "Tanya",
      lastName: "QA",
      email,
      password,
    };

    // REGISTER
    RegisterPage.open();
    RegisterPage.openRegistration();
    RegisterPage.fillForm(user);
    RegisterPage.submit();
    RegisterPage.assertRegistered();
  });
});
