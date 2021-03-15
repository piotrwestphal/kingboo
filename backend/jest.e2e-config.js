const base = require('./package.json').jest;
module.exports = {
  ...base,
  "rootDir": "./../../..",
  "testRegex": ".spec-e2e.ts$",
  "roots": [
    "<rootDir>/libs/",
  ],
}
