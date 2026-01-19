describe("Footer links", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space", {
      auth: { username: "guest", password: "welcome2qauto" },
    });
    cy.scrollTo("bottom");
  });

  it("Has website link (ithillel.ua)", () => {
    cy.get("a[href='https://ithillel.ua']").should("be.visible");
  });

  it("Has email link", () => {
    cy.get("a[href^='mailto:developer@ithillel.ua']").should("be.visible");
  });

  it("Has all social links", () => {
    cy.get("a[href*='facebook.com/Hillel.IT.School']").should("exist");
    cy.get("a[href*='t.me/ithillel_kyiv']").should("exist");
    cy.get("a[href*='youtube.com/user/HillelITSchool']").should("exist");
    cy.get("a[href*='instagram.com/hillel_itschool']").should("exist");
    cy.get("a[href*='linkedin.com/school/ithillel']").should("exist");
  });
});
