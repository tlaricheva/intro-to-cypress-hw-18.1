class RegisterPage {
  open() {
    cy.openApp("/");
  }

  openRegistration() {
    cy.contains("Sign up").click();
  }

  fillForm({ name, lastName, email, password }) {
    cy.get("#signupName").type(name);
    cy.get("#signupLastName").type(lastName);
    cy.get("#signupEmail").type(email, { sensitive: true });
    cy.get("#signupPassword").type(password, { sensitive: true });
    cy.get("#signupRepeatPassword").type(password, { sensitive: true });
  }

  submit() {
    cy.contains("button", "Register").click();
  }

  assertRegistered() {
    
    cy.contains("Garage").should("be.visible");
  }
}

export default new RegisterPage();


