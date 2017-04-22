const assert = require('assert');
const globalPath = require('path');
const globalCrypto = require('crypto');

class Shuriken {
  /**
   * Shuriken
   * @param {DiExternalDependency} path path
   * @param {DiExternalDependency} crypto crypto
   * @param {DiExternalDependency} hola punycode
   */
  constructor(path, crypto, punycode) {
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
