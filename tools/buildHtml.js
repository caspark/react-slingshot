// Allowing console calls below since this is a build file.
/*eslint-disable no-console */

// This script copies src/index.html into /dist/index.html and adds a reference to styles.css to the head; it's only run
// for production builds (and isn't used during local development).
import fs from 'fs';
import colors from 'colors';
import cheerio from 'cheerio';

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
  $('head').prepend('<link rel="stylesheet" href="assets/styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Created /dist/index.html'.green);
  });
});
