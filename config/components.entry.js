var path = require('path');

module.exports = function (parentRoot) {
  return {
    'detailed-targeting': [
      //path.resolve(parentRoot, './src/app/detailed-targeting/detailed-targeting.module.ts'),
      path.resolve(parentRoot, './src/app/detailed-targeting/detailed-targeting.component.ts')
    ],
    'core':               [
      path.resolve(parentRoot, './src/polyfills.ts'),
      'rxjs/Rx',
      '@angular/core',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/compiler'
    ],
    'upgrade-adapter':    path.resolve(parentRoot, './src/upgrade-adapter.ts')
  };
};
