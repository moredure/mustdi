const path = require('path');
const Di = require('../index.js');
const notNodeModule = path.join(__dirname, '**/!node_modules/**/*');
const isBean = path.join(__dirname, '**/*.bean.js');
const config = require('config');
const core = new Di.Core(notNodeModule, isBean);
const diRecursiveResolverStrategy = new Di.RecursiveResolverStrategy();
const container = new Di.Container(core, diRecursiveResolverStrategy, config);

container.getBean('F1').run();
