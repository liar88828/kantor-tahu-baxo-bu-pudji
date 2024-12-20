import { defineConfig } from "cypress";
// "cypress": "^13.16.0",

export default defineConfig( {
  e2e      : {

    baseUrl: "http://localhost:3000",
    setupNodeEvents( on, config ) {
      // implement node event listeners here
    },
  },
  component: {

    devServer: {
      framework: "next",
      bundler  : "webpack",
    },
  },

} );
