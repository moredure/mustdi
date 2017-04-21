class F1 {
  /**
   * F1 constructor
   * @constructor
   * @param  {F2} f2 f2
   */
  constructor(f2) {
    this.f2 = f2;
    console.log(F1.name);
  }
  run() {
    this.f2.run();
  }
}

module.exports = F1;
