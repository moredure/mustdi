/**
 * Ninja class
 */
class Ninja {
  /**
   * Ninja
   * @param {Shuriken} shuriken shuriken
   */
  constructor(shuriken) {
    this._shuriken = shuriken;
  }
  /**
   * Some method
   */
  run() {
    this._shuriken.toss();
  }
}

module.exports = Ninja;
