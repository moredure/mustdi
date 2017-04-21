/**
 * RecursiveDiStrategy class
 * @class
 */
class RecursiveDiStrategy {
  /**
   * RecursiveDiStrategy constructor
   * @param  {Array} metadataResolvers strategies for resolving different
   * dependencies metadata
   * @param  {WeakMap} cache for singletons instanciation
   */
  constructor(metadataResolvers=[], cache=new WeakMap()) {
    this._metadataResolvers = metadataResolvers;
    this._cache = cache;
  }
  /**
   * Main interface for stratigies
   * @param  {String}    compositionRootClassString [description]
   * @param  {[type]}    classes                    [description]
   * @param  {...[type]} args                       [description]
   * @return {[type]}                               [description]
   */
  execute(compositionRootClassString, classes, ...args) {
    return this._resolve(classes[compositionRootClassString]);
  }
  /**
   * Resolves dependencies recursively
   * @param  {Function} clazz class
   * @return {Object} clazz instance
   */
  _resolve(clazz) {
    const injection = [];
    for (const dependency of clazz.dependencies) {
      if (dependency.scope == SINGLET && this._cache.has(dependency)) {
        injection.push(this._cache.get(dependency));
      } else if (dependency.scope == SINGLET && !this._cache.has(dependency)) {
        this._cache.set(dependency, this._resolve(dependency));
        injection.push(this._cache.get(dependency));
      } else {
        injection.push(this._resolve(dependency));
      }
    }
    return Reflect.construct(clazz, injection);
  }
}

module.exports = RecursiveDiStrategy;
