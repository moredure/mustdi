const assert = require('assert');
const globalPath = require('path');
const globalCrypto = require('crypto');

/**
 * Shuriken class
 */
class Shuriken {
  /**
   * Shuriken
   * @singleton
   * @param {DiExternalDependency} path path
   * @param {DiExternalDependency} crypto crypto
   * @param {Logger} logger fuck
   */
  constructor(path, crypto, logger) {
    console.log(Shuriken.name);
    assert.equal(path, globalPath);
    assert.equal(crypto, globalCrypto);
    this._logger = logger;
  }
  /**
   * toss
   */
  toss(str) {
    this._logger.log(str);
  }
}

module.exports = Shuriken;
