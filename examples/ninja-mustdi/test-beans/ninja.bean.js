/**
 * Ninja class
 */
class Ninja {
  /**
   * Ninja
   * @param {Shuriken} shuriken shuriken
   * @param {Logger} logger fuck
   */
  constructor(shuriken, logger) {
    console.log(Ninja.name);
    this._shuriken = shuriken;
    this._logger = logger;
  }
  /**
   * Some method
   */
  run() {
    this._shuriken.toss("this._fuck.name");
    this._logger.log('hola', 0xBeeF)
  }
}

module.exports = Ninja;
