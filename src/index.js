let Package = require('./beans/package.bean.js');
let Container = require('./beans/container.bean.js');
let RecursiveStrategy = require('./beans/recursive-strategy.bean.js');
let ClassesResolver = require('./beans/classes-resolver.bean.js');
let DefaultContainer = require('./beans/default-container.bean.js')

/**
 * Namespace object
 * @type {Object}
 */
const Di = {
  Package,
  Container,
  RecursiveStrategy,
  ClassesResolver,
  DefaultContainer,
};

module.exports = Di;

