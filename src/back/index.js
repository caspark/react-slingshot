'use strict';

import express from 'express';

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " PORT");
    process.exit(-1);
}

const PORT = process.argv[2];

let app = express();

app.use('/', express.static(__dirname));

app.get('/api', function (req, res) {
  res.send('Hello World from the API!');
});

app.listen(PORT, function () {
  console.log(`App server started on port ${PORT}.`);
});
