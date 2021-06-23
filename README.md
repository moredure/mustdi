# mustdi
---
Best IoC Container for Js ever!!! WIth package system
Main idea to use comments as meta information about types in classes
See example with [expressjs](https://github.com/mikefaraponov/mustdi-express-js-example) application.

As simple as `container.getBean('BestBeanEver')`:

```js
const Di = require('mustdi');

/**
 * ExpressTestApplication class
 */
class ExpressTestApplication {
  /**
   * Main method as main in java ;)
   * With Js and mustdi nothing is impossible
   */
  static main() {
    const container = new Di.DefaultContainer(__dirname, [
      './app/*.bean.js',
      './controllers/*.ctrl.js',
      './db-adapters/*.db.js',
      './models/*.model.js',
      './routers/*.router.js',
      './config/*.config.js',
      './loggers/*.logger.js',
    ]);
    container.getBean('Server').start();
  }
}

if (module === require.main) {
  ExpressTestApplication.main();
}
```

## Sponsors
[ScaleChamp](https://scalechamp.com)
