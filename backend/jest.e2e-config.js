const base = require('./package.json').jest;
module.exports = {
  ...base,
  "rootDir": "./../../..",
  "testRegex": ".e2e-spec.ts$",
  "roots": [
    "<rootDir>/libs/",
  ],
}
