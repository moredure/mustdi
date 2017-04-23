const Package = require('./beans/package.bean.js');
const Container = require('./beans/container.bean.js');
const RecursiveStrategy = require('./beans/recursive-strategy.bean.js');
const ClassesResolver = require('./beans/classes-resolver.bean.js');
const DefaultContainer = require('./beans/default-container.bean.js');

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

