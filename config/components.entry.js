var path = require('path');

module.exports = function (parentRoot) {
  return {
    'main': [
      path.resolve(parentRoot, './src/polyfills.ts'),
      path.resolve(parentRoot, './src/lib/upgrade-adapter.ts')
    ]
  };
};
