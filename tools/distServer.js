// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

// Run Browsersync
browserSync({
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  // don't try to mirror inputs between browsers
  ghostMode: false,

  // switch off distracting log output on startup
  logLevel: "silent",

  // we don't need any of browser-sync's online features, so pretend we're offline
  online: false,

  // don't open a browser to the url automatically
  open: false,

  middleware: [historyApiFallback()]
});
