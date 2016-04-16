# React Slingshot!

A fork of [the original react-slingshot](https://github.com/coryhouse/react-slingshot), customised to Caspar's liking.

Significant changes:

* Fewer build scripts (use babel / webpack clis instead)
* Use a single webpack config file
* Use webpack dev server in development rather than browser-sync to make things a bit simpler
* Add a back-end API server

Development
-----------

To run in development mode:

    npm install
    npm run -s start
    open http://localhost:3000

`npm run` will monitor for code changes and auto reload the code changes. What is it actually doing? Well, you can find
out by leaving the `-s` flag off, but here's a summary:

* Runs [Mocha](https://mochajs.org/) tests repeatedly in the background (that's what `XX passing` in the terminal is)
* Runs a [Webpack](https://webpack.github.io/) development server on port 3000. Webpack (configured via
  `webpack.config.js`) uses [Babel](https://babeljs.io/) to take care of transpiling Ecmascript 2015 into JS for today's
  browsers, and it also extracts out the CSS components and inlines them into JS ([SCSS](http://sass-lang.com/) is also
  supported/compiled in this way). When code is changed, the changed modules are attempted to be hot-reloaded into the
  browser (webpack installs a little piece of websocket-using JS that listens for changes from the devserver).
  Everything in `src/front/` ends up being served through this.
* Meanwhile, there's an [Express](http://expressjs.com/) app in `src/back/`, which [nodemon](http://nodemon.io) starts
  and restarts when it sees changes to the source files; to support ES2015, Babel is also used to run this server. The
  webpack server used for the front-end will proxy any requests whose paths start with `/api` to this back-end server.

Architecture-wise, the front-end is built using:

* [react](https://facebook.github.io/react/index.html) for the view/templating
* [redux](https://github.com/reactjs/redux) for managing state
* [react-router](https://github.com/reactjs/react-router) for managing dispatching and the url bar

Deployment
----------

Assuming you've done `npm install` already, do

    npm run -s start:dist
    open http://localhost:3000

This will build the app in `dist/` (which you can copy to a server to deploy) and start it on port `3000` (so you can
verify it works properly). If you had the dev-mode version of the app open, remember to reload the tab! (Otherwise the
dev-mode version will spew a bunch of console errors due to not being able to initialise the module hot-reload
functionality.)

All minimisation/compilation/transpilation of the front-end is done by webpack, and the back-end is transpiled using
Babel as well.

## Initial Machine Setup
**Install [Node 5.x using nvm](https://nodejs.org)**. After installing nvm, do:

    nvm install 5

**Recommended: Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and
[Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** in
Chrome. (Optional, but helpful. The latter offers time-travel debugging.)

**On a Mac?** You're all set. If you're on Linux, see below. Windows? Good luck.

### On Linux###

 * Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
