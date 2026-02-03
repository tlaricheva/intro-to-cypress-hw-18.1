class LoginPage {
  open() {
    cy.openApp("/");
  }

  login(email, password) {
    cy.contains("button", "Sign In").click();

    cy.get("#signinEmail").type(email, { sensitive: true });
    cy.get("#signinPassword").type(password, { sensitive: true });
    cy.contains("button", "Login").click();
  }
}

export default new LoginPage();
