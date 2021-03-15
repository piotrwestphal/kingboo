const base = require('../../../jest.e2e-config');
module.exports = {
  ...base,
  roots: [
    ...base.roots,
    "<rootDir>/apps/data-collector/test/",
  ],
}
