const Di = require('./src');

class TestApplication {
  static main() {
    let appModules = new Di.Package(__dirname, [
      './fixtures/*.bean.js'
    ]);

    let classResolver = new Di.ClassesResolver(appModules);

    let recursiveDiStrategy = new Di.RecursiveStrategy();

    let container = new Di.Container(classResolver, recursiveDiStrategy);

    container.getBean('Ninja').run();
  }
}

if (require.main === module) {
  TestApplication.main();
}
