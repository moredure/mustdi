# mustdi
---
Best IoC Container ever

```es6
const path = require('path');
const Di = require('../index.js');
const notNodeModule = path.join(__dirname, '**/!node_modules/**/*');
const isBean = path.join(__dirname, '**/*.bean.js');
const core = new Di.Core(notNodeModule, isBean);
const diRecursiveResolverStrategy = new Di.RecursiveResolverStrategy();
const container = new Di.Container(core, diRecursiveResolverStrategy);

const bestClassEver = container.getBean('F1').run();
```
