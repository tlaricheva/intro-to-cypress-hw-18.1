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
    baseUrl: "https://qauto2.forstudy.space",

    env: {
      basicAuthUser: "guest",
      basicAuthPass: "welcome2qauto",
      appName: "qauto2",
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
