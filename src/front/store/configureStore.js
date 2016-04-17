// @flow

const THIS_FILE='store/configureStore.js';

if (process.env.NODE_ENV === 'production') {
  // Jumping through some hoops (wrapping the function) to keep flow happy
  // (it doesn't seem to like mixing dynamic imports, or maybe it's the mixing of ES6 modules with CommonJS modules)
  module.exports = function() {
    let real = require('./configureStore.prod');
    if (typeof real === 'function') {
      real.apply(this, arguments);
    } else {
      throw new TypeError('./configureStore.prod did not export a function', THIS_FILE);
    }
  };
} else {
  module.exports = function() {
    let real = require('./configureStore.dev');
    if (typeof real === 'function') {
      real.apply(this, arguments);
    } else {
      throw new TypeError('./configureStore.dev did not export a function', THIS_FILE);
    }
  };
}
