const { defineConfig } = require("cypress");

module.exports = defineConfig({
   reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    env: {
      basicAuthUser: "guest",
      basicAuthPass: "welcome2qauto",
      appName: "qauto",
          },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});

