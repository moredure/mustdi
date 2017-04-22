/**
 * Namespace object
 * @type {Object}
 */
const Di = {
  Package: require('./beans/package.bean.js'),
  Container: require('./beans/container.bean.js'),
  RecursiveStrategy: require('./beans/recursive-strategy.bean.js'),
  ClassesResolver: require('./beans/classes-resolver.bean.js'),
};

module.exports = Di;

