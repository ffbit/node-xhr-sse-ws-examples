'use strict';

const WebSocket = require('ws');

const ws = function(server) {
  const webSocketServer = new WebSocket.Server({server});

  webSocketServer.on('connection', function(webSocket) {
    webSocket.on('message', function(data) {
      console.log(`Got a client sent message: ${data}`);
      webSocketServer.clients.forEach(function(client) {
        if (client.readyState === WebSocket.OPEN) {
          let msg = `A client says: ${data}`;
          client.send(msg);
        }
      });
    });
    webSocket.send('The server says: Hello!');
  });
};

module.exports = ws;
