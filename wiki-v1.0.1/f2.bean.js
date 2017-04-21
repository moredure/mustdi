class F2 {
  /**
   * F2 constructor
   * @constructor
   * @param  {F3} f3 [description]
   * @param  {S3} s3 [description]
   */
  constructor(f3, s3) {
    this.f3 = f3;
    this.s3 = s3;
    console.log(F2.name);
  }
  run() {
     this.s3.run();
  }
}

module.exports = F2;
