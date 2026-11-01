require("dotenv").config();

module.exports = {
default: {
paths: ["tests/features/**/*.feature"],


requireModule: ["tsx/cjs"],

require: [
  "tests/step-definitions/**/*.ts",
  "tests/support/**/*.ts"
],

format: [
  "progress",
  "html:reports/cucumber-report.html"
],

publishQuiet: true


}
};
