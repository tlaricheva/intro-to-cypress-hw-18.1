describe("Registration", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.contains("Sign up").click();
  });

  describe("Name / Last name", () => {
    it("Shows error when Name is empty", () => {
      cy.get("#signupName").focus().blur();
      cy.contains(/name\s+required/i).should("be.visible");
    });

    it("Shows error when Last name is empty", () => {
      cy.get("#signupLastName").focus().blur();
      cy.contains(/last\s+name\s+required/i).should("be.visible");
    });
  });

  describe("Email", () => {
    it("Shows error when Email is empty", () => {
      cy.get("#signupEmail").focus().blur();
      cy.contains(/email\s+required/i).should("be.visible");
    });

    it("Shows error when Email is incorrect", () => {
      cy.get("#signupEmail").type("test").blur();
      cy.contains(/email\s+is\s+incorrect/i).should("be.visible");
    });
  });

  describe("Password", () => {
    it("Shows error when Password is empty", () => {
      cy.get("#signupPassword").focus().blur();
      cy.contains(/password\s+required/i).should("be.visible");
    });

    it("Shows error when Password is too short", () => {
      cy.get("#signupPassword").type("1a").blur();
      cy.contains(/password\s+has\s+to\s+be\s+from\s+8\s+to\s+15/i).should("be.visible");
    });

    it("Shows error when Password doesn't contain at least one integer", () => {
      cy.get("#signupPassword").type("Abcdefgh").blur();
      cy.contains(/one\s+integer/i).should("be.visible");
    });

    it("Shows error when Password doesn't contain at least one capital letter", () => {
      cy.get("#signupPassword").type("abcde123");
      cy.get("#signupRepeatPassword").type("abcde123");
      cy.get("#signupPassword").focus().blur();

      cy.contains(/one\s+capital/i).should("be.visible");
    });

    it("Shows error when Password doesn't contain at least one small letter", () => {
      cy.get('#signupPassword').type('ABCDE123', { sensitive: true })
      cy.get('#signupRepeatPassword').type('ABCDE123', { sensitive: true })
      cy.get("#signupPassword").focus().blur();

      cy.contains(/one\s+small\s+letter/i).should("be.visible");
    });
  });

  describe("Re-enter password", () => {
    it("Shows error when Re-enter password is empty", () => {
      cy.get("#signupRepeatPassword").focus().blur();
      cy.contains(/re-enter\s+password\s+required/i).should("be.visible");
    });

    it("Shows error when passwords do not match", () => {
      cy.get("#signupPassword").type("Abcd1234", { sensitive: true })
      cy.get("#signupRepeatPassword").type("Abcd12345").blur();
      cy.contains(/passwords\s+do\s+not\s+match/i).should("be.visible");
    });
  });
});

