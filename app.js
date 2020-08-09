'use strict';

const express = require('express');
const app = express();
const sse = require('./main/sse');
const ws = require('./main/ws');
const http = require('http');

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

const server = http.createServer(app);
const wss = ws(server);

const port = process.env.PORT || 3000;
server.listen(port);
