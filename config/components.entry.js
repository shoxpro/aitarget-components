var path = require('path');

module.exports = function (parentRoot) {
  return {
    'detailed-targeting': path.resolve(parentRoot, './src/app/detailed-targeting/detailed-targeting.component.ts'),
    'core':               ['@angular/core', 'rxjs/Rx']
  };
};
