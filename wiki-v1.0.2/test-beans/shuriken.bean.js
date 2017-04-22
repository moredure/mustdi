const assert = require('assert');
const globalPath = require('path');
const globalCrypto = require('crypto');

/**
 * Shuriken class
 */
class Shuriken {
  /**
   * Shuriken
   * @param {DiExternalDependency} path path
   * @param {DiExternalDependency} crypto crypto
   */
  constructor(path, crypto) {
    assert.equal(path, globalPath);
    assert.equal(crypto, globalCrypto);
  }
  /**
   * toss
   */
  toss() {
    console.log('tos');
  }
}

module.exports = Shuriken;
