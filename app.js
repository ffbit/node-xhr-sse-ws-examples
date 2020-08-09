'use strict';

const express = require('express');
const app = express();
const sse = require('./main/sse');

app.get('/sse/', function(req, res) {
  sse(res);
});

// http://expressjs.com/en/api.html#express.static
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: ['index.html'],
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
};
app.use(express.static('public', options));

const port = process.env.PORT || 3000;
app.listen(port);
