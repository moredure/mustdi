const doctrine = require('doctrine');
const {
  CALLER, CONFIG_PATTERN, EXTERNAL_DEPENDENCY, SINGLETON
} = require('../constants');

class ClassesResolver {
  constructor(packageInstance) {
    this._package = packageInstance;
  }
  getClasses() {
    return this._package
      .getModules()
      .map(this._inject.bind(this))
      .reduce(this._reduceAsObject, {});
  }
  _reduceAsObject(modules, Class) {
    return Object.assign(modules, {
      [Class.name]: Class,
    });
  }
  _isParam(tag) {
    return tag.type && tag.type.name && tag.title === 'param';
  }
  _isSingleton(tag) {
    return tag.title === SINGLETON;
  }
  _inject(Class, index, classes) {
    let configComment;
    let tags;
    try {
      configComment = Class.toString().match(CONFIG_PATTERN)[1];
      tags = doctrine.parse(configComment, {unwrap: true}).tags;
    } catch(e) {
      throw new TypeError('Error with config parsing ' + e.message);
    }
    Class.isSingleton = !!tags.find(this._isSingleton);
    Class.dependencies = tags
      .filter(this._isParam)
      .map(this._parseMeta(classes));
    return Class;
  }
  _parseMeta(classes) {
    return function(tag) {
      switch (tag.type.name) {
        case EXTERNAL_DEPENDENCY:
          return {module: tag.description};
        case CALLER:
          return {isCallerNeeded: true};
        default:
          return classes.find((clazz) => {
            return clazz.name === tag.type.name;
          }) || null;
      }
    }
  }
}

module.exports = ClassesResolver;
