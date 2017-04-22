# mustdi
---
Best IoC Container for Js ever!!! WIth package system
See example with [expressjs](https://github.com/mikefaraponov/mustdi-express-js-example) application.

As simple as `container.getBean('BestBeanEver')`:

```es6
const Di = require('mustdi');

class ExpressTestApplication {
  /**
   * Main method as main in java ;)
   * With Js and mustdi nothing is impossible
   */
  static main() {
    const container = new Di.DefaultContainer(__dirname, [
      './controllers/*.ctrl.js',
      './server/*.server.js',
      './events/*.bean.js',
      './db-adapters/*.db.js',
      './models/*.model.js',
      './routers/*.router.js',
      './config/*.config.js',
    ]);
    container.getBean('Server').start();
  }
}

if (require.main === module) {
  ExpressTestApplication.main();
}
```
