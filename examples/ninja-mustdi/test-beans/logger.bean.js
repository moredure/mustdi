class Logger {
  /**
   * Logger constructor
   * @param {DiCaller} param1 param
   */
  constructor(className) {
    console.log(Logger.name);
    this._className = className;
  }
  log(...args) {
    console.log(this._className, args);
  }
}

module.exports = Logger;
