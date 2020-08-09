'use strict';

const sse = (function(clientId, clients) {
  setInterval(function() {
    let msg = Math.random();
    for (let id in clients) {
      let res = clients[id];
      res.write(`data: ${msg}`);
    
      res.write('\n\n');
      console.log(`sent ${msg} to client id: ${id}`);
    }
  }, 2000);

  return function(res) {
    const retryTimeout = 5 * 1000;
    res.setTimeout(retryTimeout * 10);
    res.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache'
    });
    res.write('\n');
    res.write(`retry: ${retryTimeout}`);
    res.write('\n');

    (function(id) {
      clients[id] = res;
      res.on('close', function() {
        delete clients[id];
        console.log(`closed an SSE connection for client id: ${id}`);
      });
      console.log(`opened an SSE connection for client id: ${id}`);
    })(clientId++);
  };
})(0, {});

module.exports = sse;
