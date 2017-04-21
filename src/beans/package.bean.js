const {CONFIG_PATTERN, SINGLET} = require('../constants');

/**
 * Package class
 */
class Package {
  /**
   * Package constructor
   * @param  {...[String]} classPathPatternsArray patterns
   * for searching dependencies
   */
  constructor(...classPathPatternsArray) {
    this._classPathPatternsArray = classPathPatternsArray;
  }
  /**
   * [getClasses description]
   * @return {[type]} [description]
   */
  getClasses() {
    return Object
      .freeze(globby
        .sync(this._classPathPatternsArray)
        .map(require.bind(require))
        .map(this._inject.bind(this))
        .reduce(this._reduceAsObject.bind(this), {}));
  }
  /**
   * [_reduceBothAsArrayAndAsObject description]
   * @param  {[type]} modules [description]
   * @param  {[type]} clazz   [description]
   * @return {[type]}         [description]
   */
  _reduceBothAsArrayAndAsObject(modules, clazz) {
    return Object.assign(modules, {
      [clazz.name]: clazz,
    });
  }
  /**
   * [_hasType description]
   * @param  {[type]}  clazz [description]
   * @return {Boolean}       [description]
   */
  _hasType(clazz) {
    return clazz.type && clazz.type.name;
  }
  /**
   * [_toType description]
   * @param  {[type]} clazz [description]
   * @return {[type]}       [description]
   */
  _toType(clazz) {
    return clazz.type.name;
  }
  /**
   * [_isSingleton description]
   * @param  {[type]}  param [description]
   * @return {Boolean}       [description]
   */
  _isSingleton(param) {
    return param.title === SINGLET;
  }
  /**
   * [_inject description]
   * @param  {Function} clazz   [description]
   * @param  {Number} index       [description]
   * @param  {Array} classes [description]
   * @return {Object}         [description]
   */
  _inject(clazz, index, classes) {
    const classRepresentation = clazz.toString();
    try {
      const configComment = classRepresentation.match(CONFIG_PATTERN)[1];
    } catch(e) {
      console.error('Error with CONFIG_PATTERN', e.message);
    }
    const config = doctrine.parse(configComment, {unwrap: true});
    clazz.scope = config.tags.find(this._isSingleton) ? SINGLET : null;
    clazz.dependencies = config.tags
      .filter(this._hasType)
      .map(this._toType)
      .map((className) =>
        classes.find((clazz) => clazz.name === className));
    return clazz;
  }
}

module.exports = Package;
