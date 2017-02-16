var path = require('path');

module.exports = function (parentRoot) {
  return {
    'main': [
      path.resolve(parentRoot, './src/polyfills.browser.ts'),
      path.resolve(parentRoot, './src/rxjs.imports.ts'),
      path.resolve(parentRoot, './src/lib/upgrade-adapter.ts')
    ]
  };
};
