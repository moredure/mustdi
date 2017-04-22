let Package = require('./package.bean.js');
let Container = require('./container.bean.js');
let RecursiveStrategy = require('./recursive-strategy.bean.js');
let ClassesResolver = require('./classes-resolver.bean.js');

function DefaultContainer(dirname, classes) {
  const appModules = new Package(dirname, classes);
  const classResolver = new ClassesResolver(appModules);
  const recursiveDiStrategy = new RecursiveStrategy();
  return new Container(classResolver, recursiveDiStrategy);
}

module.exports = DefaultContainer;

