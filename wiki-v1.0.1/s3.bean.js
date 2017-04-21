const Promise = require('bluebird');
const pgPromise = require('pg-promise');
const pgp = pgPromise({
  promiseLib: Promise,
});

class S3 {
  /**
   * S3
   * @singleton
   * @constructor
   * @param {PgAdapter} db fucking shifts
   * { db: 'redshift:fuck',  }
   */
  constructor(db) {
    this.db = db;
  }
  /**
   * [run description]
   * @return {[type]} [description]
   */
  run() {
    console.log('holy shit');
  }
}

module.exports = S3;
