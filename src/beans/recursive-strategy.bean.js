/**
 * RecursiveDiStrategy class
 * @class
 */
class RecursiveStrategy {
  /**
   * RecursiveDiStrategy constructor
   * @param  {WeakMap} cache for singletons instanciation
   */
  constructor(cache = new WeakMap()) {
    this._cache = cache;
  }
  /**
   * Main interface for stratigies
   * @param  {String}    compositionRootClassString [description]
   * @param  {[type]}    classes                    [description]
   * @param  {...[type]} args                       [description]
   * @return {[type]}                               [description]
   */
  execute(compositionRootClassString, classes) {
    return this._resolve(classes[compositionRootClassString]);
  }
  /**
   * Resolves dependencies recursively
   * @param  {Function} express
   * @return {Object} clazz instance
   */
  _resolve(dependent, independent) {
    const args = [];

    for (const dependency of dependent.dependencies) {
      let injection;

      if (dependency === null) {
        injection = null;

      } else if (dependency.module) {
        injection = require(dependency.module);

      } else if (dependency.isDiCaller) {
        injection = independent.name;

      } else if (dependency.isSingleton && this._cache.has(dependency)) {
        injection = this._cache.get(dependency);

      } else if (dependency.isSingleton) {
        injection = this._resolve(dependency, dependent);
        this._cache.set(dependency, injection);

      } else {
        injection = this._resolve(dependency, dependent);

      }

      args.push(injection);
    }

    let instance =  Reflect.construct(dependent, args);

    if (dependent.factoryMethod) {
      return instance[dependent.factoryMethod](...[]);

    } else {
      return instance;

    }
  }
}

module.exports = RecursiveStrategy;
