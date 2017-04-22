const globby = require('globby');
const path = require('path');

/**
 * Package class
 */
class Package {
  constructor(fullPath, classPathPatternsArray) {
    this._fullPath = fullPath;
    this._classPathPatterns = classPathPatternsArray;
  }
  getModules() {
    return globby
      .sync(this._classPathPatterns.map(this._joinDirName.bind(this)))
      .map(require.bind(require));
  }
  _joinDirName(pattern) {
    return path.join(this._fullPath, pattern);
  }
}

module.exports = Package;
