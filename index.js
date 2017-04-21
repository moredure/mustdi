const doctrine = require('doctrine');
const globby = require("globby")

const SINGLET = 'singleton';

class Core {
  constructor(...classPathPatternsArray) {
    this._classPathPatternsArray = classPathPatternsArray;
    this._configPattern = /(\/\*\*[\s\S]*?\*\/)[\s\S]*constructor/;
  }
  getClasses() {
    return globby
      .sync(this._classPathPatternsArray)
      .map(require.bind(require))
      .map(this._inject.bind(this))
      .reduce(this._reduceBothAsArrayAndAsObject.bind(this), []);
  }
  _reduceBothAsArrayAndAsObject(modules, clazz) {
    modules.push(clazz);
    return Object.assign(modules, {
      [clazz.name]: clazz,
    });
  }
  _hasType(clazz) {
    return clazz.type && clazz.type.name;
  }
  _toType(clazz) {
    return clazz.type.name;
  }
  _isSingleton(param) {
    return param.title === SINGLET;
  }
  _inject(clazz, i, classes) {
    const classRepresentation = clazz.toString();
    const configComment = classRepresentation.match(this._configPattern)[1];
    const config = doctrine.parse(configComment, {unwrap: true});
    clazz.scope = config.tags.find(this._isSingleton) ? SINGLET : null;
    clazz.dependencies = config.tags
      .filter(this._hasType)
      .map(this._toType)
      .map((c) => classes
        .find((clazz) => clazz.name === c));
    return clazz;
  }
}

class Container {
  constructor(core, diStrategy) {
    this._diStrategy = diStrategy;
    this._core = core;
  }
  getBean(className, ...args) {
    let classes = this._core.getClasses();
    if (!classes[className]) {
      throw new TypeError('Container has no such class!');
    }
    return this._diStrategy.execute(className, classes, ...args);
  }
}

class RecursiveResolverStrategy {
  constructor() {
    this._cache = new WeakMap();
  }
  _resolve(clazz) {
    const injection = [];
    for (const dependency of clazz.dependencies) {
      if (dependency.scope === SINGLET && this._cache.has(dependency)) {
        injection.push(this._cache.get(dependency));
      } else if (dependency.scope === SINGLET && !this._cache.has(dependency)) {
        this._cache.set(dependency, this._resolve(dependency));
        injection.push(this._cache.get(dependency));
      } else {
        injection.push(this._resolve(dependency));
      }
    }
    return Reflect.construct(clazz, injection);
  }
  execute(compositionRootClassString, classes, ...args) {
    return this._resolve(classes[compositionRootClassString]);
  }
}

module.exports = {
  Core,
  Container,
  RecursiveResolverStrategy,
}
