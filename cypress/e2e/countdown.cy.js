describe("Launch Countdown Timer", () => {
  it("loads the page and shows all time units", () => {
    cy.visit("/");

    cy.title().should("contain", "Launch Countdown Timer");
    cy.get('meta[name="description"]')
      .should("have.attr", "content")
      .and("contain", "countdown timer");

    cy.contains("h2", "DAYS").should("be.visible");
    cy.contains("h2", "HOURS").should("be.visible");
    cy.contains("h2", "MINUTES").should("be.visible");
    cy.contains("h2", "SECONDS").should("be.visible");

    const expectTwoDigits = (selector) => {
      cy.get(selector)
        .first()
        .invoke("text")
        .then((t) => t.trim())
        .should("match", /^\d{2}$/);
    };

    expectTwoDigits(".days");
    expectTwoDigits(".hours");
    expectTwoDigits(".minutes");
    expectTwoDigits(".seconds");
  });
});
