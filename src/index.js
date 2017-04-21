/**
 * Namespace object
 * @type {Object}
 */
const Di = {
  Package: require('./beans/package.bean.js'),
  Container: require('./beans/container.bean.js'),
  RecursiveDiStrategy: require('./beans/recursive-di-strategy.bean.js'),
};

module.exports = Di;
